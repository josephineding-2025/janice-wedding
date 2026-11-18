/**
 * Backend for the wedding site: leaderboard, song requests and the wish garden.
 * Data lives in the Google Sheet this script is attached to (3 tabs are created automatically).
 * Setup steps: see README.txt in this folder.
 */
var NOTIFY_EMAIL = ""; // optional: an email address that gets a message for every song request (song requests are switched off on the site)

// Guest list for "Find my seat": the tab that holds the guests of every table (in this same spreadsheet).
var GUEST_TAB = "Copy of guest list";
// Optional secret. If set, ?action=debug&key=<secret> shows how the tab was read (use it once to check, then clear it).
var DEBUG_KEY = ""; // optional: an email address that gets a message for every song request

var SHEETS = {
  Scores: ["id", "name", "score", "updated"],
  Songs: ["time", "name", "song", "note", "played"],
  Blessings: ["time", "id", "name", "message", "show"],
};

function sheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(SHEETS[name]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
}


/* ===================== guest list (Find my seat) ===================== */
// "Table 5", "5", "Table 5 - Dad's Relatives", "Table 4 - Mom's Relatives (1)", "第5桌", "VIP Table 1", "Main table", "R" ...  ->  {id, title} or null
var TAIL_ = "\\s*(?:[:\\uFF1A\\-\\u2013\\u2014|\\u00B7,\\uFF0C]\\s*(.+)|\\((.+)\\)|\\uFF08(.+)\\uFF09)?";
function tailTitle_(m, from) { return String(m[from] || m[from + 1] || m[from + 2] || "").replace(/\s+/g, " ").trim(); }
function headId_(s) {
  s = String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  if (!s) return null;
  var m = s.match(new RegExp("^(?:table|tbl|\\u7B2C)?\\s*([0-9]{1,2})\\s*(?:\\u684C|\\u53F7)?" + TAIL_ + "$", "i"));
  if (m) return { id: String(Number(m[1])), title: tailTitle_(m, 2) };
  m = s.match(new RegExp("^(?:vip\\s+)?(?:table\\s*)?(?:main|\\u4E3B\\u684C|head)(?:\\s*table)?" + TAIL_ + "$", "i"));
  if (m) return { id: "main", title: tailTitle_(m, 1) };
  m = s.match(new RegExp("^(?:table\\s*)?r(?:\\u684C)?" + TAIL_ + "$", "i"));
  if (m) return { id: "R", title: tailTitle_(m, 1) };
  return null;
}

// does this cell read like a table description (a group title) rather than a person's name?
function looksDesc_(s) {
  s = String(s || "").trim();
  if (!s) return false;
  if (s.length >= 20) return true;
  if (/(team|relatives|colleagues|friends|family|church|cousins|classmates|neighbou?rs|group|side|\u56E2\u961F|\u4EB2\u621A|\u540C\u4E8B|\u670B\u53CB|\u5BB6\u4EBA|\u540C\u5B66|\u6559\u4F1A|\u5C0F\u7EC4)/i.test(s)) return true;
  if (/[&;\uFF1B\/]/.test(s) && s.split(/\s+/).length >= 2) return true;
  return false;
}

function pushNames_(t, cell) {
  String(cell == null ? "" : cell).split(/[\n;；]/).forEach(function (n) {
    n = n.replace(/\s+/g, " ").trim();
    if (n && !/^(total|pax|count|sum|合计|总数)\b/i.test(n)) t.guests.push(n);
  });
}

// Layout "blocks": the sheet is a set of boxes. Each box has a header row with "No." and "NAME", the names below, and a merged label cell
// on the left ("Table 5 - Dad's Relatives", or "Main Table" in the header with "VIP Table 1" below). Boxes can sit side by side or stacked.
function parseBlocks_(v) {
  var tables = {}, order = [], found = 0;
  function add(id, title) {
    if (!tables[id]) { tables[id] = { id: id, title: "", guests: [] }; order.push(id); }
    if (title && !tables[id].title) tables[id].title = String(title).trim();
    return tables[id];
  }
  var cell = function (r, c) { return c >= 0 && v[r] && v[r][c] != null ? String(v[r][c]).replace(/\s+/g, " ").trim() : ""; };
  for (var r = 0; r < v.length; r++) {
    for (var c = 1; c < v[r].length; c++) {
      if (!/^(name|names|姓名|名字|宾客)$/i.test(cell(r, c))) continue;
      if (!/^(no\.?|#|序号|编号|number)$/i.test(cell(r, c - 1))) continue;
      found++;
      var end = r;
      while (end + 1 < v.length && (cell(end + 1, c) || cell(end + 1, c - 1))) end++;
      var labelCol = c - 2, head = cell(r, labelCol), lab = "";
      for (var k = r + 1; k <= end && !lab; k++) lab = cell(k, labelCol);
      var hd = headId_(lab) || headId_(head), id = "", title = "";
      if (/main|vip|主桌/i.test(head + " " + lab)) {
        id = "main";
        title = (lab || head).replace(/table\s*[0-9]*/ig, " ").replace(/\s+/g, " ").trim();
        if (/^main$/i.test(title)) title = "";
      } else if (hd) { id = hd.id; title = hd.title; }
      if (!id) continue;
      var t = add(id, title);
      for (var rr = r + 1; rr <= end; rr++) pushNames_(t, v[rr][c]);
    }
  }
  return { found: found, tables: tables, order: order };
}

function idxOf_(arr, re) { for (var i = 0; i < arr.length; i++) if (re.test(arr[i])) return i; return -1; }

function parseGuests_(v) {
  var tables = {}, order = [], layout = "unknown";
  function add(id, title) {
    if (!tables[id]) { tables[id] = { id: id, title: "", guests: [] }; order.push(id); }
    if (title && !tables[id].title) tables[id].title = String(title).trim();
    return tables[id];
  }
  function pushNames(t, cell) {
    String(cell == null ? "" : cell).split(/[\n;\uFF1B]/).forEach(function (n) {
      n = n.replace(/\s+/g, " ").trim();
      if (n && !/^(total|pax|count|sum|\u5408\u8BA1|\u603B\u6570)\b/i.test(n)) t.guests.push(n);
    });
  }
  if (!v || !v.length) return { layout: layout, tables: tables, order: order };
  var pb = parseBlocks_(v);
  if (pb.found) return { layout: "blocks", tables: pb.tables, order: pb.order };
  var rows = v.length, cols = v.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
  var h = (v[0] || []).map(function (x) { return String(x).trim().toLowerCase(); });

  // 1) long list: one row per guest with Name and Table columns
  var nameC = idxOf_(h, /^(name|guest|guests|guest name|\u59D3\u540D|\u540D\u5B57|\u5BBE\u5BA2)/), tabC = idxOf_(h, /^(table|tbl|\u684C|\u684C\u53F7)/), descC = idxOf_(h, /(desc|title|group|intro|\u7B80\u4ECB|\u8BF4\u660E|\u5173\u7CFB|category)/);
  // "long" = the same table id repeats down the sheet. If every table appears once and rows are wide, it is the one-row-per-table layout (3 below).
  var seen = {}, repeats = 0, maxCells = 0;
  if (nameC >= 0 && tabC >= 0) {
    for (var rr0 = 1; rr0 < rows; rr0++) {
      var hd0 = headId_(v[rr0][tabC]);
      if (hd0) { if (seen[hd0.id]) repeats++; seen[hd0.id] = 1; }
      var nz = 0; for (var cc0 = 0; cc0 < v[rr0].length; cc0++) if (String(v[rr0][cc0]).trim()) nz++;
      maxCells = Math.max(maxCells, nz);
    }
  }
  if (nameC >= 0 && tabC >= 0 && (repeats > 0 || maxCells < 3)) {
    layout = "long";
    for (var r = 1; r < rows; r++) {
      var hd = headId_(v[r][tabC]);
      if (!hd) continue;
      var t = add(hd.id, hd.title || (descC >= 0 ? v[r][descC] : ""));
      pushNames(t, v[r][nameC]);
    }
    return { layout: layout, tables: tables, order: order };
  }

  // 2) one column per table (table names across a header row, guests listed underneath, optional description row)
  for (var hr = 0; hr < Math.min(8, rows); hr++) {
    var cnt = 0;
    for (var c = 0; c < cols; c++) if (headId_(v[hr][c])) cnt++;
    if (cnt < 3) continue;
    layout = "columns";
    var labelCol = headId_(v[hr][0]) ? "" : String((v[hr + 1] && v[hr + 1][0]) || "").trim();
    for (var c2 = 0; c2 < cols; c2++) {
      var hd2 = headId_(v[hr][c2]);
      if (!hd2) continue;
      var t2 = add(hd2.id, hd2.title), rr = hr + 1;
      var first = String((v[rr] && v[rr][c2]) || "").trim();
      if (first && (/^(desc|description|title|group|intro|\u7B80\u4ECB|\u8BF4\u660E|\u5173\u7CFB)/i.test(labelCol) || (!t2.title && looksDesc_(first)))) { if (!t2.title) t2.title = first; rr++; }
      for (; rr < rows; rr++) pushNames(t2, v[rr][c2]);
    }
    return { layout: layout, tables: tables, order: order };
  }

  // 3) one row per table: Table | description | guest | guest ...
  var tot = 0, hit = 0;
  for (var r3 = 0; r3 < rows; r3++) { var c0 = String(v[r3][0] == null ? "" : v[r3][0]).trim(); if (c0) { tot++; if (headId_(c0)) hit++; } }
  if (tot >= 3 && hit / tot >= 0.6) {
    layout = "rows";
    for (var r4 = 0; r4 < rows; r4++) {
      var hd4 = headId_(v[r4][0]);
      if (!hd4) continue;
      var t4 = add(hd4.id, hd4.title), c4 = 1, cell1 = String(v[r4][1] == null ? "" : v[r4][1]).trim();
      if (!t4.title && cell1 && looksDesc_(cell1)) { t4.title = cell1; c4 = 2; }
      for (; c4 < v[r4].length; c4++) pushNames(t4, v[r4][c4]);
    }
  }
  return { layout: layout, tables: tables, order: order };
}

function readGuests_() {
  var cache = CacheService.getScriptCache(), hit = cache.get("guests");
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(GUEST_TAB);
  var out = sh ? parseGuests_(sh.getDataRange().getDisplayValues()) : { layout: "tab '" + GUEST_TAB + "' not found", tables: {}, order: [] };
  try { cache.put("guests", JSON.stringify(out), 45); } catch (e) {}   // a change in the sheet shows up within a minute
  return out;
}

function guestAction_(action, e) {
  var G = readGuests_();
  if (action === "titles") {
    return { rows: G.order.map(function (id) { return { id: id, title: G.tables[id].title, count: G.tables[id].guests.length }; }) };
  }
  if (action === "table") {
    var t = G.tables[String((e.parameter && e.parameter.id) || "")];
    return t ? { id: t.id, title: t.title, guests: t.guests } : { id: "", title: "", guests: [] };
  }
  if (action === "find") {
    var q = String((e.parameter && e.parameter.q) || "").toLowerCase().replace(/\s+/g, " ").trim();
    if (q.length < 2) return { rows: [] };
    var qq = q.replace(/\s/g, ""), rows = [];
    for (var i = 0; i < G.order.length && rows.length < 8; i++) {
      var t2 = G.tables[G.order[i]];
      for (var k = 0; k < t2.guests.length && rows.length < 8; k++) {
        var nm = t2.guests[k], low = nm.toLowerCase();
        if ((low.indexOf(q) >= 0 || low.replace(/\s/g, "").indexOf(qq) >= 0) && !rows.some(function (x) { return x.name === nm && x.id === t2.id; })) rows.push({ name: nm, id: t2.id, title: t2.title });
      }
    }
    return { rows: rows };
  }
  if (action === "debug" && DEBUG_KEY && e.parameter && e.parameter.key === DEBUG_KEY) return G;
  return null;
}

function doGet(e) {
  var action = (e.parameter && e.parameter.action) || "";
  if (action === "titles" || action === "table" || action === "find" || action === "debug") { var ga = guestAction_(action, e); if (ga) return json_(ga); }
  if (action === "leaderboard") {
    var cache = CacheService.getScriptCache();
    var hit = cache.get("lb");
    if (hit) return ContentService.createTextOutput(hit).setMimeType(ContentService.MimeType.JSON);
    var rows = sheet_("Scores").getDataRange().getValues().slice(1)
      .map(function (r) { return { id: String(r[0]), name: String(r[1]), score: Number(r[2]) || 0 }; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 30);
    var out = JSON.stringify({ rows: rows });
    cache.put("lb", out, 10); // many phones polling = one sheet read every 10 seconds
    return ContentService.createTextOutput(out).setMimeType(ContentService.MimeType.JSON);
  }
  if (action === "blessings") {
    var data = sheet_("Blessings").getDataRange().getValues().slice(1)
      .filter(function (r) { return r[4] !== false && String(r[4]).toUpperCase() !== "FALSE"; })
      .slice(-120)
      .map(function (r) { return { id: String(r[1]), name: String(r[2]), message: String(r[3]) }; });
    return json_({ rows: data });
  }
  return json_({ ok: true });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var b = JSON.parse(e.postData.contents);
    var now = new Date();
    if (b.action === "score") {
      var id = clean_(b.id, 40), name = clean_(b.name, 20), score = Math.min(Math.max(Number(b.score) || 0, 0), 2000);
      if (!id || !name) return json_({ ok: false });
      var sh = sheet_("Scores");
      var ids = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
      var row = -1;
      for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) { row = i + 2; break; }
      if (row > 0) {
        var old = Number(sh.getRange(row, 3).getValue()) || 0;
        sh.getRange(row, 2, 1, 3).setValues([[name, Math.max(old, score), now]]);
      } else sh.appendRow([id, name, score, now]);
      CacheService.getScriptCache().remove("lb");
      return json_({ ok: true });
    }
    if (b.action === "song") {
      var song = clean_(b.song, 80), note = clean_(b.note, 100), who = clean_(b.name, 20) || "Guest";
      if (!song) return json_({ ok: false });
      sheet_("Songs").appendRow([now, who, song, note, ""]);
      if (NOTIFY_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, "Song request: " + song, who + " requested: " + song + (note ? "\nNote: " + note : ""));
      return json_({ ok: true });
    }
    if (b.action === "blessing") {
      var msg = clean_(b.message, 140);
      if (!msg) return json_({ ok: false });
      sheet_("Blessings").appendRow([now, clean_(b.id, 40), clean_(b.name, 20) || "Guest", msg, true]);
      return json_({ ok: true });
    }
    return json_({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Backend for the wedding site: leaderboard, song requests and the wish garden.
 * Data lives in the Google Sheet this script is attached to (3 tabs are created automatically).
 * Setup steps: see README.txt in this folder.
 */
var NOTIFY_EMAIL = ""; // optional: an email address that gets a message for every song request

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

function doGet(e) {
  var action = (e.parameter && e.parameter.action) || "";
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

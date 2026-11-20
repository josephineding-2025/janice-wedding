(function () {
  "use strict";
  const W = window.WEDDING;

  /* ---------------- i18n ---------------- */
  const UI = {
    en: {
      replay: "Replay our story", readVerse: "Read the passage", resetView: "Reset view", browseTables: "Browse all tables", themeLabel: "Ceremony theme", verseLabel: "Scripture", storyCardTitle: "View our story", storyCardSub: "From Sunway University to the wedding day. Scroll through the whole journey.", storyCardBtn: "Start the story", exploreTitle: "Explore the day", exploreSub: "Tap a card to jump straight in.", introLine: "Everything you need for today, in one place.",
      tile_agenda: "Agenda", tile_agenda_s: "The timeline of the day", tile_seats: "Find my seat", tile_seats_s: "Floor plan and your table",
      tile_lyrics: "Sing along", tile_lyrics_s: "Praise and worship lyrics", tile_play: "Quiz and bingo", tile_play_s: "Play and earn points",
      tile_board: "Leaderboard", tile_board_s: "See who is on top", tile_wishes: "Wish garden", tile_wishes_s: "Plant a blessing",
      tile_songs: "Song request", tile_songs_s: "Tell the live band", tile_story: "Our story", tile_story_s: "Replay the scroll",
      tile_map: "Directions", tile_map_s: "Open in maps", tile_cal: "Save the date", tile_cal_s: "Add to calendar", nowHappening: "Happening now", youEnter: "You enter here", pts: "pts", nameTitle: "Join the fun", nameSub: "Pick a name for the leaderboard.", namePh: "Your name", save: "Save",
      soonOnline: "Opens on the wedding day.", boardEmpty: "Be the first on the board!", boardTitle: "Leaderboard", boardSub: "Top players by points. Updates every few seconds.",
      rules: "Quiz: 10 pts per correct answer. Bingo: photo 20, say it 10, do it 10, spot it 5, first line +30.",
      songTitle: "Request a song", songSub: "Tell the live band what you would like to hear. We pass it on to the band.", songPh: "Song and artist", songNote: "A dedication or note (optional)", songSend: "Send to the band",
      songLimit: "That is 3 requests already. Thank you!", songDone: "Sent! The band will see it.", tryAgain: "Could not send. Please try again.",
      gardenTitle: "Wish garden", gardenSub: "Every blessing grows as a flower. Tap a flower to read it.", gardenEmpty: "No flowers yet. Plant the first wish!", tapFlower: "Tap a flower to read a wish.",
      plant: "Plant a wish for the couple", wishPh: "Write a blessing (max 140 characters)", plantBtn: "Plant my wish", wishLimit: "Two wishes planted already. Thank you!", wishDone: "Planted! Your flower is in the garden.",
      fun_play: "Play", fun_board: "Board", fun_wishes: "Wishes", fun_songs: "Songs", home: "Home", agenda: "Agenda", seats: "Seats", lyrics: "Lyrics", fun: "Play",
      weddingOf: "The wedding of", days: "days", hours: "hours", mins: "mins", secs: "secs",
      today: "Today is the day!", thanks: "Thank you for celebrating with us.",
      upNext: "Up next", seeAgenda: "Full agenda", viewSeats: "Find your seat", viewSeatsSub: "Table and floor plan",
      playFun: "Play and win", playFunSub: "Quiz, bingo and more",
      addCal: "Add to calendar", directions: "Google Maps", waze: "Waze",
      emcee: "Emcee", live: "NOW", venue: "Venue",
      findSeat: "Find my seat", searchPh: "Type your name...", noMatch: "No match. Please check with the registration desk.",
      tapTable: "Tap a table to see who is sitting there.",
      pickTable: "Tap a table on the map or below.",
      table: "Table", who: "Who they are to us", funFact: "Fun fact", at: "At this table",
      soon: "Introduction coming soon.", entrance: "Entrance", stage: "Stage", registration: "Registration",
      store: "Store room", carpet: "Red carpet", screen: "Screen", cake: "Mock cake", champ: "Champagne fountain",
      quizTitle: "How well do you know us?", question: "Question", of: "of", yourScore: "Your score",
      again: "Play again", next: "Next", finish: "See result",
      bingoTitle: "Wedding bingo", bingoSub: "Tap a square when you spot it. Get 3 in a row! Three squares are photo challenges: pick your best shot and upload 1 photo for each.", bingoWin: "BINGO! Congratulations!", cue_photo: "Take a photo", cue_say: "Say it", cue_do: "Do it", cue_spot: "Spot it", upload: "Upload 1 photo", uploadFor: "Photo challenges done", lyricsTitle: "Sing along", lyricsSub: "Praise & worship songs. Sing along with us!", lyricsMissing: "Lyrics coming soon.",
      shuffle: "New card", storyTitle: "Our story",
      factTitle: "Table fun facts", factBtn: "Surprise me", factNone: "Tap the button to meet a table.",
      loveTitle: "Send us some love", loveBtn: "Tap to send hearts",
      bless: "Write a blessing", photos: "Share your photos", hashtag: "Our hashtag",
      sample: "SAMPLE", sampleNote: "Placeholder content. Replace it in data.js.",
      contact: "Chat with us",
    },
    zh: {
      replay: "重看我们的故事", readVerse: "阅读经文", resetView: "还原视图", browseTables: "浏览所有桌子", themeLabel: "证婚礼主题", verseLabel: "经文", storyCardTitle: "观看我们的故事", storyCardSub: "从双威大学到婚礼当天，一路往下滑，看完整段旅程。", storyCardBtn: "开始故事", exploreTitle: "探索今天", exploreSub: "点一下卡片，直接进入。", introLine: "今天需要的一切，都在这里。",
      tile_agenda: "流程", tile_agenda_s: "今天的时间表", tile_seats: "查找座位", tile_seats_s: "平面图与桌号",
      tile_lyrics: "一起来唱", tile_lyrics_s: "敬拜赞美歌词", tile_play: "问答与宾果", tile_play_s: "玩游戏赚积分",
      tile_board: "排行榜", tile_board_s: "看看谁领先", tile_wishes: "祝福花园", tile_wishes_s: "种下一个祝福",
      tile_songs: "点歌", tile_songs_s: "告诉现场乐队", tile_story: "我们的故事", tile_story_s: "重看滚动故事",
      tile_map: "导航", tile_map_s: "在地图中打开", tile_cal: "记下日期", tile_cal_s: "加入日历", nowHappening: "正在进行", youEnter: "从这里入场", pts: "分", nameTitle: "一起来玩", nameSub: "请输入排行榜上的名字。", namePh: "您的名字", save: "保存",
      soonOnline: "婚礼当天开放。", boardEmpty: "来当第一名吧！", boardTitle: "排行榜", boardSub: "积分最高的玩家，每隔几秒更新。",
      rules: "问答：答对一题10分。宾果：拍照20分、说出来10分、去做10分、看到5分，首次连线加30分。",
      songTitle: "点歌", songSub: "告诉现场乐队您想听什么歌，我们会转达给乐队。", songPh: "歌名和歌手", songNote: "祝福或留言（选填）", songSend: "发送给乐队",
      songLimit: "已经点了3首，谢谢！", songDone: "已发送！乐队会看到。", tryAgain: "发送失败，请再试一次。",
      gardenTitle: "祝福花园", gardenSub: "每一个祝福都会长成一朵花。点一朵花来阅读。", gardenEmpty: "还没有花朵，来种下第一个祝福吧！", tapFlower: "点一朵花来阅读祝福。",
      plant: "为新人种下一个祝福", wishPh: "写下祝福（最多140字）", plantBtn: "种下我的祝福", wishLimit: "已经种下两个祝福，谢谢！", wishDone: "已种下！您的花朵在花园里了。",
      fun_play: "游戏", fun_board: "排行榜", fun_wishes: "祝福", fun_songs: "点歌", home: "首页", agenda: "流程", seats: "座位", lyrics: "歌词", fun: "互动",
      weddingOf: "诚挚邀请您参加", days: "天", hours: "时", mins: "分", secs: "秒",
      today: "就是今天！", thanks: "感谢您与我们一同庆祝。",
      upNext: "接下来", seeAgenda: "完整流程", viewSeats: "查找座位", viewSeatsSub: "桌号与平面图",
      playFun: "来玩游戏", playFunSub: "问答、宾果等",
      addCal: "加入日历", directions: "Google 地图", waze: "Waze",
      emcee: "司仪", live: "进行中", venue: "地点",
      findSeat: "查找我的座位", searchPh: "输入您的名字...", noMatch: "找不到，请向接待处询问。",
      tapTable: "点击桌子，看看谁坐在这里。",
      pickTable: "请在地图或下方点选桌号。",
      table: "第", who: "他们与我们的关系", funFact: "趣味小知识", at: "同桌宾客",
      soon: "简介即将更新。", entrance: "入口", stage: "舞台", registration: "接待处",
      store: "储藏室", carpet: "红地毯", screen: "屏幕", cake: "装饰蛋糕", champ: "香槟塔",
      quizTitle: "你有多了解我们？", question: "第", of: "/", yourScore: "您的得分",
      again: "再玩一次", next: "下一题", finish: "查看结果",
      bingoTitle: "婚礼宾果", bingoSub: "看到就点一下，连成3个一线就赢！其中三格是拍照挑战，请选出最棒的一张，每个挑战上传1张照片。", bingoWin: "宾果！恭喜您！", cue_photo: "拍照", cue_say: "说出来", cue_do: "去做", cue_spot: "看到就点", upload: "上传1张照片", uploadFor: "已完成的拍照挑战", lyricsTitle: "一起来唱", lyricsSub: "敬拜赞美诗歌，一起来唱吧！", lyricsMissing: "歌词即将更新。",
      shuffle: "换一张", storyTitle: "我们的故事",
      factTitle: "各桌趣味小知识", factBtn: "随机一桌", factNone: "点击按钮认识一桌。",
      loveTitle: "送我们一点爱", loveBtn: "点一点送爱心",
      bless: "写下祝福", photos: "分享照片", hashtag: "我们的标签",
      sample: "示例", sampleNote: "占位内容，请在 data.js 中替换。",
      contact: "联系我们",
    },
  };

  let lang = "en";
  try {
    const saved = localStorage.getItem("lang");
    lang = saved || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en");
  } catch (e) {}

  const u = (k) => UI[lang][k] || UI.en[k] || k;
  const L = (o) => (o ? o[lang] || o.en || "" : "");
  const tableLabel = (t) => (lang === "zh" && typeof t.id === "number" ? "第" + t.id + "桌" : L(t.name));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  const badge = (s) => (s && W.showSampleBadges ? `<span class="sample" title="${u("sampleNote")}">${u("sample")}</span>` : "");

  /* ---------------- time helpers ---------------- */
  // Current wall-clock time in Malaysia (UTC+8), regardless of the guest's phone timezone.
  function myNow() {
    const d = new Date(Date.now() + 8 * 3600 * 1000).toISOString();
    return { date: d.slice(0, 10), min: +d.slice(11, 13) * 60 + +d.slice(14, 16) };
  }
  const toMin = (hm) => +hm.slice(0, 2) * 60 + +hm.slice(3, 5);
  const fmt12 = (hm) => {
    let h = +hm.slice(0, 2); const m = hm.slice(3, 5);
    if (lang === "zh") return (h < 12 ? "上午" : h < 18 ? "下午" : "晚上") + (h % 12 || 12) + ":" + m;
    return (h % 12 || 12) + ":" + m + (h < 12 ? "am" : "pm");
  };
  const fmtRange = (s, e) => fmt12(s) + " - " + fmt12(e);

  /* ---------------- icons ---------------- */
  const ICON = {
    home: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    agenda: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    seats: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.5"/><circle cx="12" cy="20" r="1.5"/><circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/>',
    fun: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
    lyrics: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  };
  const TABS = ["home", "agenda", "seats", "lyrics", "fun"];

  /* ---------------- views ---------------- */
  const TILES = [
    ["#agenda", "lantern2", "tile_agenda"], ["#seats", "compass", "tile_seats"],
    ["#lyrics", "lavender2", "tile_lyrics"], ["#fun/play", "bfly_purple", "tile_play"],
    ["#fun/board", "toast", "tile_board"], ["#fun/wishes", "bouquet_pink", "tile_wishes"],
    
  ];
  function tileHtml([href, art, key], idx) {
    const inner = `<img class="tart" src="scenes/web/${art}.webp" alt="" decoding="async" loading="lazy"><b>${u(key)}</b><span>${u(key + "_s")}</span><i class="go" aria-hidden="true">&rarr;</i>`;
    const style = `style="--i:${idx};--d:${(idx % 2) * 0.16}s"`;
    if (href === "MAP") return `<a class="tile rv" ${style} href="${W.venue.mapsUrl}" target="_blank" rel="noopener">${inner}</a>`;
    if (href === "ICS") return `<button class="tile rv" ${style} id="ics" type="button">${inner}</button>`;
    return `<a class="tile" ${style} href="${href}">${inner}</a>`;
  }

  function viewHome() {
    const start = new Date(W.ceremonyStart).getTime();
    const now = myNow();
    let status = "";
    if (Date.now() < start) {
      status = `<div class="count" id="count"></div>`;
    } else if (now.date === W.date) {
      status = `<p class="date" style="margin-top:18px">${u("today")}</p>`;
    } else {
      status = `<p class="date" style="margin-top:18px">${u("thanks")}</p>`;
    }
    const fl = (src, cls, st) => `<img class="hs ${cls}" src="scenes/web/${src}.webp" alt="" decoding="async" style="${st || ""}">`;
    return `
      <section class="hero">
        <img class="sprig a" src="scenes/web/corner_tl.webp" alt="" decoding="async"><img class="sprig b" src="scenes/web/corner_tr.webp" alt="" decoding="async">
        <div class="sunmoon"></div>${[0,1,2,3,4].map((i) => `<i class="firefly" style="left:${12 + i * 19}%;top:${30 + (i * 17) % 40}%;animation-delay:${i * 0.7}s"></i>`).join("")}
        ${fl("dove_a", "dove")}${fl("bfly_blue", "bf b1")}${fl("bfly_pink", "bf b2")}${fl("spark_y", "sp s1")}${fl("spark_p", "sp s2")}
        ${fl("blob_purple", "mound l")}${fl("blob_pink", "mound r")}
        <div class="eyebrow">${u("weddingOf")}</div>
        <div class="archpic"><img src="scenes/web/home_couple.webp" alt="" decoding="async"></div>
        <h1>${L(W.couple.names).replace(" & ", "<br>&amp; ")}</h1>
        <div class="date">${L(W.dateText)}</div>
        <div class="venue">${L(W.venue.name)}</div>
        ${status}
      </section>
      <div class="rv">${nextUpCard()}</div>
      <a class="storycard rv" href="#story">
        <img class="sc-pic" src="scenes/web/cover.webp" alt="" decoding="async">
        <div class="sc-txt"><b>${u("storyCardTitle")}</b><span>${u("storyCardSub")}</span><em>${u("storyCardBtn")} &rarr;</em></div>
        <img class="sc-fl a" src="scenes/web/bfly_purple.webp" alt=""><img class="sc-fl b" src="scenes/web/dove_a.webp" alt="">
      </a>
      <div class="sechead rv"><img src="scenes/web/garland_lav.webp" alt="" decoding="async"><h2>${u("exploreTitle")}</h2><p>${u("exploreSub")}</p></div>
      <div class="tiles">${TILES.map(tileHtml).join("")}</div>
      <div class="actions rv">
        <a class="act" href="${W.venue.mapsUrl}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg><span><b>${u("tile_map")}</b><i>${u("tile_map_s")}</i></span></a>
        <button class="act" id="ics" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v4M10 15h4"/></svg><span><b>${u("tile_cal")}</b><i>${u("tile_cal_s")}</i></span></button>
      </div>
      <p class="intro">${u("introLine")}</p>`;
  }

  function nextUpCard() {
    const now = myNow();
    let title = "", when = "";
    if (now.date === W.date) {
      for (const s of W.agenda) {
        if (s.isBreak) continue;
        if (now.min < toMin(s.end)) { title = L(s.title); when = fmt12(s.start); break; }
      }
    }
    if (!title) { const s = W.agenda[0]; title = L(s.title); when = fmt12(s.start); }
    return `<a class="card next" href="#agenda" style="display:flex;text-decoration:none;color:inherit">
      <div><div class="muted small">${u("upNext")}</div><h3 style="margin:0">${title}</h3><div class="muted small">${u("seeAgenda")} &rarr;</div></div>
      <div class="when">${when}</div></a>`;
  }

  function tickCountdown() {
    const el = document.getElementById("count");
    if (!el) return;
    let s = Math.max(0, Math.floor((new Date(W.ceremonyStart) - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    const cell = (n, k) => `<div><b>${n}</b><span>${u(k)}</span></div>`;
    el.innerHTML = cell(d, "days") + cell(h, "hours") + cell(m, "mins") + cell(s, "secs");
  }

  const STK = { morning: "bouquet_lav", evening: "toast" }; // little stickers beside each session title
  // wraps each word (or each Chinese character) so it can fade in one after another while scrolling
  const words = (t, off) => (lang === "zh" ? Array.from(String(t)) : String(t).split(" ")).map((w, k) => `<span class="wd" style="--w:${k + (off || 0)}">${w}</span>`).join(lang === "zh" ? "" : " ");
  const whoText = (w) => (typeof w === "object" ? L(w) : w); // a name, or {en, zh} text such as "Bride's entrance"
  function viewAgenda() {
    const now = myNow();
    const onDay = now.date === W.date;
    let globalIdx = 0; // alternates left/right across all sessions
    const bg = `<div class="agfx" aria-hidden="true"><img class="f1" src="scenes/web/bfly_blue.webp" alt=""><img class="f2" src="scenes/web/bfly_pink.webp" alt=""><img class="f3" src="scenes/web/dove_c.webp" alt=""></div>`;
    return bg + W.agenda.map((s) => {
      const sLive = onDay && now.min >= toMin(s.start) && now.min < toMin(s.end);
      if (s.isBreak) {
        return `<div class="break ag-break"><img class="stk lamp" src="scenes/web/lantern2.webp" alt="" decoding="async"><b>${L(s.title)}</b>${L(s.note)}</div>`;
      }
      if (s.compact) {
        // compact program: a two-column grid of numbered cards, the theme with the passage folded away
        const cells = s.items.map((i, idx) => {
          const songs = (i.songs || []).length ? `<a class="songs" href="#lyrics/${i.lyricIdx || 0}">&#9834; ${u("lyricsTitle")} (${i.songs.length})</a>` : "";
          return `<li class="rv" style="--d:${((idx % 2) * 0.07 + Math.floor(idx / 2) * 0.04).toFixed(2)}s"><span class="cn" aria-hidden="true"></span><div class="cb"><b>${L(i.t)}</b>${i.who ? `<i>${whoText(i.who)}</i>` : ""}${songs}</div></li>`;
        }).join("");
        const th = s.theme ? `<div class="theme-card compact rv"><img class="th-fl l" src="scenes/web/flw_09.webp" alt=""><img class="th-fl r" src="scenes/web/flw_03.webp" alt="">
          <div class="th-lbl">${u("themeLabel")}</div><div class="th-txt">${L(s.theme)}</div>
          ${s.verse ? `<details class="th-more"><summary><span>${u("verseLabel")}</span> ${L(s.verse.ref)} <em>${u("readVerse")}</em></summary><p class="th-verse">${L(s.verse)}</p>${lang === "en" ? `<div class="niv">${W.nivNotice}</div>` : ""}</details>` : ""}</div>` : "";
        return `<div class="session-head compact">${STK[s.id] ? `<img class="stk" src="scenes/web/${STK[s.id]}.webp" alt="" decoding="async">` : ""}
          <h2>${L(s.title)}${sLive ? `<span class="live">${u("live")}</span>` : ""}</h2>
          <div class="time">${fmtRange(s.start, s.end)}${s.venue ? " &middot; " + L(s.venue) : ""}${s.emcee ? " &middot; " + u("emcee") + ": " + s.emcee : ""}</div></div>
          ${th}<ol class="cgrid">${cells}</ol>`;
      }
      const timed = s.items.some((i) => i.time);
      let current = -1;
      if (onDay && timed) s.items.forEach((i, idx) => { if (now.min >= toMin(i.time)) current = idx; });
      const rows = s.items.map((i, idx) => {
        const side = globalIdx % 2 === 0 ? "side-l" : "side-r";
        globalIdx++;
        const cls = [side];
        if (timed) cls.push("timed");
        if (timed && onDay && idx < current) cls.push("past");
        if (timed && idx === current && sLive) cls.push("now");
        const timeLabel = timed ? `<span class="stamp">${fmt12(i.time)}</span>` : "";
        const songs = (i.songs || []).map((x, n) => `<a class="songs" href="#lyrics/${n}">&#9834; ${x}</a>`).join("");
        const desc = i.d ? `<div class="d">${words(L(i.d), 3)}</div>` : "";
        const who = i.who ? `<div class="who">${whoText(i.who)}</div>` : "";
        const flw = window.FLW || [0], fn = flw[(globalIdx * 5 + (s.id === "evening" ? 11 : 2)) % flw.length];
        const bud = `<img class="bud" src="scenes/web/flw_${String(fn).padStart(2, "0")}.webp" alt="" style="--rot:${(globalIdx % 2 ? 1 : -1) * (8 + (globalIdx * 7) % 14)}deg">`;
        return `<li class="${cls.join(" ")}" style="--i:${idx}"><div class="ag-card"><div class="ag-title">${words(L(i.t))}</div>${desc}${who}${songs}${timeLabel}</div><div class="ag-dot" aria-hidden="true"></div>${bud}</li>`;
      }).join("");
      return `
        <div class="session-head">${STK[s.id] ? `<img class="stk" src="scenes/web/${STK[s.id]}.webp" alt="" decoding="async">` : ""}
          <h2>${L(s.title)}${sLive ? `<span class="live">${u("live")}</span>` : ""}</h2>
          <div class="time">${fmtRange(s.start, s.end)}${s.venue ? " &middot; " + L(s.venue) : ""}${s.emcee ? " &middot; " + u("emcee") + ": " + s.emcee : ""}</div>
        </div>
        <img class="gl" src="scenes/web/garland_lav.webp" alt="" decoding="async">
        ${s.theme ? `<div class="theme-card rv"><img class="th-fl l" src="scenes/web/flw_09.webp" alt=""><img class="th-fl r" src="scenes/web/flw_03.webp" alt="">
          <div class="th-lbl">${u("themeLabel")}</div><div class="th-txt">${L(s.theme)}</div>
          ${s.verse ? `<div class="th-ref"><span>${u("verseLabel")}</span> ${L(s.verse.ref)}</div><p class="th-verse">${L(s.verse)}</p>${lang === "en" ? `<div class="niv">${W.nivNotice}</div>` : ""}` : ""}</div>` : ""}
        <ul class="agenda tl"><img class="tip" src="scenes/web/spark_y.webp" alt="">${rows}</ul>`;
    }).join("");
  }

  // scroll-linked effects for the agenda (words appear slowly, line draws, rows rise) and the home page (reveals + parallax)
  let fxOff = null, fxKick = null;
  function pageFx(name) {
    if (fxOff) fxOff();
    if (name !== "agenda" && name !== "home" && name !== "lyrics" && name !== "fun") return;
    const still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const lists = [...document.querySelectorAll("ul.agenda.tl")];
    const heads = [...document.querySelectorAll(".session-head, .break")];
    const stk = [...document.querySelectorAll(".session-head .stk, .break .stk")];
    const rv = [...document.querySelectorAll(".rv")];
    const hero = document.querySelector(".hero");
    // a vine that grows down the agenda: a wavy stem that draws itself as you scroll, with leaves sprouting along it and tendrils
    const NS = "http://www.w3.org/2000/svg", mk = (n, at) => { const e = document.createElementNS(NS, n); Object.keys(at || {}).forEach((k) => e.setAttribute(k, at[k])); return e; };
    const LEAF = "M0 0 Q9 -13 22 -6 Q12 6 0 0Z", RIB = "M1 0 Q10 -4 18 -5", CURL = "M0 0 c7 -2 12 5 7 10 c-4 4 -10 0 -7 -5";
    let vines = [];
    const build = () => {
      vines = lists.map((ul) => {
        const old = ul.querySelector(":scope > svg.vine"); if (old) old.remove();
        const W = ul.clientWidth, H = ul.scrollHeight, A = 7;
        const fx = (y) => A * Math.sin(y / 38) + A * 0.45 * Math.sin(y / 17 + 1);
        const svg = mk("svg", { class: "vine", width: W, height: H, viewBox: `0 0 ${W} ${H}`, "aria-hidden": "true" });
        let d = ""; for (let y = 0; y <= H; y += 8) d += (y ? " L" : "M") + (W / 2 + fx(y)).toFixed(1) + " " + y;
        svg.appendChild(mk("path", { class: "vt", d }));
        const grow = mk("path", { class: "vg", d }); svg.appendChild(grow);
        const L = grow.getTotalLength(); grow.style.strokeDasharray = L; grow.style.strokeDashoffset = L;
        const leaves = [];
        for (let y = 26, k = 0; y < H - 8; y += 40, k++) {
          const side = k % 2 ? 1 : -1, x = W / 2 + fx(y), rot = side * (-28 - ((k * 37) % 26)), sz = 0.8 + ((k * 13) % 5) / 10;
          const g = mk("g"), lf = mk("path", { class: "lfp", d: LEAF }), rb = mk("path", { class: "lfr", d: RIB });
          g.appendChild(lf); g.appendChild(rb);
          if (k % 3 === 2) g.appendChild(mk("path", { class: "cl", d: CURL, transform: "translate(18 -4) rotate(" + (side * 20) + ")" }));
          svg.appendChild(g); leaves.push({ g, x, y, side, rot, sz });
        }
        ul.insertBefore(svg, ul.firstChild);
        ul.querySelectorAll("li").forEach((li) => { const cy = li.offsetTop + li.offsetHeight / 2; li.style.setProperty("--vx", fx(cy).toFixed(1) + "px"); });
        return { ul, grow, L, H, W, fx, leaves, tip: ul.querySelector(":scope > img.tip") };
      });
    };
    let raf = 0;
    const gls = [...document.querySelectorAll(".gl")];
    const set = (el, k, v, eps) => { const c = el["_" + k]; if (c === undefined || Math.abs(c - v) > (eps || 0.004)) { el["_" + k] = v; el.style.setProperty("--" + k, v.toFixed(3)); } };
    // reads and writes are batched (all layout reads first, then all style writes) so scrolling stays smooth on long pages like the evening reception
    const run = () => {
      raf = 0;
      const vh = window.innerHeight, target = vh * 0.66, y = window.scrollY;
      const focusBand = vh * 0.22; // half-height of the "lit" window around 50% viewport
      const reads = lists.map((ul) => ({ ul, r: ul.getBoundingClientRect(), lis: [...ul.children].filter((c) => c.tagName === "LI").map((li) => ({ li, rect: li.getBoundingClientRect() })) }));
      const hr = heads.map((h) => h.getBoundingClientRect().top);
      const sr = stk.map((h) => h.getBoundingClientRect().top);
      const rvNow = [...document.querySelectorAll(".rv:not(.in)")];
      const rvr = rvNow.map((el) => el.getBoundingClientRect().top);
      const glr = gls.map((g) => g.getBoundingClientRect().top);
      reads.forEach(({ ul, r, lis }, vi) => {
        const fh = Math.max(0, Math.min(r.height - 30, target - r.top - 20));
        if (r.bottom > -200 && r.top < vh + 200) {
          ul.style.setProperty("--fh", fh.toFixed(1) + "px");
          const v = vines[vi];
          if (v) {
            v.grow.style.strokeDashoffset = (v.L * (1 - Math.min(1, fh / v.H))).toFixed(1);
            v.leaves.forEach((l) => {
              const s = still ? 1 : clamp01((fh - l.y + 4) / 70), e = 1 - Math.pow(1 - s, 3);
              if (l.e === undefined || Math.abs(l.e - e) > 0.004) {
                l.e = e;
                l.g.setAttribute("transform", `translate(${l.x.toFixed(1)} ${l.y}) rotate(${l.rot}) scale(${(l.side * l.sz * e).toFixed(3)} ${(l.sz * e).toFixed(3)})`);
                l.g.style.opacity = e.toFixed(2);
              }
            });
            if (v.tip) { v.tip.style.left = `calc(50% + ${v.fx(fh).toFixed(1)}px)`; v.tip.style.top = fh.toFixed(1) + "px"; }
          }
        }
        lis.forEach(({ li, rect }) => {
          let p, lit;
          if (still) { p = 1; lit = 1; }
          else if (rect.bottom < -120) { p = 1; lit = 0; }          // already scrolled past: settled, nothing to update
          else if (rect.top > vh + 120) { p = 0; lit = 0; }         // not reached yet
          else {
            p = clamp01((vh * 0.96 - rect.top) / (vh * 0.42));
            lit = clamp01(1 - Math.abs(rect.top + rect.height / 2 - vh * 0.5) / focusBand);
          }
          set(li, "r", p); set(li, "lit", lit, 0.01);
          const inn = p > 0.35, foc = lit > 0.35;
          if (li._in !== inn) { li._in = inn; li.classList.toggle("in", inn); }
          if (li._foc !== foc) { li._foc = foc; li.classList.toggle("focus", foc); }
        });
      });
      heads.forEach((h, k) => set(h, "r", still ? 1 : clamp01((vh * 0.95 - hr[k]) / (vh * 0.35))));
      stk.forEach((h, k) => h.style.setProperty("--ty", ((sr[k] - vh / 2) * -0.07).toFixed(1) + "px"));
      rvNow.forEach((el, k) => { if (still || rvr[k] < vh * 0.92) el.classList.add("in"); });
      gls.forEach((g, k) => set(g, "sg", still ? 1 : clamp01((vh * 0.92 - glr[k]) / (vh * 0.3))));
      const ag = document.querySelector(".agfx");
      if (ag) ag.style.setProperty("--sy", y.toFixed(0));
      if (hero) {
        hero.style.setProperty("--py", (-y * 0.16).toFixed(1) + "px");
        hero.style.setProperty("--pm", (y * 0.1).toFixed(1) + "px");
        hero.style.setProperty("--sc", clamp01(y / 420).toFixed(3));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    fxKick = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    let lastW = window.innerWidth;
    const onResize = () => { if (window.innerWidth === lastW) return; lastW = window.innerWidth; build(); onScroll(); };
    window.addEventListener("resize", onResize);
    build();
    run();
    setTimeout(() => { build(); run(); }, 700); // once fonts and sticker images have settled
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { build(); run(); });
    fxOff = () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); fxOff = null; };
  }

  /* ---------- Seats ---------- */
  // Coordinates measured from the hotel floor plan (image.png, 892 x 1070).
  const POS = {
    2: [311, 341], 3: [400, 342], main: [498, 398], 4: [594, 360], 5: [682, 360],
    11: [234, 444], 10: [322, 435], 9: [409, 436], 8: [581, 455], 7: [669, 455], 6: [758, 450],
    12: [234, 540], 13: [322, 515], 14: [409, 515], 15: [581, 543], 16: [669, 543], 17: [756, 543],
    21: [323, 594], 20: [410, 594], 19: [581, 631], 18: [669, 630],
    22: [322, 675], 23: [409, 675], 24: [581, 719], 25: [669, 719],
    R: [240, 813], 31: [325, 814], 30: [408, 814], 29: [497, 813], 28: [583, 813], 27: [670, 813], 26: [758, 811],
  };
  const ENTR = { 1: [186, 236], 2: [186, 487], 3: [186, 737] };
  let selected = null; // table id
  let hits = []; // guest search matches
  let routeOn = false; // draw the glowing path to the selected table

  const byId = (id) => W.tables.find((t) => String(t.id) === String(id));

  function tableSvg(t) {
    const [x, y] = POS[t.id] || [0, 0];
    const main = t.id === "main";
    const r = main ? 30 : 22;
    let chairs = "";
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      chairs += `<rect class="chair" x="${(x + Math.cos(a) * (r + 9) - 4.5).toFixed(1)}" y="${(y + Math.sin(a) * (r + 9) - 4.5).toFixed(1)}" width="9" height="9" rx="2"/>`;
    }
    const filled = t.intro.en || t.intro.zh || t.guests.length || (metaOf(t.id) && metaOf(t.id).title);
    const cls = ["tbl", filled ? "filled" : "", String(t.id) === String(selected) ? "sel" : "", hits.includes(String(t.id)) ? "hit" : ""].join(" ");
    const label = main ? (lang === "zh" ? "主桌" : "Main") : t.id;
    return `<g class="${cls}" data-table="${t.id}" role="button" tabindex="0" aria-label="${tableLabel(t)}">
      ${chairs}<circle class="top" cx="${x}" cy="${y}" r="${r}"/><text x="${x}" y="${y}" ${main ? 'style="font-size:14px"' : ""}>${label}</text></g>`;
  }

  // glowing path from the nearest entrance to the table
  function routeSvg() {
    if (!routeOn || !POS[selected]) return "";
    const [tx, ty] = POS[selected];
    const e = Object.keys(ENTR).sort((a, b) => Math.abs(ENTR[a][1] - ty) - Math.abs(ENTR[b][1] - ty))[0];
    const [sx, sy] = ENTR[e];
    const dx = tx - sx;
    const d = `M${sx + 6} ${sy} C${sx + dx * 0.55} ${sy}, ${tx} ${sy + (ty - sy) * 0.35}, ${tx} ${ty}`;
    return `<g class="route" pointer-events="none">
      <path class="glow" d="${d}" pathLength="1"/>
      <path class="line" d="${d}" pathLength="1"/>
      <circle class="from" cx="${sx + 6}" cy="${sy}" r="6"/>
      <circle class="pulse" cx="${tx}" cy="${ty}" r="26"/><circle class="pulse p2" cx="${tx}" cy="${ty}" r="26"/>
      <text class="yah" x="${sx + 24}" y="${sy - 12}">${u("youEnter")}</text></g>`;
  }

  function floorSvg() {
    const ent = (n) => { const y = ENTR[n][1]; return `<rect class="ent" x="178" y="${y - 34}" width="8" height="68"/><text class="lbl ent" transform="translate(166 ${y}) rotate(-90)">${u("entrance")} ${n}</text>`; };
    return `<svg viewBox="120 95 700 910" role="img" aria-label="Floor plan">
      <rect class="floor" x="185" y="105" width="620" height="763"/>
      <rect class="blk" x="185" y="105" width="115" height="73"/><rect class="blk" x="680" y="105" width="125" height="73"/>
      <rect class="stage" x="300" y="108" width="380" height="102"/>
      <rect x="413" y="109" width="165" height="8" fill="#fff" stroke="#333"/>
      <text class="lbl w" x="490" y="132" style="font-size:12px">${u("screen")}</text>
      <text class="lbl w" x="490" y="164" style="font-size:22px;font-weight:600">${u("stage")}</text>
      <rect x="383" y="186" width="30" height="20" fill="#fff" stroke="#333"/><rect x="620" y="186" width="30" height="20" fill="#fff" stroke="#333"/>
      <rect class="blk" x="208" y="343" width="50" height="23" rx="4"/><rect class="blk" x="730" y="341" width="50" height="24" rx="4"/>
      <rect class="blk" x="208" y="609" width="50" height="23" rx="4"/><rect class="blk" x="730" y="609" width="50" height="24" rx="4"/>
      <rect class="carpet" x="482" y="468" width="33" height="297"/><rect class="carpet" x="189" y="735" width="326" height="30"/>
      <text class="lbl w" x="340" y="755" style="font-size:12px">${u("carpet")}</text>
      <rect class="deskf" x="240" y="280" width="28" height="52"/><rect class="deskf" x="140" y="580" width="38" height="108"/>
      <rect x="171" y="785" width="7" height="73" fill="#fff" stroke="#333"/>
      ${ent(1)}${ent(2)}${ent(3)}
      <rect class="blk" x="185" y="868" width="622" height="132"/>
      <text class="lbl w" x="496" y="940" style="font-size:24px">${u("store")}</text>
      ${W.tables.map(tableSvg).join("")}
      ${routeSvg()}
    </svg>`;
  }

  // ----- live guest list: the Google Sheet tab "Copy of guest list", read through the Apps Script backend (falls back to data.js) -----
  const seatCache = { meta: null, metaAt: 0, tab: {} };
  let hitName = "", searchTok = 0, searchTimer = 0;
  const metaOf = (id) => (seatCache.meta || []).find((m) => String(m.id) === String(id));
  function loadMeta() {
    if (!apiOn()) return Promise.resolve(null);
    if (seatCache.meta && Date.now() - seatCache.metaAt < 60000) return Promise.resolve(seatCache.meta);
    return apiGet("titles").then((r) => { seatCache.meta = r.rows || []; seatCache.metaAt = Date.now(); return seatCache.meta; }).catch(() => null);
  }
  function loadTable(id) {
    const c = seatCache.tab[id];
    if (!apiOn() || (c && Date.now() - c.at < 60000)) return Promise.resolve(c || null);
    return apiGet("table&id=" + encodeURIComponent(id)).then((r) => (seatCache.tab[id] = { title: r.title || "", guests: r.guests || [], at: Date.now() })).catch(() => null);
  }
  const mapZoom = () => {
    if (!routeOn || !POS[selected]) return { cls: "", st: "" };
    const [x, y] = POS[selected];
    return { cls: " zoomed", st: `--zx:${(((x - 120) / 700) * 100).toFixed(1)}%;--zy:${(((y - 95) / 910) * 100).toFixed(1)}%;` };
  };

  function tableCard() {
    const t = byId(selected);
    if (!t) return `<div class="card muted" id="tcard">${u("pickTable")}</div>`;
    const info = seatCache.tab[selected], meta = metaOf(selected);
    const title = (info && info.title) || (meta && meta.title) || L(t.tag) || "";
    const guestsList = (info && info.guests && info.guests.length) ? info.guests : t.guests;
    const loading = apiOn() && !info && !guestsList.length;
    const hit = (g) => (hitName && g.toLowerCase() === hitName.toLowerCase()) || (query() && g.toLowerCase().includes(query()));
    // the same name listed several times (e.g. 3 relatives with the same title) is shown once with a count
    const uniq = [], cnt = {};
    guestsList.forEach((g) => { if (cnt[g]) cnt[g]++; else { cnt[g] = 1; uniq.push(g); } });
    const guests = guestsList.length
      ? `<div class="lbl2">${u("at")} <em>${guestsList.length}</em></div><div class="guests">${uniq.map((g, k) => `<span class="${hit(g) ? "hit" : ""}" style="--i:${Math.min(k, 24)}">${escH(g)}${cnt[g] > 1 ? ` <b>&times;${cnt[g]}</b>` : ""}</span>`).join("")}</div>`
      : loading ? `<p class="muted small">...</p>` : "";
    const hasAny = title || L(t.intro) || L(t.fun) || guestsList.length;
    return `<div class="card tcard" id="tcard">
      <div class="tc-top"><span class="tc-num">${tableLabel(t)}</span>${apiOn() ? `<span class="tc-live" title="live">&#9679;</span>` : ""}</div>
      ${title ? `<h2 class="ttitle">${escH(title)}</h2>` : ""}
      ${hasAny || loading ? "" : `<p class="soon">${u("soon")}</p>`}
      ${L(t.intro) ? `<p class="tc-intro">${L(t.intro)}</p>` : ""}
      ${L(t.fun) ? `<div class="lbl2">${u("funFact")}</div><p>${L(t.fun)}</p>` : ""}
      ${guests}
    </div>`;
  }

  function tablesList() {
    return W.tables.map((t) => {
      const m = metaOf(t.id), ti = (m && m.title) || L(t.tag) || "";
      return `<button data-table="${t.id}" class="tl${String(t.id) === String(selected) ? " on" : ""}"><b>${t.id === "main" ? (lang === "zh" ? "主桌" : "Main") : t.id}</b>${ti ? `<span>${escH(ti)}</span>` : ""}</button>`;
    }).join("");
  }

  let q = "";
  const query = () => q.trim().toLowerCase();

  function viewSeats() {
    setTimeout(() => { loadMeta().then(() => { if (document.getElementById("mz")) refreshSeats(false); }); if (selected) loadTable(selected).then(() => document.getElementById("tcard") && refreshSeats(false)); }, 0);
    const z = mapZoom();
    return `
      <input class="search" id="search" type="search" placeholder="${u("searchPh")}" aria-label="${u("findSeat")}" autocomplete="off" value="${q.replace(/"/g, "&quot;")}">
      <ul class="results" id="results"></ul>
      ${tableCard()}
      <div class="mapwrap" id="map"><button class="zoomreset${z.cls ? " show" : ""}" data-act="seat-reset" aria-label="${u("resetView")}">&#8854; ${u("resetView")}</button><div class="mz${z.cls}" id="mz" style="${z.st}">${floorSvg()}</div><div class="legend">${u("tapTable")}</div></div>
      <details class="tl-wrap"><summary>${u("browseTables")}</summary><div class="tlist" id="tlist">${tablesList()}</div></details>`;
  }

  function localFind(s) {
    const found = [];
    W.tables.forEach((t) => t.guests.forEach((g) => { if (g.toLowerCase().includes(s)) found.push({ g, id: String(t.id), title: L(t.tag) }); }));
    return found;
  }
  function renderFound(found) {
    const out = document.getElementById("results");
    if (!out) return;
    hits = [...new Set(found.map((f) => f.id))];
    out.innerHTML = found.length
      ? found.slice(0, 8).map((f) => `<li><button data-table="${f.id}" data-guest="${escH(f.g)}"><span>${escH(f.g)}${f.title ? `<small>${escH(f.title)}</small>` : ""}</span><b>${tableLabel(byId(f.id) || { id: f.id, name: { en: "Table " + f.id, zh: "第" + f.id + "桌" } })}</b></button></li>`).join("")
      : `<li class="muted small" style="padding:10px 16px">${u("noMatch")}</li>`;
    if (found.length && new Set(found.map((f) => f.id)).size === 1) { hitName = found.length === 1 ? found[0].g : ""; selectTable(found[0].id, false); return; }
    refreshSeats(false);
  }
  function runSearch() {
    const s = query(), out = document.getElementById("results");
    hits = [];
    if (s.length < 2) { out.innerHTML = ""; hitName = ""; refreshSeats(false); return; }
    if (apiOn()) {
      const tok = ++searchTok;
      out.innerHTML = `<li class="muted small" style="padding:10px 16px">...</li>`;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        apiGet("find&q=" + encodeURIComponent(s)).then((r) => { if (tok === searchTok) renderFound((r.rows || []).map((x) => ({ g: x.name, id: String(x.id), title: x.title }))); })
          .catch(() => { if (tok === searchTok) renderFound(localFind(s)); });
      }, 260);
    } else renderFound(localFind(s));
  }

  function refreshSeats(scroll) {
    const mz = document.getElementById("mz"), z = mapZoom();
    if (mz) { mz.innerHTML = floorSvg(); mz.className = "mz" + z.cls; mz.style.cssText = z.st; }
    const rs = document.querySelector(".zoomreset"); if (rs) rs.classList.toggle("show", !!z.cls);
    const tc = document.getElementById("tcard"); if (tc) tc.outerHTML = tableCard();
    const tl = document.getElementById("tlist"); if (tl) tl.innerHTML = tablesList();
    if (scroll) { const c = document.getElementById("tcard"); if (c) c.scrollIntoView({ block: "start", behavior: "smooth" }); }
  }

  function selectTable(id, scroll) {
    selected = String(id);
    routeOn = true;
    history.replaceState(null, "", "#seats/" + selected);
    refreshSeats(scroll);
    loadTable(selected).then(() => { if (String(selected) === String(id)) refreshSeats(false); });
  }

  /* ---------- Fun ---------- */
  let quiz = { i: 0, score: 0, picked: null, done: false };

  function quizHtml() {
    const Q = W.quiz;
    if (!Q.length) return "";
    if (quiz.done) {
      return `<div class="card" id="quiz"><h2>${u("quizTitle")}${badge(Q[0].sample)}</h2>
        <div class="muted small">${u("yourScore")}</div><div class="score">${quiz.score} / ${Q.length}</div>
        <button class="btn fill" data-act="quiz-again">${u("again")}</button></div>`;
    }
    const q = Q[quiz.i];
    const opts = q.options.map((o, idx) => {
      let c = "";
      if (quiz.picked !== null) c = idx === q.answer ? "right" : idx === quiz.picked ? "wrong" : "";
      return `<button class="opt ${c}" data-act="quiz-pick" data-i="${idx}" ${quiz.picked !== null ? "disabled" : ""}>${L(o)}</button>`;
    }).join("");
    const after = quiz.picked !== null
      ? `${L(q.note) ? `<p class="muted small" style="margin:10px 0 0">${L(q.note)}</p>` : ""}
         <div class="btns"><button class="btn fill" data-act="quiz-next">${quiz.i === Q.length - 1 ? u("finish") : u("next")}</button></div>` : "";
    return `<div class="card" id="quiz"><h2>${u("quizTitle")}${badge(q.sample)}</h2>
      <div class="progress"><i style="width:${(quiz.i / Q.length) * 100}%"></i></div>
      <div class="muted small">${lang === "zh" ? u("question") + (quiz.i + 1) + "题 / " + Q.length : u("question") + " " + (quiz.i + 1) + " " + u("of") + " " + Q.length}</div>
      <h3 style="color:var(--ink);font-size:22px">${L(q.q)}</h3>${opts}${after}</div>`;
  }

  const svg = (p) => `<svg class="ci" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const CUE_ICON = {
    photo: svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
    say: svg('<path d="M4 5h16v11H9l-5 4z"/>'),
    do: svg('<path d="M9 11V5.5a1.5 1.5 0 013 0V10m0-1.5a1.5 1.5 0 013 0V11m0-.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-1a6 6 0 01-5-3l-2-3.2a1.5 1.5 0 012.4-1.8L9 14"/>'),
    spot: svg('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  };
  const legendHtml = () => ["photo", "say", "do", "spot"].map((t) => `<span class="lg">${CUE_ICON[t]}${u("cue_" + t)}</span>`).join("");
  let bingo = null;
  const N = 3;
  const bItem = (id) => W.bingo.find((b) => b.id === id);
  const uploadUrl = (id) => W.links.photoUploads[id] || W.links.photoUploadUrl;
  function initBingo(force) {
    const saved = store.get("bingo", null);
    if (saved && !force && saved.v === 8 && saved.cells.every(bItem)) { bingo = saved; return; }
    const shuf = (a) => a.slice().sort(() => Math.random() - 0.5);
    const of = (t) => shuf(W.bingo.filter((b) => b.type === t));
    const photos = of("photo").slice(0, 3);
    // pinned cues (pin: true) are on every card; the rest of the card is filled at random
    const nonPhoto = W.bingo.filter((b) => b.type !== "photo");
    const others = [...nonPhoto.filter((b) => b.pin), ...shuf(nonPhoto.filter((b) => !b.pin))].slice(0, N * N - photos.length);
    let cells;
    if (photos.length + others.length < N * N) {
      cells = shuf(W.bingo).slice(0, N * N).map((b) => b.id);
    } else {
      // scatter the photo challenges so they never form a straight line of 3
      const allLines = lineIdx();
      const isLine = (set) => allLines.some((l) => l.every((i) => set.includes(i)));
      let spots;
      do { spots = shuf([...Array(N * N).keys()]).slice(0, photos.length); } while (photos.length === 3 && isLine(spots));
      const fill = shuf(others);
      cells = [...Array(N * N).keys()].map((i) => (spots.includes(i) ? photos[spots.indexOf(i)] : fill.pop()).id);
    }
    bingo = { v: 8, win: null, cells, on: [] };
    store.set("bingo", bingo);
  }
  function lineIdx() {
    const lines = [], idx = (r, c) => r * N + c, rng = [...Array(N).keys()];
    rng.forEach((a) => { lines.push(rng.map((b) => idx(a, b))); lines.push(rng.map((b) => idx(b, a))); });
    lines.push(rng.map((a) => idx(a, a)), rng.map((a) => idx(a, N - 1 - a)));
    return lines;
  }
  function bingoLines() {
    const on = new Set(bingo.on);
    return lineIdx().filter((l) => l.every((i) => on.has(i)));
  }
  let bingoNew = -1;
  const TILT = [-1.4, 1.1, -0.8, 1.3, -1.1, 0.9, -1.2, 1.4, -0.9];
  function bingoHtml() {
    if (W.bingo.length < N * N) return "";
    if (!bingo) initBingo(false);
    const win = bingoLines();
    const inLine = new Set(win.flat());
    if (win.length && !bingo.win && W.blessings.length && W.verses.length) {
      bingo.win = {
        b: Math.floor(Math.random() * W.blessings.length),
        v: Math.floor(Math.random() * W.verses.length),
      };
      store.set("bingo", bingo);
    }
    const bl = win.length && bingo.win && W.blessings[bingo.win.b], vs = win.length && bingo.win && W.verses[bingo.win.v];
    const winHtml = win.length ? `<div class="winbox"><img class="spk a" src="scenes/web/spark_y.webp" alt=""><img class="spk b" src="scenes/web/spark_p.webp" alt=""><img class="spk c" src="scenes/web/spark_b.webp" alt="">
        <div class="winhead">${u("bingoWin")}</div>
        ${bl ? `<p class="bless">${L(bl)}</p>` : ""}
        ${vs ? `<blockquote>${L(vs)}<cite>${L(vs.ref)}</cite></blockquote><div class="niv">${W.nivNotice}</div>` : ""}</div>` : "";
    const fl = window.FLW || [0];
    const cells = bingo.cells.map((id, i) => {
      const b = bItem(id), on = bingo.on.includes(i);
      const fid = String(fl[(i * 7 + 3) % fl.length]).padStart(2, "0");
      const cls = ["bt", on ? "on" : "", inLine.has(i) ? "line" : "", bingoNew === i ? "new" : ""].join(" ");
      return `<button type="button" data-act="bingo" data-i="${i}" data-type="${b.type}" class="${cls}" style="--tilt:${TILT[i % 9]}deg" aria-pressed="${on}"><span class="ico">${CUE_ICON[b.type] || ""}</span><span class="txt">${L(b)}</span>${on ? `<img class="stamp" src="scenes/web/flw_${fid}.webp" alt="">` : ""}</button>`;
    }).join("");
    bingoNew = -1;
    const confetti = win.length && !bingo.celebrated ? (bingo.celebrated = true, store.set("bingo", bingo), `<div class="confetti" aria-hidden="true">${Array.from({ length: 16 }, (_, k) => `<img src="scenes/web/flw_${String(fl[(k * 3) % fl.length]).padStart(2, "0")}.webp" alt="" style="left:${(k * 6.4 + 2) % 96}%;--d:${(1.8 + (k % 5) * 0.35).toFixed(2)}s;--dl:${((k % 7) * 0.12).toFixed(2)}s;--r:${(k % 2 ? 1 : -1) * (90 + k * 14)}deg">`).join("")}</div>`) : "";
    const done = bingo.on.length;
    // a card can lose its win if a square is un-tapped, so only keep the blessing while the win stands
    const ups = bingo.on.map((i) => bItem(bingo.cells[i])).filter((b) => b.type === "photo" && uploadUrl(b.id));
    const upHtml = ups.length ? `<div class="lbl2" style="margin-top:14px">${u("uploadFor")}</div>` + ups.map((b) =>
      `<div class="uprow"><span>${L(b)}</span><a class="btn fill" href="${uploadUrl(b.id)}" target="_blank" rel="noopener">${u("upload")}</a></div>`).join("") : "";
    return `<div class="card bingo-card" id="bingo">${confetti}<img class="stk" src="scenes/web/bfly_purple.webp" alt="" decoding="async"><img class="bgl" src="scenes/web/garland_lav.webp" alt=""><h2>${u("bingoTitle")}</h2><div class="muted small">${u("bingoSub")}</div>
      <div class="bprog"><div class="bar"><i style="width:${(done / (N * N)) * 100}%"></i></div><span>${done} / ${N * N}</span></div>
      <div class="legend2">${legendHtml()}</div>
      ${winHtml}
      <div class="bingo">${cells}</div>${upHtml}
      <div class="btns"><button class="btn" data-act="bingo-new">${u("shuffle")}</button></div></div>`;
  }

  function factHtml() {
    if (!W.tables.some((t) => L(t.fun))) return "";
    return `<div class="card"><h2>${u("factTitle")}</h2>
      <div class="factbox" id="factbox"><span class="muted small">${u("factNone")}</span></div>
      <div class="btns" style="justify-content:center"><button class="btn fill" data-act="fact">${u("factBtn")}</button></div></div>`;
  }

  /* ---------- Shared features: points, leaderboard, song requests, wish garden ---------- */
  const apiOn = () => !!(W.api && W.api.url);
  const apiGet = (action) => fetch(W.api.url + "?action=" + action + "&t=" + Date.now()).then((r) => r.json());
  const apiPost = (body) => fetch(W.api.url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) }).then((r) => r.json());
  const uid = () => {
    let id = store.get("uid", null);
    if (!id) { id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); store.set("uid", id); }
    return id;
  };
  const playerName = () => store.get("playerName", "");
  const escH = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // points: quiz best score x10, each bingo cue done once (photo 20, say 10, do 10, spot 5), one-time line bonus 30
  const CUE_PTS = { photo: 20, say: 10, do: 10, spot: 5 };
  const prog = () => store.get("progress", { quizBest: 0, done: {}, line: false });
  const points = () => {
    const p = prog();
    let n = p.quizBest * 10 + (p.line ? 30 : 0);
    Object.keys(p.done).forEach((id) => { const b = W.bingo.find((x) => x.id === id); if (b) n += CUE_PTS[b.type] || 0; });
    return n;
  };
  let pushTimer = 0;
  function pushScore() {
    clearTimeout(pushTimer);
    if (!apiOn() || !playerName()) return;
    pushTimer = setTimeout(() => apiPost({ action: "score", id: uid(), name: playerName(), score: points() }).catch(() => {}), 2500);
  }
  let board = { rows: null, at: 0 }, boardTimer = 0;
  const myRank = () => {
    if (!board.rows) return null;
    const i = board.rows.findIndex((r) => r.id === uid());
    return i >= 0 ? i + 1 : null;
  };
  function updatePts() {
    const el = document.getElementById("pts");
    if (el) el.innerHTML = ptsHtml();
  }
  const ptsHtml = () => `<b>${points()}</b> ${u("pts")}${myRank() ? ` &middot; #${myRank()}` : ""}`;

  function nameCard() {
    if (playerName()) return `<div class="namebar"><span>${escH(playerName())}</span><span id="pts" class="ptsbadge">${ptsHtml()}</span></div>`;
    return `<div class="card namecard"><h3>${u("nameTitle")}</h3><p class="muted small" style="margin:0 0 8px">${u("nameSub")}</p>
      <div class="row"><input id="nameIn" class="search" maxlength="20" placeholder="${u("namePh")}" autocomplete="off"><button class="btn fill" data-act="name-save">${u("save")}</button></div></div>`;
  }

  function loadBoard(force) {
    if (!apiOn()) return;
    if (!force && board.rows && Date.now() - board.at < 20000) return;
    apiGet("leaderboard").then((r) => {
      board = { rows: r.rows || [], at: Date.now() };
      const el = document.getElementById("board");
      if (el) el.innerHTML = boardInner();
      updatePts();
    }).catch(() => {});
  }
  function boardInner() {
    if (!apiOn()) return `<p class="soon">${u("soonOnline")}</p>`;
    if (!board.rows) return `<p class="muted small">...</p>`;
    if (!board.rows.length) return `<p class="soon">${u("boardEmpty")}</p>`;
    const medal = ["1", "2", "3"];
    return `<ol class="lb">${board.rows.slice(0, 15).map((r, i) => `<li class="${r.id === uid() ? "me" : ""}"><span class="rk r${i < 3 ? i + 1 : 0}">${i + 1}</span><span class="nm">${escH(r.name)}</span><b>${r.score}</b></li>`).join("")}</ol>`;
  }
  function viewBoard() {
    loadBoard(true);
    clearInterval(boardTimer);
    boardTimer = setInterval(() => { if (document.hidden || !document.getElementById("board")) return; loadBoard(true); }, 40000);
    return `<div class="card"><h2>${u("boardTitle")}</h2><p class="muted small" style="margin:0 0 8px">${u("boardSub")}</p>
      <div id="board">${boardInner()}</div>
      <div class="ptsrules">${u("rules")}</div></div>`;
  }

  /* wish garden: every blessing grows as a flower in one shared garden */
  let wishes = null, wishOpen = -1;
  const FLC2 = ["#c9a6f2", "#9dbaf5", "#f5b3d1", "#b9a8f0", "#8fd0e8", "#f7c98b"];
  // every wish grows as one of your flower stickers in a watercolour garden
  const FLW = window.FLW || [];
  function gardenSvg() {
    const list = (wishes || []).slice(-80);
    const fl = list.map((w, i) => {
      const n = FLW.length ? FLW[Math.floor((i * 7 + 3 + ((i * 0.6180339) % 1) * FLW.length) % FLW.length)] : 0;
      const src = "flw_" + String(n).padStart(2, "0"), wd = 9 + ((i * 5) % 4);
      const rnd = (k) => { const v = Math.sin((i + 1) * k) * 43758.5453; return v - Math.floor(v); };
      const x = 4 + rnd(12.9898) * 82, y = 10 + rnd(78.233) * 50;  // scattered, not in lines
      return `<img class="gb ${i === wishOpen ? "open" : ""}" data-wish="${i}" src="scenes/web/${src}.webp" alt="" decoding="async" style="left:${x.toFixed(1)}%;bottom:${y.toFixed(1)}%;width:${wd}%;z-index:${Math.round(100 - y)};animation-delay:${Math.min(i, 24) * 0.07}s">`;
    }).join("");
    return `<div class="gard" role="group" aria-label="${u("gardenTitle")}">
      <img class="gm l" src="scenes/web/blob_purple.webp" alt=""><img class="gm r" src="scenes/web/blob_pink.webp" alt="">
      <img class="gt" src="scenes/web/garland_pink.webp" alt="">
      <img class="gf1 float" src="scenes/web/bfly_blue.webp" alt=""><img class="gf2 float b" src="scenes/web/bfly_pink.webp" alt=""><img class="gf3" src="scenes/web/dove_c.webp" alt="">
      <img class="gs s1" src="scenes/web/spark_y.webp" alt=""><img class="gs s2" src="scenes/web/spark_p.webp" alt="">
      ${fl}</div>`;
  }
  function wishCard() {
    const w = wishes && wishes[wishOpen];
    if (!w) return `<p class="muted small" id="wishCard">${wishes && wishes.length ? u("tapFlower") : u("gardenEmpty")}</p>`;
    return `<div class="wishbubble" id="wishCard"><p>${escH(w.message)}</p><cite>- ${escH(w.name || "Guest")}</cite></div>`;
  }
  function loadWishes() {
    if (!apiOn()) return;
    apiGet("blessings").then((r) => {
      wishes = r.rows || [];
      const el = document.getElementById("gardenWrap");
      if (el) { el.innerHTML = gardenSvg(); document.getElementById("wishCard").outerHTML = wishCard(); }
    }).catch(() => {});
  }
  function viewWishes() {
    if (!apiOn()) return `<div class="card"><h2>${u("gardenTitle")}</h2><p class="soon">${u("soonOnline")}</p></div>`;
    loadWishes();
    const sent = store.get("wishSent", 0);
    return `<div class="card"><img class="stk" src="scenes/web/flw_09.webp" alt="" decoding="async"><h2>${u("gardenTitle")}</h2><p class="muted small" style="margin:0 0 8px">${u("gardenSub")}</p>
      <div id="gardenWrap" class="gardenWrap">${gardenSvg()}</div>${wishCard()}</div>
      <div class="card"><h3>${u("plant")}</h3>
      <form id="wishForm"><textarea class="search ta" name="message" required maxlength="140" placeholder="${u("wishPh")}"></textarea>
      <button class="btn fill" type="submit" ${sent >= 2 ? "disabled" : ""}>${u("plantBtn")}</button>
      <div class="muted small" id="wishMsg" style="margin-top:8px">${sent >= 2 ? u("wishLimit") : ""}</div></form></div>`;
  }
  function submitWish(form) {
    const message = form.message.value.trim();
    if (!message) return;
    const msg = document.getElementById("wishMsg");
    msg.textContent = "...";
    const w = { id: uid(), name: playerName() || "Guest", message };
    apiPost({ action: "blessing", ...w })
      .then(() => {
        store.set("wishSent", store.get("wishSent", 0) + 1);
        wishes = (wishes || []).concat([w]); wishOpen = wishes.length - 1;
        form.reset(); msg.textContent = u("wishDone");
        document.getElementById("gardenWrap").innerHTML = gardenSvg();
        document.getElementById("wishCard").outerHTML = wishCard();
        if (store.get("wishSent", 0) >= 2) form.querySelector("button").disabled = true;
      })
      .catch(() => { msg.textContent = u("tryAgain"); });
  }

  /* ---------- Fun page ---------- */
  let funTab = "play";
  const FUN_TABS = ["play", "board", "wishes"];
  function viewFun() {
    clearInterval(boardTimer);
    const seg = `<div class="seg" role="tablist">${FUN_TABS.map((t) => `<a role="tab" class="${t === funTab ? "on" : ""}" href="#fun/${t}">${u("fun_" + t)}</a>`).join("")}</div>`;
    let body = "";
    if (funTab === "play") {
      body = `${quizHtml()}${bingoHtml()}${factHtml()}
      <div class="card"><h2>${u("loveTitle")}</h2>
        <button class="heartbtn" data-act="heart">&#10084; ${u("loveBtn")}</button></div>`;
    } else if (funTab === "board") body = viewBoard();
    else body = viewWishes();
    return `${nameCard()}${seg}${body}`;
  }

  /* ---------- Lyrics ---------- */
  let lyricsIdx = 0;
  const lyricsCache = {};
  const CJK = /[\u3400-\u9fff\uf900-\ufaff]/, LATIN = /[A-Za-z]/;
  const SECTION = /^(pre-?chorus|chorus|verse|bridge|outro|intro|tag|chapter|interlude|ending)\b[\s\d:：]*$/i;
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  function parseLyrics(txt) {
    const lines = txt.replace(/^\uFEFF/, "").split(/\r?\n|\u000b/).map((l) => l.trim());
    let out = "", open = false, titleDropped = false, blank = false, secN = 0;
    const close = () => { if (open) out += "</div>"; open = false; };
    for (const line of lines) {
      if (!line) { blank = true; continue; }
      if (SECTION.test(line)) {
        close(); titleDropped = true;
        const fl = window.FLW || [0], fid = fl[(secN++ * 7 + 4) % fl.length];
        out += `<div class="sec rv"><img class="sf" src="scenes/web/flw_${String(fid).padStart(2, "0")}.webp" alt="">${esc(line.replace(/[:：]\s*$/, ""))}</div><div class="stanza rv">`; open = true; continue;
      }
      if (!titleDropped) { titleDropped = true; continue; } // first line of the file is the song title
      if (!open) { out += '<div class="stanza rv">'; open = true; }
      let zh = "", en = "";
      if (CJK.test(line) && LATIN.test(line)) {
        const m = line.match(/^(.*?[\u3400-\u9fff\uf900-\ufaff][^A-Za-z]*?)\s+([A-Za-z].*)$/);
        if (m) { zh = m[1]; en = m[2]; } else zh = line;
      } else if (CJK.test(line)) zh = line; else en = line;
      if (zh) out += `<div class="zhl">${esc(zh)}</div>`;
      if (en) out += `<div class="enl">${esc(en)}</div>`;
    }
    close();
    return out;
  }

  function loadLyrics(i) {
    const song = W.lyrics[i];
    if (lyricsCache[song.file] !== undefined) return Promise.resolve(lyricsCache[song.file]);
    const bundled = window.LYRICS_TXT && window.LYRICS_TXT[song.file];
    if (bundled) return Promise.resolve((lyricsCache[song.file] = parseLyrics(bundled)));
    return fetch(song.file).then((r) => (r.ok ? r.text() : Promise.reject())).then((t) => (lyricsCache[song.file] = parseLyrics(t)), () => null);
  }

  function viewLyrics() {
    const i = lyricsIdx;
    setTimeout(() => {
      loadLyrics(i).then((html) => {
        const el = document.getElementById("lyrics-body");
        if (el && lyricsIdx === i) { el.innerHTML = html || `<p class="soon">${u("lyricsMissing")}</p>`; if (fxKick) setTimeout(fxKick, 30); }
      });
    }, 0);
    const ly = W.lyrics[i];
    const bg = `<div class="agfx" aria-hidden="true"><img class="f1" src="scenes/web/bfly_purple.webp" alt=""><img class="f2" src="scenes/web/bfly_blue.webp" alt=""><img class="f3" src="scenes/web/dove_a.webp" alt=""></div>`;
    return `${bg}<div class="session-head"><img class="stk" src="scenes/web/lavender2.webp" alt="" decoding="async"><h2>${u("lyricsTitle")}</h2><div class="time">${u("lyricsSub")}</div></div><img class="gl" src="scenes/web/garland_lav.webp" alt="" decoding="async" style="--sg:1">
      <div class="seg songs" role="tablist">${W.lyrics.map((s, n) => `<button role="tab" aria-selected="${n === i}" class="${n === i ? "on" : ""}" data-act="lyric-tab" data-i="${n}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>${L(s.short || s.title)}</button>`).join("")}</div>
      <div class="card lyr">
        <div class="ly-top"><div class="ly-ico" aria-hidden="true">&#9834;</div><h2>${L(ly.title)}</h2><div class="ly-by">${ly.by}</div><img class="ly-gl" src="scenes/web/garland_pink.webp" alt=""></div>
        <div id="lyrics-body"><span class="muted small">...</span></div>
        <img class="ly-end" src="scenes/web/bouquet_lav.webp" alt=""></div>`;
  }

  /* ---------------- calendar file ---------------- */
  function downloadIcs() {
    const stamp = (d, hm) => d.replace(/-/g, "") + "T" + hm.replace(":", "") + "00";
    const ev = (uid, title, s, e, where) => [
      "BEGIN:VEVENT", "UID:" + uid + "@wedding", "DTSTAMP:20260101T000000Z",
      "DTSTART;TZID=Asia/Kuala_Lumpur:" + stamp(W.date, s), "DTEND;TZID=Asia/Kuala_Lumpur:" + stamp(W.date, e),
      "SUMMARY:" + title, "LOCATION:" + where, "END:VEVENT",
    ].join("\r\n");
    const where = (L(W.venue.name) + ", " + W.venue.address).replace(/,/g, "\\,");
    const names = W.couple.names.en;
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding//EN",
      ev("am", names + " - Solemnization", "10:00", "12:00", where),
      ev("pm", names + " - Reception", "18:30", "22:30", where),
      "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    a.download = "wedding.ics";
    a.click();
  }

  /* ---------------- shell ---------------- */
  const view = document.getElementById("view");
  let timer = null;

  const seen = () => { try { return sessionStorage.getItem("storySeen") === "1"; } catch (e) { return false; } };
  function route() {
    const raw = location.hash.replace("#", "");
    if (raw === "story") return "story";
    if (raw === "" && !seen()) return "intro"; // a guest who scans the QR code lands on the last (wedding) scene only
    const [tab, arg] = (raw || "home").split("/");
    const name = TABS.includes(tab) ? tab : "home";
    if (name === "seats" && arg) { selected = decodeURIComponent(arg); routeOn = true; }
    if (name === "fun") funTab = FUN_TABS.includes(arg) ? arg : "play";
    if (name === "lyrics" && arg !== undefined) lyricsIdx = Math.min(Math.max(+arg || 0, 0), W.lyrics.length - 1);
    return name;
  }

  // day (garden ceremony) or night (evening reception) look, by Malaysia time on the wedding day. ?mode=night to preview.
  function themeMode() {
    const forced = new URLSearchParams(location.search).get("mode");
    if (forced === "day" || forced === "night") return forced;
    const n = myNow();
    return n.date === W.date && n.min >= 17 * 60 + 30 ? "night" : "day";
  }
  function enterApp() {
    try { sessionStorage.setItem("storySeen", "1"); } catch (e) {}
    location.hash = "#home";
    if (location.hash !== "#home") render();
    window.scrollTo(0, 0);
  }

  function render() {
    const name = route();
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.documentElement.dataset.mode = themeMode();
    const appEl = document.getElementById("app");
    if (name === "story" || name === "intro") {
      appEl.hidden = true;
      document.body.classList.add("in-story");
      if (fxOff) fxOff();
      window.Story.show(lang, name);
      return;
    }
    document.body.classList.remove("in-story");
    window.Story.hide();
    appEl.hidden = false;
    document.title = lang === "zh" ? "Min Zheng & Janice 婚礼 - 2026年11月28日" : "Min Zheng & Janice - 28 Nov 2026";
    document.querySelectorAll(".lang button").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    document.getElementById("tabs").innerHTML = TABS.map((t) =>
      `<a href="#${t}" class="${t === name ? "on" : ""}" ${t === name ? 'aria-current="page"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[t]}</svg>${u(t)}</a>`).join("");
    view.innerHTML = { home: viewHome, agenda: viewAgenda, seats: viewSeats, lyrics: viewLyrics, fun: viewFun }[name]();
    clearInterval(timer);
    if (name === "home") { tickCountdown(); timer = setInterval(tickCountdown, 1000); }
    pageFx(name);
    if (name === "seats" && query()) runSearch();
  }

  /* ---------------- events ---------------- */
  document.querySelector(".lang").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    lang = b.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch (x) {}
    render();
  });

  view.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.id === "wishForm") submitWish(e.target);
  });
  view.addEventListener("input", (e) => { if (e.target.id === "search") { q = e.target.value; runSearch(); } });

  view.addEventListener("keydown", (e) => {
    const g = e.target.closest && e.target.closest("[data-table]");
    if (g && g.tagName === "g" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selectTable(g.dataset.table, true); }
  });

  view.addEventListener("click", (e) => {
    const fw = e.target.closest("[data-wish]");
    if (fw) { wishOpen = +fw.dataset.wish; document.getElementById("gardenWrap").innerHTML = gardenSvg(); document.getElementById("wishCard").outerHTML = wishCard(); return; }
    const tb = e.target.closest("[data-table]");
    if (tb) { hitName = tb.dataset.guest || ""; selectTable(tb.dataset.table, true); return; }
    if (e.target.closest("[data-act=seat-reset]")) { routeOn = false; refreshSeats(false); return; }
    if (e.target.closest("#ics")) { downloadIcs(); return; }
    const el = e.target.closest("[data-act]"); if (!el) return;
    const act = el.dataset.act;
    if (act === "name-save") {
      const v = (document.getElementById("nameIn").value || "").trim().slice(0, 20);
      if (v) { store.set("playerName", v); pushScore(); render(); }
      return;
    }
    if (act === "lyric-tab") { history.replaceState(null, "", "#lyrics/" + el.dataset.i); lyricsIdx = +el.dataset.i; render(); window.scrollTo(0, 0); return; }
    if (act === "quiz-pick") {
      quiz.picked = +el.dataset.i;
      if (quiz.picked === W.quiz[quiz.i].answer) quiz.score++;
      document.getElementById("quiz").outerHTML = quizHtml();
    } else if (act === "quiz-next") {
      quiz.picked = null; quiz.i++;
      if (quiz.i >= W.quiz.length) {
        quiz.done = true;
        const p = prog(); p.quizBest = Math.max(p.quizBest, quiz.score); store.set("progress", p); pushScore(); updatePts();
      }
      document.getElementById("quiz").outerHTML = quizHtml();
    } else if (act === "quiz-again") {
      quiz = { i: 0, score: 0, picked: null, done: false };
      document.getElementById("quiz").outerHTML = quizHtml();
    } else if (act === "bingo") {
      const i = +el.dataset.i, k = bingo.on.indexOf(i);
      k >= 0 ? bingo.on.splice(k, 1) : bingo.on.push(i);
      bingoNew = k < 0 ? i : -1;
      if (!bingoLines().length) bingo.celebrated = false;
      store.set("bingo", bingo);
      if (k < 0) {
        const p = prog(); p.done[bingo.cells[i]] = true;
        if (bingoLines().length) p.line = true;
        store.set("progress", p); pushScore(); updatePts();
      }
      document.getElementById("bingo").outerHTML = bingoHtml();
    } else if (act === "bingo-new") {
      initBingo(true);
      document.getElementById("bingo").outerHTML = bingoHtml();
    } else if (act === "fact") {
      const pool = W.tables.filter((t) => L(t.fun));
      const t = pool[Math.floor(Math.random() * pool.length)];
      document.getElementById("factbox").innerHTML = `<div>${L(t.fun)}<div class="muted small" style="font-family:var(--sans);margin-top:8px">- ${tableLabel(t)}</div></div>`;
    } else if (act === "heart") {
      const r = el.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        const h = document.createElement("span");
        h.className = "heart"; h.textContent = ["❤", "💕", "🤍"][i % 3];
        h.style.left = r.left + Math.random() * r.width + "px";
        h.style.top = r.top + "px";
        h.style.animationDelay = i * 0.08 + "s";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 2000);
      }
    }
  });

  document.getElementById("story").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.lang) {
      lang = b.dataset.lang;
      try { localStorage.setItem("lang", lang); } catch (x) {}
      const y = window.scrollY; render(); window.scrollTo(0, y);
    } else if (b.dataset.act === "enter") enterApp();
  });
  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
  render();
  if (route() === "seats" && selected) setTimeout(() => { const c = document.getElementById("tcard"); c && c.scrollIntoView({ block: "start" }); }, 50);
})();

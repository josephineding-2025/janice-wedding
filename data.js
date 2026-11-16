/* ==========================================================================
   EDIT THIS FILE to change content. No other file needs touching.
   Every text is { en: "...", zh: "..." }. Leave "" for anything not ready yet.
   ========================================================================== */

window.WEDDING = {
  // Set to false before sharing the QR code: hides the orange "SAMPLE" badges
  // that mark placeholder content (quiz, love story, bingo...).
  showSampleBadges: true,

  couple: {
    names: { en: "Min Zheng & Janice", zh: "Min Zheng & Janice" }, // put Chinese names in zh if you like
    hashtag: "#JaniceSettleLeow",
  },

  date: "2026-11-28",
  // Malaysia time, +08:00
  ceremonyStart: "2026-11-28T10:00:00+08:00",
  dateText: { en: "Saturday, 28 November 2026", zh: "2026年11月28日 星期六" },

  venue: {
    name: { en: "E&O Hotel, Grand Ballroom", zh: "E&O 酒店 大宴会厅" },
    address: "10 Lebuh Farquhar, George Town, 10200 Penang",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=E%26O+Hotel+Penang",
    wazeUrl: "https://waze.com/ul?q=E%26O%20Hotel%20Penang",
  },

  // Optional links. Leave "" to hide the button.
  links: {
    // Photo challenges: guests upload max 3 photos per challenge.
    // Make one Google Form per challenge (File upload question, "Maximum number of files: 3"),
    // then paste each form link into photoUploads below, keyed by the bingo item id.
    // photoUploadUrl is the fallback used for any challenge without its own link.
    photoUploadUrl: "https://event.pics/minzheng-janice-wedding",
    photoUploads: {
      // handHold: "https://forms.gle/xxxx",
    },
    whatsapp: "", // e.g. "https://wa.me/60123456789"
  },

  // ---- Scroll story (landing page). Order matches ORDER in story.js ----
  storyUi: {
    kicker: { en: "A little love story", zh: "一段小小的爱情故事" },
    sub: { en: "Scroll to walk through our story, all the way to the wedding.", zh: "往下滑，一路走进我们的婚礼。" },
    scroll: { en: "scroll", zh: "往下滑" },
    skip: { en: "skip", zh: "跳过" },
    enter: { en: "Walk the red carpet", zh: "走上红地毯" },
  },
  chapters: [
    {
      title: { en: "Where it all began", zh: "一切从这里开始" },
      text: {
        en: "Sunway University. We were one batch apart, yet our paths crossed and our worlds collided. We graduated just three months apart.",
        zh: "双威大学。我们虽然相差一届，但命运让我们的路相遇、世界碰撞。我们毕业的时间只相差三个月。",
      },
    },
    {
      title: { en: "The unofficial tuition teacher", zh: "非正式补习老师" },
      text: {
        en: "Countless hours in the library. She studied hard, and he somehow became her unofficial tuition teacher.",
        zh: "在图书馆度过无数时光。她认真读书，而他不知不觉成了她的「非正式补习老师」。",
      },
    },
    {
      title: { en: "Penang to KL", zh: "槟城到吉隆坡" },
      text: {
        en: "Two years of long distance. Long bus rides, long drives and long goodbyes. Not always easy, but always worth it.",
        zh: "两年的异地恋。漫长的巴士、漫长的车程、漫长的道别。不总是容易，但永远值得。",
      },
    },
    {
      title: { en: "Keys, masks and selfies", zh: "钥匙、口罩与自拍" },
      text: {
        en: "Min Zheng got ready to leave for Singapore and handed the car keys to Janice in KL. Lots of mask-era selfies later, it was long distance again for 2.5 years.",
        zh: "Min Zheng 准备前往新加坡，把车钥匙交给留在吉隆坡的 Janice。接着是好多口罩年代的自拍，再一次异地，一共两年半。",
      },
    },
    {
      title: { en: "Our first trip together", zh: "第一次一起旅行" },
      text: { en: "The USA, August 2022.", zh: "美国，2022年8月。" },
    },
    {
      title: { en: "No more long distance", zh: "不再异地" },
      text: {
        en: "June 2023. Janice moved from KL to Singapore. Same city, finally.",
        zh: "2023年6月，Janice 从吉隆坡搬到了新加坡。终于在同一座城市。",
      },
    },
    {
      title: { en: "Life in Singapore", zh: "在新加坡的日子" },
      text: {
        en: "Working hard, and eating even harder. EAT! is still our favourite activity.",
        zh: "努力工作，更努力吃饭。吃，依然是我们最爱一起做的事。",
      },
    },
    {
      title: { en: "The proposal", zh: "求婚" },
      text: {
        en: "A boat, a sunset and an island in Thailand. She said yes.",
        zh: "泰国小岛、一艘船、一个日落。她说了「我愿意」。",
      },
    },
    {
      title: { en: "We are getting married!", zh: "我们要结婚了！" },
      text: {
        en: "28 November 2026, E&O Hotel, Penang. Walk the red carpet with us.",
        zh: "2026年11月28日，槟城 E&O 酒店。和我们一起走上红地毯。",
      },
    },
  ],

  // ---- Illustrations for the scroll story ----
  // Drop your own artwork into the scenes/ folder and list it here. Any scene left empty uses the drawn fallback.
  // See scenes/README.txt for sizes and ready-made prompts. Keys: cover, sunway, library, map, keys, usa, sg, life, proposal, wedding
  sceneImages: {
    cover: "scenes/web/cover.webp",
    sunway: "scenes/web/sunway.webp",
    library: "scenes/web/library.webp",
    map: "scenes/web/map.webp",
    keys: "scenes/web/keys.webp",
    usa: "scenes/web/usa.webp",
    sg: "scenes/web/sg.webp",
    life: "scenes/web/life.webp",
    proposal: "scenes/web/proposal.webp",
    wedding: "scenes/web/wedding.webp",
  },

  // ---- Shared features backend (leaderboard, song requests, wish garden). See backend/README.txt ----
  // Paste the Google Apps Script web app URL here. Leave "" to keep these features switched off.
  api: { url: "https://script.google.com/macros/s/AKfycbytLMPei1WuGWM8BtS5S9SG9b7npjSzJ5MPVl8YrFrVNbxfkgM4YaPeTNCP9INyANNE/exec" },

  // ---- Agenda ----
  // Items with a `time` get highlighted live on the wedding day.
  agenda: [
    {
      id: "morning",
      start: "10:00",
      end: "12:00",
      title: { en: "Garden Solemnization Ceremony", zh: "花园证婚礼" },
      emcee: "Andre",
      items: [
        { t: { en: "Prelude", zh: "序曲" } },
        { t: { en: "Processional", zh: "新人进场" } },
        { t: { en: "Opening prayer", zh: "开场祷告" }, who: "Ps Stella Ma" },
        {
          t: { en: "Praise & worship", zh: "敬拜赞美" },
          who: "Mei Young",
          songs: ["Goodness of God", "爱使我们勇敢 / 我们爱  Love Can Make Us Brave / We Will Love"],
        },
        { t: { en: "Scripture reading", zh: "经文诵读" }, who: "Ps Stella Ma" },
        { t: { en: "Sermon encouragement", zh: "勉励讲道" }, who: "Rev Benjamin" },
        { t: { en: "Exchange of vows", zh: "交换誓言" }, who: "Min Zheng & Janice" },
        { t: { en: "Solemnization of marriage", zh: "证婚" }, who: "Rev Benjamin" },
        { t: { en: "Exchange of rings", zh: "交换戒指" }, who: "Min Zheng & Janice" },
        { t: { en: "Kiss the bride", zh: "亲吻新娘" } },
        { t: { en: "Benediction", zh: "祝福祷告" } },
        { t: { en: "Recessional march", zh: "新人退场" } },
        { t: { en: "Photo session", zh: "合影留念" } },
        { t: { en: "Refreshment", zh: "茶点" } },
      ],
    },
    {
      id: "break",
      start: "12:00",
      end: "18:30",
      isBreak: true,
      title: { en: "See you in the evening", zh: "傍晚再见" },
      note: { en: "Rest and freshen up. Doors open at 6.30pm.", zh: "稍作休息，晚上6:30开始入场。" },
    },
    {
      id: "evening",
      start: "18:30",
      end: "22:30",
      title: { en: "Evening Reception", zh: "晚宴" },
      venue: { en: "Grand Ballroom", zh: "大宴会厅" },
      items: [
        {
          time: "18:30",
          t: { en: "Sip, Snap & Say Hi", zh: "举杯、拍照、笑一个" },
          d: { en: "Cocktails in hand, props at the photobooth, and a whole lot of smiles as we gather.", zh: "鸡尾酒在手，拍照亭道具齐全，让我们在欢笑中相聚。" },
        },
        {
          time: "19:30",
          t: { en: "Dinner is Served", zh: "盛宴开席" },
          d: { en: "Find your table, settle in and enjoy a feast made for celebrating.", zh: "找到您的座位，入座享用这场为庆祝而设的盛宴。" },
        },
        {
          time: "21:30",
          t: { en: "The Grand Return & Yam Seng!", zh: "新人再度登场，大家一起干杯！" },
          d: { en: "The couple makes a second grand entrance. Glasses up for the big toast!", zh: "新人第二次闪亮登场，高举酒杯，一起祝酒！" },
        },
        {
          time: "22:30",
          t: { en: "Happily Ever After Begins", zh: "幸福从此开始" },
          d: { en: "Thank you for making our night unforgettable. Safe journey home!", zh: "感谢您让这个夜晚如此难忘，回程平安！" },
        },
      ],
    },
  ],

  // ---- Lyrics tab (praise & worship) ----
  // Lyrics are loaded from plain-text files in /lyrics (see lyrics/README.txt).
  lyrics: [
    {
      title: { en: "Goodness of God", zh: "Goodness of God" },
      short: { en: "Goodness of God", zh: "Goodness of God" },
      by: "Bethel Music / Jenn Johnson",
      file: "lyrics/goodness-of-god.txt",
    },
    {
      title: { en: "Love Can Make Us Brave / We Will Love", zh: "爱使我们勇敢 / 我们爱" },
      short: { en: "Love Can Make Us Brave", zh: "爱使我们勇敢" },
      by: "Stream of Praise 赞美之泉",
      file: "lyrics/love-can-make-us-brave.txt",
    },
  ],

  // ---- Tables ----
  // Fill in: tag (who they are to us, short), intro, fun (fun fact), guests (names, used by "Find my seat").
  // Table ids match the floor plan: "main", 2 ... 29, "R".
  tables: [
    T("main", { en: "Main Table", zh: "主桌" }),
    T(2), T(3), BRIDE(4), BRIDE(5), BRIDE(6), BRIDE(7), BRIDE(8), T(9), T(10),
    T(11), T(12), T(13), T(14), T(15), T(16), T(17), T(18), T(19), T(20),
    T(21), T(22), T(23), T(24), T(25), T(26), T(27), T(28), T(29), T(30), T(31),
    T("R", { en: "Table R", zh: "R桌" }),
  ],

  // Table 2 as a worked example. Copy this shape to the other tables.
  // (Replace T(2) above with this once you have the real info.)
  tableExample: {
    id: 2,
    tag: { en: "Church family", zh: "教会家人" },
    intro: {
      en: "The people who prayed for us long before we met.",
      zh: "在我们相遇之前就一直为我们祷告的人。",
    },
    fun: {
      en: "Together they have attended 300+ Sunday services.",
      zh: "他们加起来已经参加了300多次主日崇拜。",
    },
    guests: ["Guest One", "Guest Two"],
  },

  // ---- Fun: quiz (5 questions from the couple's story) ----
  quiz: [
    Q("Where did Min Zheng & Janice first meet?", "Min Zheng 和 Janice 是在哪里认识的？",
      [["Sunway University", "双威大学"], ["At church", "教会"], ["At work", "工作场所"], ["On a flight", "飞机上"]], 0,
      "Two Penangites, far from home. They both stayed at the hostel.", "两个槟城人，在离家很远的地方相遇，当时都住在宿舍。"),
    Q("Where did they spend countless hours together?", "他们一起度过最多时间的地方是？",
      [["The gym", "健身房"], ["The library", "图书馆"], ["The cinema", "电影院"], ["The beach", "海边"]], 1,
      "Min Zheng became Janice's unofficial tuition teacher while she studied.", "Min Zheng 成了 Janice 的「非正式补习老师」。"),
    Q("What was their first movie together?", "他们一起看的第一部电影是？",
      [["The Fault in Our Stars", "星运里的错"], ["Titanic", "泰坦尼克号"], ["La La Land", "爱乐之城"], ["The Notebook", "恋恋笔记本"]], 0,
      "He was the one who always asked her out for dinner at the hostel.", "总是约她吃晚餐的是新郎，第一次看电影也是他开口邀约。"),
    Q("What is their favourite activity to do together?", "他们最爱一起做的事是？",
      [["Hiking", "爬山"], ["Gaming", "打游戏"], ["Eating", "吃东西"], ["Shopping", "逛街"]], 2,
      "EAT! He claims he was a thin, handsome lad when they first met.", "吃！他说刚认识时自己还是个瘦瘦的帅小伙。"),
    Q("Which trip is their most memorable one so far?", "他们最难忘的旅行是去哪里？",
      [["Japan", "日本"], ["Italy", "意大利"], ["Korea", "韩国"], ["Switzerland", "瑞士"]], 1,
      "The sunsets, the lake, the glacier and the FOOD!", "日落、湖泊、冰川，还有美食！"),
  ],

  // ---- Fun: bingo ----
  // Each cue has a type, shown as an icon in front of the text:
  //   photo = take a photo and upload 1 (keep these to 3)
  //   say   = say something out loud (dialect cues: always explain the meaning in English)
  //   do    = go and do something with other guests
  //   spot  = just tap when you notice it happening
  // A cue with pin: true appears on every card.
  // Each guest gets a random card of 9 squares (all 3 photo cues, every pinned cue, and the rest picked at random). Get 3 in a row to win.
  bingo: [
    { id: "tableSquad", type: "photo", en: "Your whole table, same silly pose", zh: "全桌同一个搞怪姿势合照" },
    { id: "candid", type: "photo", en: "Best candid shot of the bride and groom", zh: "拍下新郎新娘最自然的瞬间" },
    { id: "newFriend", type: "photo", en: "Selfie with a new friend", zh: "和新朋友自拍" },
        { id: "hokkien1", type: "say", pin: true, en: "Ask a stranger \"Jiak bah bue?\" (食饱未) in Hokkien. It means \"Have you eaten yet?\"", zh: "用福建话问一位陌生宾客「Jiak bah bue？」（食饱未，意思是：吃饱了吗？）" },
    { id: "canto1", type: "say", en: "Shout \"Yám sing!\" (饮胜) with your table in Cantonese. It means \"Cheers, bottoms up!\"", zh: "和同桌用广东话高喊「饮胜！」（意思是：干杯）" },
    { id: "canto2", type: "say", en: "Wish the couple \"Baahk tàuh gāai lóuh\" (白头偕老) in Cantonese. It means \"May you grow old together.\"", zh: "用广东话祝福新人「白头偕老」（祝福两人相伴到老）" },
    { id: "toastStranger", type: "do", en: "Toast with a stranger", zh: "和陌生人碰杯" },
        { id: "band", type: "do", pin: true, en: "Sing along to at least 1 song with the live band", zh: "和现场乐队一起至少唱一首歌" },
    { id: "farthest", type: "do", en: "Find the guest who travelled the farthest", zh: "找出远道而来的宾客" },
    { id: "handshake", type: "do", en: "Teach your table a secret handshake", zh: "教同桌一个秘密握手" },
    { id: "ring", type: "do", en: "Get the bride to show you her ring", zh: "请新娘给你看戒指" },
    { id: "meet", type: "do", en: "Meet someone from another table", zh: "认识别桌的新朋友" },
    { id: "booth", type: "do", pin: true, en: "Take a photo and hashtag us on Insta! {hashtag}", zh: "拍张照，并在 Instagram 标记我们！{hashtag}" },
    { id: "handHold", type: "spot", en: "Spot a guest holding the bride's hand", zh: "看到有宾客牵着新娘的手" },
    { id: "laugh", type: "spot", en: "Catch the couple laughing out loud", zh: "看到新人开怀大笑" },
    { id: "cry", type: "spot", en: "Spot someone tearing up happily", zh: "发现有人感动落泪" },
    { id: "aunty", type: "spot", en: "Hear an aunty ask \"Next is you?\"", zh: "听到长辈问「下一个就是你了吧？」" },
    { id: "dance", type: "spot", en: "See an uncle bust a dance move", zh: "看到叔叔跳起舞来" },
    { id: "sneak", type: "spot", en: "Catch someone sneaking a bite before the toast", zh: "抓到有人在祝酒前偷吃" },
  ],

  // ---- Bingo win: a random blessing + a short verse (NIV in English, 和合本 in Mandarin) ----
  blessings: [
    { en: "May your year be filled with joy and good company.", zh: "愿您这一年充满喜乐与良伴。" },
    { en: "Wishing you love that grows deeper every day.", zh: "愿您的爱一天比一天更深。" },
    { en: "May good health and laughter follow you everywhere.", zh: "愿健康与欢笑常伴您左右。" },
    { en: "May every door you knock on open with a smile.", zh: "愿您敲的每一扇门都带着笑容为您打开。" },
    { en: "Wishing you peace in your heart and happiness at home.", zh: "愿您心中平安，家中喜乐。" },
    { en: "May your table always be full and your heart fuller.", zh: "愿您的餐桌常满，心里更满。" },
    { en: "May you find a reason to celebrate every single day.", zh: "愿您每一天都有值得庆祝的理由。" },
    { en: "Thank you for celebrating with us. May blessings find you too.", zh: "谢谢您与我们同庆，愿祝福也临到您。" },
    { en: "May your dreams grow bigger and your worries grow smaller.", zh: "愿您的梦想越来越大，忧虑越来越少。" },
    { en: "May the people you love always be close to you.", zh: "愿您所爱的人常在身边。" },
    { en: "Wishing you a year of new adventures and old friends.", zh: "愿您一年里有新的冒险，也有旧的好友。" },
    { en: "May kindness find you wherever you go.", zh: "愿无论走到哪里，善意都与您相遇。" },
    { en: "May your work be fruitful and your rest be sweet.", zh: "愿您工作丰盛，休息甜美。" },
    { en: "Wishing you laughter that makes your cheeks hurt.", zh: "愿您笑到脸颊发酸。" },
    { en: "May you always have someone to share good food with.", zh: "愿您永远有人与您分享美食。" },
    { en: "May you be surprised by good news this year.", zh: "愿您今年有好消息带来惊喜。" },
    { en: "May your home be full of warmth and your heart full of hope.", zh: "愿您家中温暖，心中充满盼望。" },
    { en: "Wishing you courage for tomorrow and gratitude for today.", zh: "愿您有面对明天的勇气，也有感恩今天的心。" },
    { en: "May love find you in the little things.", zh: "愿您在小事中也遇见爱。" },
    { en: "May you shine brightly and be a blessing to others.", zh: "愿您发光发亮，成为别人的祝福。" },
    { en: "Wishing you good company, good food and good news.", zh: "愿您有好伙伴、好美食和好消息。" },
    { en: "May your steps be guided and your path be bright.", zh: "愿您的脚步有引领，前路明亮。" },
    { en: "May every day bring you something to smile about.", zh: "愿每一天都有让您微笑的事。" },
    { en: "Wishing you a love story as beautiful as the one you witnessed today.", zh: "愿您拥有像今天所见证的一样美好的爱情故事。" },
  ],
  verses: [
    {
      ref: { en: "1 Corinthians 13:13 (NIV)", zh: "哥林多前书 13:13（和合本）" },
      en: "And now these three remain: faith, hope and love. But the greatest of these is love.",
      zh: "如今常存的有信，有望，有爱这三样，其中最大的是爱。",
    },
    {
      ref: { en: "Ecclesiastes 4:9 (NIV)", zh: "传道书 4:9（和合本）" },
      en: "Two are better than one, because they have a good return for their labor.",
      zh: "两个人总比一个人好，因为二人劳碌同得美好的果效。",
    },
    {
      ref: { en: "1 John 4:19 (NIV)", zh: "约翰一书 4:19（和合本）" },
      en: "We love because he first loved us.",
      zh: "我们爱，因为神先爱我们。",
    },
    {
      ref: { en: "Proverbs 17:17 (NIV)", zh: "箴言 17:17（和合本）" },
      en: "A friend loves at all times.",
      zh: "朋友乃时常亲爱。",
    },
    {
      ref: { en: "Psalm 126:3 (NIV)", zh: "诗篇 126:3（和合本）" },
      en: "The LORD has done great things for us, and we are filled with joy.",
      zh: "耶和华为我们行了大事，我们就欢喜。",
    },
    {
      ref: { en: "Numbers 6:24-25 (NIV)", zh: "民数记 6:24-25（和合本）" },
      en: "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you.",
      zh: "愿耶和华赐福给你，保护你；愿耶和华使他的脸光照你，赐恩给你。",
    },
    {
      ref: { en: "Colossians 3:14 (NIV)", zh: "歌罗西书 3:14（和合本）" },
      en: "And over all these virtues put on love, which binds them all together in perfect unity.",
      zh: "在这一切之外，要存着爱心，爱心就是联络全德的。",
    },
    {
      ref: { en: "Proverbs 18:22 (NIV)", zh: "箴言 18:22（和合本）" },
      en: "He who finds a wife finds what is good and receives favor from the LORD.",
      zh: "得着贤妻的，是得着好处，也是蒙了耶和华的恩惠。",
    },
    {
      ref: { en: "Song of Songs 8:7 (NIV)", zh: "雅歌 8:7（和合本）" },
      en: "Many waters cannot quench love; rivers cannot sweep it away.",
      zh: "爱情，众水不能熄灭，大水也不能淹没。",
    },
    {
      ref: { en: "Psalm 118:24 (NIV)", zh: "诗篇 118:24（和合本）" },
      en: "The LORD has done it this very day; let us rejoice today and be glad.",
      zh: "这是耶和华所定的日子，我们在其中要高兴欢喜。",
    },
    {
      ref: { en: "Philippians 4:4 (NIV)", zh: "腓立比书 4:4（和合本）" },
      en: "Rejoice in the Lord always. I will say it again: Rejoice!",
      zh: "你们要靠主常常喜乐；我再说，你们要喜乐。",
    },
    {
      ref: { en: "Romans 12:12 (NIV)", zh: "罗马书 12:12（和合本）" },
      en: "Be joyful in hope, patient in affliction, faithful in prayer.",
      zh: "在指望中要喜乐；在患难中要忍耐；祷告要恒切。",
    },
    {
      ref: { en: "Romans 15:13 (NIV)", zh: "罗马书 15:13（和合本）" },
      en: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
      zh: "愿盼望的神，因信将诸般的喜乐平安充满你们的心，使你们藉着圣灵的能力大有盼望。",
    },
    {
      ref: { en: "Proverbs 3:5-6 (NIV)", zh: "箴言 3:5-6（和合本）" },
      en: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      zh: "你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定他，他必指引你的路。",
    },
    {
      ref: { en: "Psalm 37:4 (NIV)", zh: "诗篇 37:4（和合本）" },
      en: "Take delight in the LORD, and he will give you the desires of your heart.",
      zh: "又要以耶和华为乐，他就将你心里所求的赐给你。",
    },
    {
      ref: { en: "Jeremiah 29:11 (NIV)", zh: "耶利米书 29:11（和合本）" },
      en: "“For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.”",
      zh: "耶和华说：我知道我向你们所怀的意念是赐平安的意念，不是降灾祸的意念，要叫你们末后有指望。",
    },
    {
      ref: { en: "Ephesians 4:2 (NIV)", zh: "以弗所书 4:2（和合本）" },
      en: "Be completely humble and gentle; be patient, bearing with one another in love.",
      zh: "凡事谦虚、温柔、忍耐，用爱心互相宽容。",
    },
    {
      ref: { en: "1 Corinthians 16:14 (NIV)", zh: "哥林多前书 16:14（和合本）" },
      en: "Do everything in love.",
      zh: "凡你们所做的，都要凭爱心而做。",
    },
    {
      ref: { en: "Psalm 34:8 (NIV)", zh: "诗篇 34:8（和合本）" },
      en: "Taste and see that the LORD is good; blessed is the one who takes refuge in him.",
      zh: "你们要尝尝主恩的滋味，便知道他是美善；投靠他的人有福了！",
    },
    {
      ref: { en: "Romans 12:10 (NIV)", zh: "罗马书 12:10（和合本）" },
      en: "Be devoted to one another in love. Honor one another above yourselves.",
      zh: "爱弟兄，要彼此亲热；恭敬人，要彼此推让。",
    },
    {
      ref: { en: "1 Peter 4:8 (NIV)", zh: "彼得前书 4:8（和合本）" },
      en: "Above all, love each other deeply, because love covers over a multitude of sins.",
      zh: "最要紧的是彼此切实相爱，因为爱能遮掩许多的罪。",
    },
    {
      ref: { en: "Psalm 107:1 (NIV)", zh: "诗篇 107:1（和合本）" },
      en: "Give thanks to the LORD, for he is good; his love endures forever.",
      zh: "你们要称谢耶和华，因他本为善；他的慈爱永远长存！",
    },
  ],
  nivNotice: "Scripture quotations taken from the Holy Bible, New International Version\u00AE, NIV\u00AE. Copyright \u00A9 1973, 1978, 1984, 2011 by Biblica, Inc.\u00AE Used by permission. All rights reserved worldwide.",
};

function Q(en, zh, opts, answer, noteEn, noteZh) {
  return {
    sample: false,
    q: { en, zh },
    options: opts.map(([e, z]) => ({ en: e, zh: z })),
    answer,
    note: { en: noteEn || "", zh: noteZh || "" },
  };
}

function BRIDE(id) {
  const t = T(id);
  t.tag = { en: "Bride's Family & Relatives", zh: "新娘家人与亲戚" };
  t.intro = { en: "Janice's family and relatives.", zh: "Janice 的家人与亲戚。" };
  return t;
}

function T(id, name) {
  return {
    id,
    name: name || { en: "Table " + id, zh: "第" + id + "桌" },
    tag: { en: "", zh: "" },
    intro: { en: "", zh: "" },
    fun: { en: "", zh: "" },
    guests: [],
  };
}

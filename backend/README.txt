Shared features backend (leaderboard, song requests, wish garden)
==================================================================
The website itself is static, so phones cannot share data by themselves.
This tiny Google Apps Script stores everything in a Google Sheet that you own.
It is free. It takes about 5 minutes.

1. Go to sheets.google.com and create a blank spreadsheet. Name it "Wedding site data".
2. In the sheet: Extensions > Apps Script. Delete the default code and paste all of Code.gs. Save.
   (Optional: put your email in NOTIFY_EMAIL at the top to get an email for every song request.)
3. Click Deploy > New deployment > type "Web app".
      Execute as: Me
      Who has access: Anyone
   Click Deploy and approve the permissions. Copy the "Web app URL".
4. Open data.js and paste that URL into:   api: { url: "https://script.google.com/macros/s/.../exec" },
5. Re-upload the site. Done.

On the day
----------
- Song requests: open the "Songs" tab of the sheet. Share the sheet with the band or the emcee
  (Share > add their email, Viewer). New rows appear at the bottom. Tick the "played" column as you go.
- Wish garden: every blessing is a row in the "Blessings" tab. To hide one, change its "show" cell to FALSE.
- Leaderboard: the "Scores" tab. Delete a row to remove a player.

Notes
-----
- Scores are sent from each guest's phone, so a determined guest could cheat. It is a party game, so this is fine.
- Each phone checks the leaderboard about every 40 seconds while it is open, and the script caches the answer
  for 10 seconds, so 200 guests will not overload it.
- If you change the script later, use Deploy > Manage deployments > edit > New version (the URL stays the same).


Guest list for "Find my seat" (added later)
-------------------------------------------
The site reads the tab named "Copy of guest list" in this same spreadsheet (name set by GUEST_TAB at the top of Code.gs).
- It understands four layouts: (1) one column per table (table names across the top row, an optional description row under it, then the
  guests below); (2) one row per table (Table | description | guest | guest ...); (3) a long list with Name and Table columns
  (and an optional Description column); (4) the description written in the table header itself, e.g. "Table 5 - Bridesmaid team".
- Table ids: "5", "Table 5", "第5桌", "Main", "Main table", "主桌", "R".
- Edits to the sheet show up on the site within about a minute (the script caches the sheet for 45 seconds).
- Guests only get the names they search for, or the guests of one table they tap. The whole list is never sent at once.
- To check how the tab was read: put any secret in DEBUG_KEY in Code.gs, deploy a new version, then open
      <web app url>?action=debug&key=<your secret>
  Clear DEBUG_KEY again afterwards.
- Song requests were removed from the site, so the "Songs" tab is no longer used.

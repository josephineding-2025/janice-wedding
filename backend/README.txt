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

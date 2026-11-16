Illustrations for the scroll story
==================================
How it fits together
  scenes/*.jpg|png|webp   your original illustrations (big files, do NOT upload these to the website)
  scenes/cut/             individual cut-outs sliced from the sticker sheets (working files, do not upload)
  scenes/web/             the optimised files the website really uses (upload this folder)

If you change or add artwork
  1. Put the new original in scenes/ with the scene name (cover, sunway, library, map, keys, usa, sg, life, proposal, wedding).
  2. Run:  python tools/build_scenes.py     (whitens the paper, trims margins, shrinks to phone size, writes scenes/web)
  3. Cut-outs (people, doves, bus, plane): put a sheet on a plain white or transparent background and run
         python tools/cut_sheets.py <sheet> <prefix> alpha     (transparent sheet)
         python tools/cut_sheets.py <sheet> <prefix> white     (white sheet)
     then pick the pieces you want in tools/pick_pieces.py and run it.
  4. Flower-bush panels for the bush transition (a sheet on a dark background):
         python tools/cut_bushes.py <sheet.jpg>
  Needs Python with Pillow, numpy and scipy.

Where movement is set
  story.js, IMG_ART: for each scene, which cut-outs appear and how they move (slide, rise, fade, fly across).
  Positions are percentages of the picture so they stay lined up on every screen.

Prompts for new scenes (ChatGPT image, Midjourney, Canva AI, etc.)
  Style line:   "Hand-drawn pen and ink illustration with soft watercolour washes in lavender, dusty blue and blush, on a plain
                 white background. Fine black linework, elegant vintage botanical storybook style, realistic slim proportions,
                 not cartoonish, no text, no frame, generous white space."
  Characters:   attach your real photos as reference.

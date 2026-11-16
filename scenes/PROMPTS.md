# Prompts for the missing artwork (ChatGPT image, or any image AI)

## Always do this
1. Attach `scenes/cover.webp` (the couple on the cover) and one or two of your favourite scene pictures, and write:
   **"Use the attached pictures as the exact art style and as the exact look of the two characters."**
   Also attach 2 or 3 real photos of Min Zheng and Janice so the faces and hair stay recognisable.
2. Ask for **one figure picture at a time**, on a **plain pure white background**, nothing else in the picture.
3. Save the picture, then turn it into a cut-out and put it in the scene with:
   `python tools/cut_figure.py <picture.png> <scene>`   (scene = sunway, usa, sg, proposal, wedding, ...)
   The website then uses it automatically instead of the old half-length placeholder people.

## Shared style block (paste into every prompt)
> Hand-drawn pen and ink illustration with soft watercolour washes in lavender, dusty blue, blush pink and sage green.
> Fine black ink linework with light cross-hatching, delicate elegant vintage storybook style, realistic slim proportions,
> soft natural faces with gentle smiles, not cartoonish, not cute, no text, no border, no ground shadow.
> **Full-length figures, head to toe, including shoes, standing on nothing, isolated on a plain pure white background
> with generous space around them.** Portrait 2:3 picture.

## The two characters
> Min Zheng: young Chinese man, short dark hair swept up slightly, round gentle face, slim build, light-blue linen shirt with
> sleeves rolled up, charcoal trousers.
> Janice: young Chinese woman, long dark wavy hair past her shoulders, bright smile, pastel lavender floral dress.

## 1. Wedding couple walking in (scene `wedding`)
> [Shared style block] [The two characters, but in wedding clothes: Min Zheng in a dark navy suit with a small pink pocket
> flower, Janice in an elegant white wedding dress with a soft veil and a small bouquet of lavender roses.]
> The couple walk side by side, hand in hand, seen from slightly behind and to the side, as if walking up an aisle away from
> the viewer. Full length, head to toe, white background.

## 2. Proposal (scene `proposal`)
> [Shared style block] [The two characters.] Min Zheng kneels on one knee holding out a bouquet of pink roses and an open ring
> box. Janice stands in front of him with both hands covering her mouth in happy surprise, her ring hand visible.
> Both full length, head to toe, side view, on a plain white background (no boat, no sea).

## 3. Moving in to Singapore (scene `sg`)
> [Shared style block] [The two characters.] Janice is moving in. She walks happily pulling a lavender rolling suitcase and
> carrying a tote bag. Min Zheng walks beside her helping, carrying a tall stack of cardboard moving boxes tied with twine
> and one more bag over his shoulder. Both smiling at each other, walking left to right. Full length, head to toe, white background.

## 4. Graduation (scene `sunway`)
> [Shared style block] [The two characters, both in navy graduation gowns and caps, each holding a small bouquet of pink roses
> and a rolled certificate.] Standing side by side, facing the viewer, full length down to their shoes, white background.

## 5. First trip, USA (scene `usa`)
> [Shared style block] [The two characters in casual travel clothes: Min Zheng with a backpack, Janice with a small
> crossbody bag and a sun hat.] They stroll together looking at the view, pulling a vintage suitcase. Full length,
> head to toe, seen from the side, white background.

## 6. Work hard and eat (scene `life`)
> Two separate pictures on one white sheet, spaced apart: (a) Min Zheng and Janice sitting at separate desks, each typing on a
> laptop with a cup of coffee; (b) the two of them sitting at a small round table happily eating noodles, satay and chilli crab.
> [Shared style block] [The two characters.] Each shown in full, white background, nothing overlapping.

## 7. Library (scene `library`)
> [Shared style block] [The two characters.] Min Zheng stands holding a book and explaining with one hand raised, like a friendly
> tutor. Janice sits at a small desk resting her chin on her hand, listening. Full length including the chair and desk, white background.

---

# Corner bushes, vines and flowers (the pieces that move at the screen corners)

Paste this into ChatGPT, and attach `scenes/web/bush_pink_l.webp`, `scenes/web/bush_purple_l.webp` as style examples:

> Create a sticker sheet of hand-drawn flower foliage pieces for use as decorative screen corners. Style: pen and ink linework
> with soft watercolour washes in lavender, periwinkle blue, blush pink, peach and sage green, elegant vintage botanical
> illustration, exactly like the attached examples. Each piece has a thin white sticker-style border and sits on a plain dark
> charcoal background (#2b2724). **All pieces are separate, well spaced apart, never touching or overlapping.** No text.
>
> Pieces (16 in total):
> 1. A dense bush of lavender-purple roses and hydrangea with a ragged edge on its right side, shaped to fill a bottom-left corner.
> 2. A dense bush of blush-pink and peach roses with sage leaves, shaped to fill a bottom-right corner.
> 3. A long drooping wisteria and rose vine that hangs down from the top-right corner.
> 4. A long drooping ivy and small-flower vine that hangs down from the top-left corner.
> 5. A tall narrow strip of lavender, delphinium and leaves to run up the left edge.
> 6. A tall narrow strip of roses and ferns to run up the right edge.
> 7. A low horizontal garland of small wildflowers and leaves to run along the bottom edge.
> 8. A low horizontal garland of lavender sprigs and daisies.
> 9 to 12. Four loose flower stems: bluebell, lavender, daisy, rose bud.
> 13 to 14. Two large leafy branches with tiny buds, curving.
> 15 to 16. Two small bundles of wildflowers tied with a ribbon.

Then cut them into pieces with `python tools/cut_dark.py <sheet.png> n` and tell me which numbers to use for the corners.

---

# The airplane (and other cut-outs) on a sheet
If you want a different airplane, ask for: "a vintage passenger plane in the same watercolour and ink style, side view,
climbing, with a few soft clouds under it, on a plain white background", then `python tools/cut_figure.py plane.png plane`.

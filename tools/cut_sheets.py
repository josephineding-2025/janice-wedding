"""Slice the sticker sheets into individual cutouts. Usage: python tools/cut_sheets.py <sheet> <prefix> [alpha|white]
alpha: sheet has a transparent background (soft grey halo is trimmed away)
white: sheet is on a plain white background (white is kept; the page multiplies it away)"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

src, prefix = sys.argv[1], sys.argv[2]
mode = sys.argv[3] if len(sys.argv) > 3 else "alpha"
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "cut")
os.makedirs(out, exist_ok=True)
im = Image.open(src).convert("RGBA")
arr = np.array(im)
if mode == "alpha":
    a = arr[:, :, 3].astype(float)
    a2 = np.clip((a - 110) / 110, 0, 1)
    mask = a2 > 0.5
else:
    rgb = arr[:, :, :3].astype(int)
    mask = rgb.min(axis=2) < 244
    a2 = None
grp = ndi.binary_dilation(mask, iterations=9 if mode == "alpha" else 7)
grp = ndi.binary_fill_holes(grp)
lab, n = ndi.label(grp)
boxes = ndi.find_objects(lab)
items = []
for i, sl in enumerate(boxes):
    area = int(mask[sl].sum())
    if area < 2500:
        continue
    items.append((sl, area, i + 1))
items.sort(key=lambda t: (t[0][0].start // 200, t[0][1].start))
for k, (sl, area, lbl) in enumerate(items):
    y0, y1, x0, x1 = max(sl[0].start - 4, 0), min(sl[0].stop + 4, arr.shape[0]), max(sl[1].start - 4, 0), min(sl[1].stop + 4, arr.shape[1])
    piece = arr[y0:y1, x0:x1].copy()
    if mode == "alpha":
        keep = (lab[y0:y1, x0:x1] == lbl)
        al = (a2[y0:y1, x0:x1] * 255 * keep).astype(np.uint8)
        piece[:, :, 3] = al
        Image.fromarray(piece, "RGBA").save(os.path.join(out, f"{prefix}_{k:02d}.webp"), quality=86, method=4)
    else:
        keep = (lab[y0:y1, x0:x1] == lbl)
        piece[~keep] = 255  # blank out neighbouring stickers that fall inside this box
        # make the white paper transparent: only white that touches the edge of the picture (so white inside the drawing stays)
        nw = piece[:, :, :3].min(axis=2) > 243
        wl, wn = ndi.label(nw)
        edge = set(np.unique(np.concatenate([wl[0], wl[-1], wl[:, 0], wl[:, -1]]))) - {0}
        bgm = np.isin(wl, list(edge))
        al = Image.fromarray(((~bgm) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.9))
        out_im = Image.fromarray(piece[:, :, :3], "RGB").convert("RGBA"); out_im.putalpha(al)
        out_im.save(os.path.join(out, f"{prefix}_{k:02d}.webp"), quality=86, method=4)
    print(f"{prefix}_{k:02d}", piece.shape[1], "x", piece.shape[0])

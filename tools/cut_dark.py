"""Slice a sticker sheet that sits on a DARK background into transparent cut-outs.
Usage: python tools/cut_dark.py <sheet.jpg> <prefix>   -> scenes/cut/<prefix>_NN.webp"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
src, prefix = sys.argv[1], sys.argv[2]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "cut"); os.makedirs(out, exist_ok=True)
a = np.array(Image.open(src).convert("RGB")).astype(int)
bg = np.median(a[:30, :30].reshape(-1, 3), axis=0)
dist = np.abs(a - bg).sum(axis=2)
mask = ndi.binary_fill_holes(ndi.binary_closing(dist > 90, iterations=6))
lab, n = ndi.label(mask)
items = []
for i, sl in enumerate(ndi.find_objects(lab), start=1):
    area = int((lab[sl] == i).sum())
    if area > 5000: items.append((sl, i))
items.sort(key=lambda t: (t[0][0].start // 300, t[0][1].start))
for k, (sl, i) in enumerate(items):
    m = (lab == i) & ~((dist < 70) & (a.sum(axis=2) < 270))
    y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
    rgba = np.dstack([a[y0:y1, x0:x1], m[y0:y1, x0:x1] * 255]).astype(np.uint8)
    p = Image.fromarray(rgba, "RGBA"); p.putalpha(p.split()[3].filter(ImageFilter.GaussianBlur(1.0)))
    s = min(1.0, 900 / max(p.size)); p = p.resize((max(1, round(p.size[0] * s)), max(1, round(p.size[1] * s))), Image.LANCZOS)
    p.save(os.path.join(out, f"{prefix}_{k:02d}.webp"), quality=72, method=4)
    print(f"{prefix}_{k:02d}", p.size)

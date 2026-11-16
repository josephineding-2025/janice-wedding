"""Cut the two flower-bush panels out of a sheet that sits on a dark background (used by the bush transition).
Usage: python tools/cut_bushes.py <sheet.jpg>   -> scenes/web/bushL.webp and bushR.webp (left blob, right blob)"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
src = sys.argv[1]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "web")
im = Image.open(src).convert("RGB")
a = np.array(im).astype(int)
bg = np.median(a[:30, :30].reshape(-1, 3), axis=0)
mask = (np.abs(a - bg).sum(axis=2) > 90)
mask = ndi.binary_closing(mask, iterations=6)
mask = ndi.binary_fill_holes(mask)
lab, n = ndi.label(mask)
sizes = ndi.sum(mask, lab, range(1, n + 1))
big = sorted(range(1, n + 1), key=lambda i: -sizes[i - 1])[:2]
big.sort(key=lambda i: ndi.center_of_mass(mask, lab, i)[1])
for name, i in zip(("bushL", "bushR"), big):
    m = (lab == i) & ~((np.abs(a - bg).sum(axis=2) < 70) & (a.sum(axis=2) < 270))  # drop dark background specks inside the blob
    ys, xs = np.where(m)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgba = np.dstack([a[y0:y1, x0:x1], (m[y0:y1, x0:x1] * 255)]).astype(np.uint8)
    p = Image.fromarray(rgba, "RGBA")
    al = p.split()[3].filter(ImageFilter.GaussianBlur(1.2)); p.putalpha(al)
    s = min(1.0, 900 / p.size[0]); p = p.resize((round(p.size[0] * s), round(p.size[1] * s)), Image.LANCZOS)
    p.save(os.path.join(out, name + ".webp"), quality=68, method=5)
    print(name, p.size, os.path.getsize(os.path.join(out, name + ".webp")) // 1024, "KB")

"""Split a sheet that holds several separate figures on a white background into one transparent cut-out each.
Usage: python tools/cut_figures_multi.py <sheet> <name1> <name2> ...   (names in reading order: top-left, top-right, next row ...)
Writes scenes/web/fig_<name>.webp and updates scenes/web/figures.js"""
import sys, os, json, re
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
src, names = sys.argv[1], sys.argv[2:]
web = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "web")
im = Image.open(src).convert("RGB"); a = np.array(im).astype(int)
ink = a.min(axis=2) < 244
grp = ndi.binary_fill_holes(ndi.binary_dilation(ink, iterations=14))
lab, n = ndi.label(grp)
boxes = []
for i, sl in enumerate(ndi.find_objects(lab), start=1):
    area = int(ink[sl][lab[sl] == i].sum())
    if area > 8000: boxes.append((sl, i, area))
boxes.sort(key=lambda t: (t[0][0].start // 350, t[0][1].start))
assert len(boxes) >= len(names), f"found {len(boxes)} figures, expected {len(names)}"
fp = os.path.join(web, "figures.js"); cur = {}
if os.path.exists(fp):
    m = re.search(r"=\s*(\{.*\})", open(fp).read(), re.S)
    if m: cur = json.loads(m.group(1))
for name, (sl, i, area) in zip(names, boxes):
    y0, y1, x0, x1 = max(sl[0].start - 6, 0), min(sl[0].stop + 6, a.shape[0]), max(sl[1].start - 6, 0), min(sl[1].stop + 6, a.shape[1])
    piece = a[y0:y1, x0:x1].copy()
    keep = lab[y0:y1, x0:x1] == i
    piece[~keep] = 255
    nw = piece.min(axis=2) > 238
    wl, wn = ndi.label(nw)
    edge = set(np.unique(np.concatenate([wl[0], wl[-1], wl[:, 0], wl[:, -1]]))) - {0}
    fg = ~np.isin(wl, list(edge))
    fg = ndi.binary_opening(fg, iterations=1)
    al = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))
    out = Image.fromarray(piece.astype(np.uint8), "RGB").convert("RGBA"); out.putalpha(al)
    ys, xs = np.where(fg)
    out = out.crop((max(xs.min() - 4, 0), max(ys.min() - 4, 0), min(xs.max() + 5, out.size[0]), min(ys.max() + 5, out.size[1])))
    s = min(1.0, 900 / max(out.size)); out = out.resize((round(out.size[0] * s), round(out.size[1] * s)), Image.LANCZOS)
    out.save(os.path.join(web, f"fig_{name}.webp"), quality=85, method=5)
    cur[name] = {"w": out.size[0], "h": out.size[1]}
    print("fig_%s" % name, out.size)
open(fp, "w").write("window.FIGS = " + json.dumps(cur) + ";\n")

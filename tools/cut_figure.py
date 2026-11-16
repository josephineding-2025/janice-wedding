"""Turn a picture of a person (or couple) on a plain WHITE background into a transparent cut-out for the story.
Usage: python tools/cut_figure.py <picture> <scene>      scene = sunway | library | map | keys | usa | sg | life | proposal | wedding
Writes scenes/web/fig_<scene>.webp and updates scenes/web/figures.js.  The figure then replaces the placeholder pieces in that scene."""
import sys, os, json, re
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
src, scene = sys.argv[1], sys.argv[2]
thr = int(sys.argv[3]) if len(sys.argv) > 3 else 236   # raise to 250 for white dresses so they stay solid
web = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "web")
im = Image.open(src).convert("RGB"); a = np.array(im).astype(int)
near_white = a.min(axis=2) > thr
lab, n = ndi.label(near_white)
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(border))                      # only white that touches the picture edge is background
fg = ~bg
fg = ndi.binary_opening(fg, iterations=1)
alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.1))
rgba = im.convert("RGBA"); rgba.putalpha(alpha)
ys, xs = np.where(fg)
rgba = rgba.crop((max(xs.min() - 6, 0), max(ys.min() - 6, 0), min(xs.max() + 7, im.size[0]), min(ys.max() + 7, im.size[1])))
s = min(1.0, 900 / max(rgba.size)); rgba = rgba.resize((round(rgba.size[0] * s), round(rgba.size[1] * s)), Image.LANCZOS)
rgba.save(os.path.join(web, f"fig_{scene}.webp"), quality=85, method=5)
fp = os.path.join(web, "figures.js")
cur = {}
if os.path.exists(fp):
    m = re.search(r"=\s*(\{.*\})", open(fp).read(), re.S)
    if m: cur = json.loads(m.group(1))
cur[scene] = {"w": rgba.size[0], "h": rgba.size[1]}
open(fp, "w").write("window.FIGS = " + json.dumps(cur) + ";\n")
print("wrote fig_%s.webp" % scene, rgba.size)

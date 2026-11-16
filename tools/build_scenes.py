"""Optimise the scene illustrations for phones.
Reads the originals from scenes/ (jpg/png/webp), whitens the paper colour, trims empty margins, resizes, and writes
scenes/web/<key>.webp plus scenes/web/manifest.js (sizes, used by the page).  Run:  python tools/build_scenes.py"""
import os, glob, json
import numpy as np
from PIL import Image

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes")
out = os.path.join(root, "web"); os.makedirs(out, exist_ok=True)
meta = {}
for f in sorted(glob.glob(os.path.join(root, "*"))):
    base = os.path.basename(f)
    if not base.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        continue
    key = os.path.splitext(base)[0]
    im = Image.open(f)
    if im.mode == "RGBA":
        bg = Image.new("RGB", im.size, (255, 255, 255)); bg.paste(im, mask=im.split()[3]); im = bg
    im = im.convert("RGB")
    a = np.array(im).astype(float)
    if key == "life":  # the supplied file has a dark strip on its left edge
        a = a[:, 40:]
    h, w, _ = a.shape
    corners = np.concatenate([a[:24, :24].reshape(-1, 3), a[:24, -24:].reshape(-1, 3), a[-24:, :24].reshape(-1, 3), a[-24:, -24:].reshape(-1, 3)])
    bgc = np.median(corners, axis=0)
    a = np.clip(a * (255.0 / np.maximum(bgc, 1)), 0, 255)  # paper colour -> white
    ink = 255 - a.min(axis=2)
    mask = ink > 16
    rows = np.where(mask.sum(axis=1) > 3)[0]; cols = np.where(mask.sum(axis=0) > 3)[0]
    y0, y1, x0, x1 = rows[0], rows[-1], cols[0], cols[-1]
    pad = int(0.025 * max(y1 - y0, x1 - x0))
    y0, x0 = max(y0 - pad, 0), max(x0 - pad, 0); y1, x1 = min(y1 + pad, h), min(x1 + pad, w)
    crop = Image.fromarray(a[y0:y1, x0:x1].astype(np.uint8))
    cw, ch = crop.size
    scale = min(1.0, 1500 / max(cw, ch) if ch > cw else 1400 / cw)
    crop = crop.resize((round(cw * scale), round(ch * scale)), Image.LANCZOS)
    crop.save(os.path.join(out, key + ".webp"), quality=80, method=5)
    meta[key] = {"w": crop.size[0], "h": crop.size[1], "ox": int(x0) + (40 if key == "life" else 0), "oy": int(y0), "s": round(scale, 5)}
    print(key, crop.size, os.path.getsize(os.path.join(out, key + ".webp")) // 1024, "KB")
open(os.path.join(out, "manifest.js"), "w").write("window.SCENE_META = " + json.dumps(meta) + ";\n")

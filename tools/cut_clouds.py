"""Lift the watercolour clouds out of the USA illustration as transparent pieces (used by the airplane transition).
Run after tools/build_scenes.py:  python tools/cut_clouds.py"""
import os
import numpy as np
from PIL import Image
web = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "web")
im = Image.open(os.path.join(web, "usa.webp")).convert("RGB")
a = np.array(im).astype(float)
for name, box in {"cloud1": (90, 40, 560, 210), "cloud2": (690, 20, 1200, 180), "cloud3": (830, 160, 1250, 275), "cloud4": (150, 215, 720, 300)}.items():
    x0, y0, x1, y1 = box
    c = a[y0:y1, x0:x1]
    alpha = np.clip((255 - c.min(axis=2)) * 5.0, 0, 255)           # paper white -> transparent
    edge = np.ones(alpha.shape); fade = 14
    for k in range(fade):
        f = (k + 1) / fade; edge[k, :] = np.minimum(edge[k, :], f); edge[-1 - k, :] = np.minimum(edge[-1 - k, :], f)
        edge[:, k] = np.minimum(edge[:, k], f); edge[:, -1 - k] = np.minimum(edge[:, -1 - k], f)
    out = np.dstack([np.clip(c * 0.96, 0, 255), alpha * edge]).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(os.path.join(web, name + ".webp"), quality=82, method=4)
    print(name, out.shape[1], out.shape[0])

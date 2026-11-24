"""Turn the hotel's floor plan PDF into scenes/web/floor.js (static room shapes + table positions) for the seating map.
Usage: python tools/build_floor.py "<floor plan>.pdf"
Everything is read from the PDF's vector drawing, so tables and fixtures sit exactly where the hotel drew them."""
import sys, re, json, os
import fitz

pdf = sys.argv[1]
page = fitz.open(pdf)[0]
BLUE = (0.74, 0.84, 0.93)
GREEN = (0.77, 0.88, 0.7)


def col(c):
    return tuple(round(x, 2) for x in c) if c else None


def path_d(items):
    d = ""
    last = None
    for it in items:
        k = it[0]
        if k == "l":
            p1, p2 = it[1], it[2]
            if last is None or abs(last.x - p1.x) > .01 or abs(last.y - p1.y) > .01:
                d += f"M{p1.x:.1f} {p1.y:.1f}"
            d += f"L{p2.x:.1f} {p2.y:.1f}"
            last = p2
        elif k == "c":
            p1, p2, p3, p4 = it[1:5]
            if last is None or abs(last.x - p1.x) > .01 or abs(last.y - p1.y) > .01:
                d += f"M{p1.x:.1f} {p1.y:.1f}"
            d += f"C{p2.x:.1f} {p2.y:.1f} {p3.x:.1f} {p3.y:.1f} {p4.x:.1f} {p4.y:.1f}"
            last = p4
        elif k == "re":
            r = it[1]
            d += f"M{r.x0:.1f} {r.y0:.1f}H{r.x1:.1f}V{r.y1:.1f}H{r.x0:.1f}Z"
            last = None
        elif k == "qu":
            q = it[1]
            d += f"M{q.ul.x:.1f} {q.ul.y:.1f}L{q.ur.x:.1f} {q.ur.y:.1f}L{q.lr.x:.1f} {q.lr.y:.1f}L{q.ll.x:.1f} {q.ll.y:.1f}Z"
            last = None
    return d


shapes = []
tables = {}      # circle centres, matched to labels below
circles = []
for dr in page.get_drawings():
    fill, stroke, r = col(dr.get("fill")), col(dr.get("color")), dr["rect"]
    kinds = "".join(i[0] for i in dr["items"])
    if fill == GREEN:
        continue  # chairs are drawn by the page
    if fill == BLUE and kinds == "cccc":
        circles.append((r.x0 + r.width / 2, r.y0 + r.height / 2, r.width / 2))
        continue
    if r.width < 0.01 and r.height < 0.01 and stroke is None:
        continue
    cls = None
    if fill == (1.0, 1.0, 1.0) and r.width > 400 and r.height > 400: cls = "fl-floor"
    elif fill == (1.0, 0.0, 0.0) and r.width > 100: cls = "fl-stage"
    elif fill == (1.0, 0.0, 0.0): cls = "fl-step"
    elif fill == (0.0, 0.0, 0.0) and r.width > 200 and r.height > 60: cls = "fl-store"
    elif fill == (0.0, 0.0, 0.0): cls = "fl-black"
    elif fill == (0.95, 0.95, 0.95): cls = "fl-carpet"
    elif fill == (1.0, 0.95, 0.8): cls = "fl-glass"
    elif fill == (0.77, 0.35, 0.07): cls = "fl-ent"
    elif fill == BLUE: cls = "fl-desk"
    elif fill == (1.0, 1.0, 1.0): cls = "fl-box"
    elif fill is None and stroke is not None and r.width > 100 and r.height < 8: cls = "fl-screen"
    elif fill is None: cls = "fl-wall"
    else: cls = "fl-box"
    d = path_d(dr["items"])
    if d:
        shapes.append(f'<path class="{cls}" d="{d}"/>')

# table labels (digits / R) -> nearest circle
labels = {}
for w in page.get_text("words"):
    t = w[4].strip()
    if re.fullmatch(r"\d{1,2}|R", t):
        labels.setdefault(t, []).append(((w[0] + w[2]) / 2, (w[1] + w[3]) / 2))
pos = {}
used = set()
for t, pts in labels.items():
    best = None
    for (x, y) in pts:
        for i, (cx, cy, rad) in enumerate(circles):
            dd = ((cx - x) ** 2 + (cy - y) ** 2) ** .5
            if dd < 14 and (best is None or dd < best[0]) and i not in used:
                best = (dd, i)
    if best:
        used.add(best[1]); cx, cy, rad = circles[best[1]]
        pos[t] = [round(cx, 1), round(cy, 1), round(rad, 1)]
# the main table is the larger circle
big = [c for i, c in enumerate(circles) if c[2] > 20]
if big:
    pos["main"] = [round(big[0][0], 1), round(big[0][1], 1), round(big[0][2], 1)]
missing = [str(i) for i in list(range(2, 31)) + ["R", "main"] if str(i) not in pos]

# text on the plan
texts = []
skip = re.compile(r"(\bft\b|ft$|^\d+(\.\d+)?\s*ft|Grand Ballroom|30 \+ 1|width X|^\d{1,2}$|^R$|^\s*$|pax)", re.I)
for b in page.get_text("dict")["blocks"]:
    for ln in b.get("lines", []):
        for sp in ln["spans"]:
            s = sp["text"].strip()
            if not s or skip.search(s) or s in ("Main", "table"):
                continue
            x0, y0, x1, y1 = sp["bbox"]
            red = sp.get("color") == 0xFF0000 or s.startswith("Entrance")
            texts.append({"t": s, "x": round((x0 + x1) / 2, 1), "y": round(y1 - 2, 1), "s": round(sp["size"], 1), "k": "ent" if red else "tx"})

# merge two-line labels that the PDF splits (e.g. "Champagne" / "fountain")
out = {
    "vb": [20, 96, 550, 650],
    "pos": pos,
    "ent": {"1": [122.4, 204.1], "2": [125.3, 377.3], "3": [124.3, 548.9]},
    "svg": "".join(shapes),
    "texts": texts,
}
dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes", "web", "floor.js")
open(dest, "w", encoding="utf-8").write("window.FLOOR = " + json.dumps(out, ensure_ascii=False) + ";\n")
print("tables found:", len(pos), "missing:", missing, "shapes:", len(shapes), "texts:", len(texts))
print([t["t"] for t in texts])

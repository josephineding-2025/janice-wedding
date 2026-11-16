# Run after editing lyrics/*.txt:  python build_lyrics.py
# Bundles the text files into lyrics.js so the site also works when index.html is opened directly from disk.
import glob, json, os
here = os.path.dirname(os.path.abspath(__file__))
out = {}
for f in sorted(glob.glob(os.path.join(here, "lyrics", "*.txt"))):
    if os.path.basename(f).lower() == "readme.txt":
        continue
    out["lyrics/" + os.path.basename(f)] = open(f, encoding="utf-8-sig").read()
open(os.path.join(here, "lyrics.js"), "w", encoding="utf-8").write("window.LYRICS_TXT = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
print("bundled", len(out), "files into lyrics.js")

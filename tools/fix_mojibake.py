"""Repair text that was saved twice as UTF-8 (Chinese turned into things like 'ä¸­æ–‡').
Usage: python tools/fix_mojibake.py <file> [--write]"""
import re, sys
CP = "".join(chr(i) for i in range(0x80, 0x100)) + "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ"
RUN = re.compile("[" + re.escape(CP) + "]{3,}")
def to_bytes(run):
    out = bytearray()
    for ch in run:
        try: out += ch.encode("cp1252")
        except UnicodeEncodeError:
            if ord(ch) < 256: out.append(ord(ch))
            else: return None
    return bytes(out)
def fix(m):
    b = to_bytes(m.group(0))
    if b is None: return m.group(0)
    try: s = b.decode("utf-8")
    except UnicodeDecodeError:
        # tolerate a few stray bytes: decode what we can
        s = b.decode("utf-8", errors="strict") if False else None
        return m.group(0)
    return s
path = sys.argv[1]
t = open(path, encoding="utf-8").read()
runs = RUN.findall(t)
new = RUN.sub(fix, t)
print(path, "mojibake runs:", len(runs), "repaired:", sum(1 for r in runs if fix(re.match(".*", r, re.S)) is not None and False) or (len(runs) - len(RUN.findall(new))))
if "--write" in sys.argv: open(path, "w", encoding="utf-8", newline="").write(new)

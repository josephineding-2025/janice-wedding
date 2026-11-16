# Local test double for the Apps Script backend. Run: python backend/mock_server.py  (port 8124). Not needed in production.
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
DB = {"scores": {}, "songs": [], "blessings": [{"id": "x1", "name": "Aunty Lim", "message": "Wishing you a lifetime of love and laughter!"}, {"id": "x2", "name": "Uncle Tan", "message": "Happy marriage!"}]}
class H(BaseHTTPRequestHandler):
    def _send(self, obj):
        b = json.dumps(obj).encode()
        self.send_response(200); self.send_header("Content-Type", "application/json"); self.send_header("Access-Control-Allow-Origin", "*"); self.send_header("Content-Length", str(len(b))); self.end_headers(); self.wfile.write(b)
    def do_GET(self):
        if "action=leaderboard" in self.path:
            rows = sorted(DB["scores"].values(), key=lambda r: -r["score"]); self._send({"rows": rows})
        elif "action=blessings" in self.path: self._send({"rows": DB["blessings"]})
        else: self._send({"ok": True})
    def do_POST(self):
        b = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        if b["action"] == "score": DB["scores"][b["id"]] = {"id": b["id"], "name": b["name"], "score": b["score"]}
        elif b["action"] == "song": DB["songs"].append(b); print("SONG", b)
        elif b["action"] == "blessing": DB["blessings"].append(b)
        self._send({"ok": True})
    def do_OPTIONS(self):
        self.send_response(204); self.send_header("Access-Control-Allow-Origin", "*"); self.send_header("Access-Control-Allow-Headers", "*"); self.end_headers()
    def log_message(self, *a): pass
HTTPServer(("", 8124), H).serve_forever()

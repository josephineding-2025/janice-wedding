"""Copy the cutouts used by the story into scenes/web with readable names. Run after tools/cut_sheets.py."""
import os, shutil
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scenes")
PICK = {
    "dove1": "b_15", "dove2": "w_00", "dove3": "w_11",
    "butterfly1": "w_02", "butterfly2": "w_09", "butterfly3": "w_13",
    "bus": "w_19", "plane": "b_05",
    "him_key": "a_04", "her_case": "a_05", "couple": "a_00", "grads": "b_01",
    "kneel": "b_10", "her_hands": "b_11",
    "suitcase": "a_14", "rollcase": "a_12", "books": "a_16",
    "butterfly4": "p_02", "butterfly5": "p_05", "butterfly6": "p_10",
    "bush_pink_l": "r_00", "bush_pink_r": "r_01", "bush_purple_l": "p_00", "bush_purple_r": "p_04",
    "arch": "p_06", "bluebell": "p_01", "lavender": "p_09", "lamp": "p_03",
}
for name, src in PICK.items():
    shutil.copy(os.path.join(root, "cut", src + ".webp"), os.path.join(root, "web", name + ".webp"))
print("copied", len(PICK))

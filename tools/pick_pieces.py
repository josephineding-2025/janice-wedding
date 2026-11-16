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
    # sheet 22: flowers and corner foliage
    "corner_tl": "f_00", "corner_tr": "f_05", "blob_purple": "f_07", "blob_pink": "f_12",
    "strip_lav": "f_06", "strip_rose": "f_13", "bluebell2": "f_01", "lavender2": "f_02", "daisy": "f_03", "rosebud": "f_04",
    "garland_pink": "f_08", "garland_lav": "f_11", "branch1": "f_09", "branch2": "f_10", "bouquet_lav": "f_14", "bouquet_pink": "f_15",
    # sheet 23: birds, butterflies, sparkles, waves, clouds (white background, used with multiply)
    "dove_a": "e_00", "dove_b": "e_01", "dove_c": "e_02", "dove_d": "e_03", "dove_e": "e_04",
    "sparrow_a": "e_05", "sparrow_b": "e_06", "sparrow_c": "e_07",
    "bfly_purple": "e_08", "bfly_blue": "e_09", "bfly_pink": "e_10", "bfly_pink2": "e_14", "bfly_blue2": "e_15",
    "spark_y": "e_11", "spark_b": "e_12", "spark_p": "e_13",
    "wave1": "e_16", "wave2": "e_17", "wave3": "e_18", "crest1": "e_19", "crest2": "e_20",
    "cloud_cream": "e_21", "cloud_pink": "e_22", "cloud_blue": "e_23",
    # sheet 24: travel
    "key_fob": "k_00", "key_tag": "k_01", "bus_side": "k_02", "bus_angle": "k_03", "airliner": "k_06", "prop": "k_07", "suitcase2": "k_04", "compass": "k_05",
    # sheet 25: celebration
    "toast": "g_00", "bucket": "g_01", "bouquet": "g_02", "lantern2": "g_03",
}
for name, src in PICK.items():
    shutil.copy(os.path.join(root, "cut", src + ".webp"), os.path.join(root, "web", name + ".webp"))
print("copied", len(PICK))

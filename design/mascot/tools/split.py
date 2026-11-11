"""Split the traced bagel boys into animatable parts.

Works on the labelled black shapes of the flattened mascot (labels.npy from analyse.py):
each part is a mask of whole shapes plus, for legs, the strip below a cut line. Each mask
is traced with potrace on its own and the results are assembled into one layered SVG.
"""
import re
import subprocess
import sys

import numpy as np

W = sys.argv[1]
OUT = sys.argv[2]
lab = np.load(f"{W}/labels.npy")
H, Wd = lab.shape
black = lab > 0
yy, xx = np.mgrid[0:H, 0:Wd]


def comps(*ids):
    return np.isin(lab, ids)


def band(x0, x1, y0, y1):
    return (xx >= x0) & (xx <= x1) & (yy >= y0) & (yy <= y1)


# Leg strips: the fused body shape below each cut line, plus a strip reaching up behind
# the body (overlap) so no gap opens at the hip when the leg swings.
L_main, R_lower = lab == 12, lab == 33
legs = {
    "left-leg-back": (L_main & (yy >= 748) & (xx < 440)) | (L_main & band(318, 364, 718, 748)),
    "left-leg-front": (L_main & (yy >= 716) & (xx >= 490)) | (L_main & band(508, 546, 688, 716)),
    "right-leg-back": (R_lower & (yy >= 688) & (xx < 1260)) | (R_lower & band(1168, 1218, 660, 688)),
    "right-leg-front": (R_lower & (yy >= 680) & (xx > 1300)) | (R_lower & band(1331, 1378, 652, 680)),
}
legs["left-leg-back"] |= comps(79, 71, 78, 74)
legs["left-leg-front"] |= comps(58, 55, 57, 65)
legs["right-leg-back"] |= comps(77, 63, 59, 72, 69, 66, 61)
legs["right-leg-front"] |= comps(76, 60, 68, 75, 67, 73, 70, 62)

parts = {
    "left-arm-cigarette": comps(49, 56, 54, 64),
    "left-smoke": comps(53),
    "left-arm-coffee": comps(17, 18, 20, 14, 13, 25, 24, 16),
    "right-arm-wave": comps(37),
    **legs,
}

# Bodies: every other black pixel on each side. The leg strips below the cuts and the
# shoes go to the legs; the hidden overlap strips above the cuts stay in the body as well.
leg_cut = (
    (L_main & (yy >= 748) & (xx < 440)) | (L_main & (yy >= 716) & (xx >= 490))
    | (R_lower & (yy >= 688) & (xx < 1260)) | (R_lower & (yy >= 680) & (xx > 1300))
)
not_body = leg_cut.copy()
for name, m in parts.items():
    if name in legs:
        not_body |= m & ~(L_main | R_lower)  # shoes
    else:
        not_body |= m  # arms, smoke
rest = black & ~not_body
parts["left-body"] = rest & (xx < 940)
parts["right-body"] = rest & (xx >= 940)

# Every black pixel must belong to at least one part
covered = np.zeros_like(black)
for m in parts.values():
    covered |= m
missing = black & ~covered
print("uncovered black pixels:", int(missing.sum()))

# Pivots in image pixels: hips for legs, shoulders for arms, base of the smoke
pivots = {
    "left-leg-back": (341, 745),
    "left-leg-front": (527, 712),
    "right-leg-back": (1193, 684),
    "right-leg-front": (1354, 676),
    "left-arm-cigarette": (150, 612),
    "left-arm-coffee": (656, 440),
    "right-arm-wave": (990, 512),
    "left-smoke": (60, 920),
}


def trace(mask):
    pbm = f"{W}/part.pbm"
    with open(pbm, "wb") as f:
        f.write(f"P4\n{Wd} {H}\n".encode())
        f.write(np.packbits(mask, axis=1).tobytes())
    svg = subprocess.run(
        ["potrace", pbm, "-s", "--flat", "-t", "4", "-a", "1", "-O", "0.2", "-o", "-"],
        capture_output=True, text=True, check=True,
    ).stdout
    return re.findall(r'<path d="([^"]+)"', svg)


# White backing for each part: the shape with its holes filled, grown by EDGE px. All
# backings sit behind all the black art, so the white edge outlines each character on dark
# backgrounds without ever drawing across a hip or shoulder join.
EDGE = 16
disk = (xx[:2 * EDGE + 1, :2 * EDGE + 1] - EDGE) ** 2 + (yy[:2 * EDGE + 1, :2 * EDGE + 1] - EDGE) ** 2 <= EDGE ** 2


def part_group(name, mask):
    d = " ".join(trace(mask))
    attrs = f'class="{name}"'
    if name in pivots:
        px, py = pivots[name]
        attrs += f' style="transform-origin:{px}px {py}px"'
    # potrace paths are in 0.1px units with y flipped
    return f'    <g {attrs}><path transform="translate(0,{H}) scale(0.1,-0.1)" d="{d}"/></g>'


order = {
    "left": ["left-leg-back", "left-leg-front", "left-body", "left-arm-cigarette", "left-smoke", "left-arm-coffee"],
    "right": ["right-leg-back", "right-leg-front", "right-body", "right-arm-wave"],
}
lines = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {Wd} {H}" fill="#000">',
    "<!-- Two Men bagel boys, traced with potrace from tmbh-bagel-boys-cap.png and split into",
    "     parts for animation. Same outlines as the original art; not redrawn.",
    "     Each part appears twice with the same class: a white backing in .bb-back and the",
    "     art in .bb-art. Its transform-origin is its pivot (hip, shoulder, smoke base) in px. -->",
    '<style>g{transform-box:view-box}.bb-back{fill:#fff}</style>',
]
from scipy import ndimage as ndi  # noqa: E402
for char, names in order.items():
    lines.append(f'<g id="{char}">')
    lines.append('  <g class="bb-back">')
    for n in names:
        back = ndi.binary_dilation(ndi.binary_fill_holes(parts[n]), structure=disk)
        lines.append(part_group(n, back))
    lines.append("  </g>")
    lines.append('  <g class="bb-art">')
    for n in names:
        lines.append(part_group(n, parts[n]))
    lines.append("  </g>")
    lines.append("</g>")
lines.append("</svg>")
open(OUT, "w").write("\n".join(lines) + "\n")

# Colour preview of the parts
cols = {
    "left-leg-back": (230, 80, 80), "left-leg-front": (240, 160, 40), "left-body": (40, 40, 40),
    "left-arm-cigarette": (60, 130, 230), "left-smoke": (150, 200, 60), "left-arm-coffee": (160, 80, 200),
    "right-leg-back": (230, 80, 80), "right-leg-front": (240, 160, 40), "right-body": (40, 40, 40),
    "right-arm-wave": (60, 130, 230),
}
rgb = np.full((H, Wd, 3), 255, np.uint8)
for n in order["left"] + order["right"]:
    rgb[parts[n]] = cols[n]
# draw pivots as small crosses
for (px, py) in pivots.values():
    rgb[max(py - 12, 0):py + 13, px - 2:px + 3] = (255, 0, 0)
    rgb[py - 2:py + 3, max(px - 12, 0):px + 13] = (255, 0, 0)
with open(f"{W}/parts.ppm", "wb") as f:
    f.write(f"P6 {Wd} {H} 255\n".encode())
    f.write(rgb.tobytes())
print("wrote", OUT)

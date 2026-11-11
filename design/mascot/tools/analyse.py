import sys
import numpy as np
from scipy import ndimage

W = sys.argv[1]


def read_pgm(path):
    d = open(path, "rb").read()
    parts, i = [], 0
    while len(parts) < 4:
        while d[i:i + 1].isspace():
            i += 1
        j = i
        while not d[j:j + 1].isspace():
            j += 1
        parts.append(d[i:j])
        i = j
    i += 1
    w, h = int(parts[1]), int(parts[2])
    return np.frombuffer(d[i:i + w * h], dtype=np.uint8).reshape(h, w)


img = read_pgm(f"{W}/mascot.pgm")
black = img < 128
lab, n = ndimage.label(black, structure=[[0, 1, 0], [1, 1, 1], [0, 1, 0]])
sizes = ndimage.sum(black, lab, range(1, n + 1))
objs = ndimage.find_objects(lab)
np.save(f"{W}/labels.npy", lab)

rows = []
for k in range(n):
    if sizes[k] < 40:
        continue
    sl = objs[k]
    rows.append((k + 1, int(sizes[k]), sl[1].start, sl[0].start, sl[1].stop - 1, sl[0].stop - 1))
rows.sort(key=lambda r: -r[1])
print("label size x0 y0 x1 y1")
for r in rows:
    print(*r)

# Colour preview: each component a distinct colour, labels >= 300px
rng = np.random.default_rng(3)
pal = rng.integers(40, 230, size=(n + 1, 3), dtype=np.uint8)
pal[0] = 255
rgb = pal[lab]
h, w = lab.shape
with open(f"{W}/components.ppm", "wb") as f:
    f.write(f"P6 {w} {h} 255\n".encode())
    f.write(rgb.tobytes())

# Row runs for the two big fused shapes, to find where legs leave the body
for name, label in (("left-main", rows[0][0]),):
    m = lab == label
    print(f"\n{name}: runs per row (x ranges)")
    for y in range(640, 960, 10):
        xs = np.flatnonzero(m[y])
        if xs.size == 0:
            continue
        breaks = np.flatnonzero(np.diff(xs) > 1)
        starts = np.r_[xs[0], xs[breaks + 1]]
        ends = np.r_[xs[breaks], xs[-1]]
        print(y, list(zip(starts.tolist(), ends.tolist())))

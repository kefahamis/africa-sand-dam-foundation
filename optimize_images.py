"""One-off: create web-optimized copies of images/asdf/ -> images/asdf-web/.
Resizes so the longest edge is <= MAX_EDGE, re-encodes as progressive JPEG,
strips metadata. Preserves folder structure and filenames so existing
references work after swapping the path prefix."""
import os
from PIL import Image, ImageOps

SRC = os.path.join("images", "asdf")
DST = os.path.join("images", "asdf-web")
MAX_EDGE = 1600
QUALITY = 82
EXTS = (".jpg", ".jpeg", ".png")

orig_total = 0
new_total = 0
count = 0
errors = []

for root, _dirs, files in os.walk(SRC):
    for name in files:
        if not name.lower().endswith(EXTS):
            continue
        src_path = os.path.join(root, name)
        rel = os.path.relpath(src_path, SRC)
        dst_path = os.path.join(DST, rel)
        os.makedirs(os.path.dirname(dst_path), exist_ok=True)
        try:
            with Image.open(src_path) as im:
                im = ImageOps.exif_transpose(im)   # honour camera rotation
                if im.mode not in ("RGB", "L"):
                    im = im.convert("RGB")
                w, h = im.size
                scale = min(1.0, MAX_EDGE / float(max(w, h)))
                if scale < 1.0:
                    im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
                # Always save as JPEG regardless of original container/extension
                im.save(dst_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
            o = os.path.getsize(src_path)
            n = os.path.getsize(dst_path)
            orig_total += o
            new_total += n
            count += 1
        except Exception as e:  # noqa
            errors.append(f"{rel}: {e}")

mb = 1024 * 1024
print(f"Optimized {count} images")
print(f"Original total: {orig_total/mb:.1f} MB")
print(f"Optimized total: {new_total/mb:.1f} MB")
if orig_total:
    print(f"Reduction: {100*(1-new_total/orig_total):.1f}%")
if errors:
    print(f"\n{len(errors)} errors:")
    for e in errors[:20]:
        print(" -", e)

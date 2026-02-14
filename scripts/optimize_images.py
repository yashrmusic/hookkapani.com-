from pathlib import Path
from PIL import Image


def optimize_images(root: Path) -> None:
    exts = {".png", ".jpg", ".jpeg"}
    files = [p for p in root.iterdir() if p.is_file() and p.suffix.lower() in exts]

    before_total = 0
    after_total = 0
    updated = 0

    for path in files:
        before_size = path.stat().st_size
        before_total += before_size
        temp_path = path.with_suffix(path.suffix + ".opt")

        try:
            with Image.open(path) as img:
                img.load()
                fmt = (img.format or path.suffix.replace(".", "").upper()).upper()
                save_kwargs = {"optimize": True}

                if fmt == "PNG" or path.suffix.lower() == ".png":
                    if img.mode in ("RGBA", "LA"):
                        out = img
                    else:
                        out = img.convert("P", palette=Image.Palette.ADAPTIVE, colors=256)
                    out.save(temp_path, format="PNG", **save_kwargs)
                else:
                    if img.mode in ("RGBA", "LA", "P"):
                        out = img.convert("RGB")
                    else:
                        out = img
                    out.save(temp_path, format="JPEG", quality=78, progressive=True, **save_kwargs)

            new_size = temp_path.stat().st_size
            if new_size < before_size:
                path.unlink()
                temp_path.rename(path)
                after_total += new_size
                updated += 1
            else:
                temp_path.unlink(missing_ok=True)
                after_total += before_size
        except Exception:
            if temp_path.exists():
                temp_path.unlink(missing_ok=True)
            after_total += before_size

    print(
        f"files={len(files)} updated={updated} "
        f"before_mb={before_total / 1048576:.2f} "
        f"after_mb={after_total / 1048576:.2f} "
        f"saved_mb={(before_total - after_total) / 1048576:.2f}"
    )


if __name__ == "__main__":
    optimize_images(Path("public/images"))

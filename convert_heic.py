import os
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

src_dir = r"C:\Users\yash pc\Downloads\images"
dest_dir = r"c:\Users\yash pc\Desktop\Coding\hookkapaani-v2-live\public\images"

for file in os.listdir(src_dir):
    if file.lower().endswith(".heic") or file.lower().endswith(".heif"):
        src_path = os.path.join(src_dir, file)
        base_name = os.path.splitext(file)[0]
        dest_path = os.path.join(dest_dir, f"{base_name}.jpg")
        
        try:
            image = Image.open(src_path)
            image.convert("RGB").save(dest_path, "JPEG")
            print(f"Converted {file} to {base_name}.jpg")
        except Exception as e:
            print(f"Failed to convert {file}: {e}")

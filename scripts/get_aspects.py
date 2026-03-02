import os
from PIL import Image

image_dir = r"c:\Users\yash pc\Desktop\Coding\hookkapaani-v2-live\public\images"
for i in range(1, 41):
    filename = f"new-work-{i}.jpg"
    filepath = os.path.join(image_dir, filename)
    if os.path.exists(filepath):
        with Image.open(filepath) as img:
            width, height = img.size
            aspect = round(width / height, 3)
            print(f"{filename}: {aspect}")

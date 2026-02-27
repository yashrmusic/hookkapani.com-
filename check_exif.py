import os
from PIL import Image
from PIL.ExifTags import TAGS

img_dir = r"c:\Users\yash pc\Desktop\Coding\hookkapaani-v2-live\public\images"

def get_exif(filename):
    path = os.path.join(img_dir, filename)
    try:
        image = Image.open(path)
        exifdata = image.getexif()
        print(f"--- EXIF for {filename} ---")
        for tag_id in exifdata:
            tag = TAGS.get(tag_id, tag_id)
            data = exifdata.get(tag_id)
            if isinstance(data, bytes):
                data = data.decode('utf-8', errors='ignore')
            print(f"{tag:25}: {data}")
    except Exception as e:
        print(f"Error reading {filename}: {e}")

get_exif("new-work-1.jpg")
get_exif("new-work-2.jpg")
get_exif("new-work-33.jpg")

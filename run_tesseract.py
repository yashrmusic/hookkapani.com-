import os
import json
from PIL import Image
import pytesseract

tesseract_paths = [
    r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe")
]

for path in tesseract_paths:
    if os.path.exists(path):
        pytesseract.pytesseract.tesseract_cmd = path
        break

img_dir = r"c:\Users\yash pc\Desktop\Coding\hookkapaani-v2-live\public\images"
results = {}

files = [f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg', '.png')) and f.startswith('new-work')]

for f in files:
    path = os.path.join(img_dir, f)
    try:
        img = Image.open(path)
        text = pytesseract.image_to_string(img)
        text = " ".join(text.split()).strip()
        results[f] = text
        print(f"{f}: {text[:50]}")
    except Exception as e:
        print(f"Error for {f}: {e}")

with open("ocr_tesseract_results.json", "w", encoding="utf-8") as out:
    json.dump(results, out, indent=2, ensure_ascii=False)

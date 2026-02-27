import asyncio
import json
import os
import sys

# Windows OCR bindings
from winsdk.windows.media.ocr import OcrEngine
from winsdk.windows.graphics.imaging import BitmapDecoder
from winsdk.windows.storage import StorageFile

async def run_ocr(file_path):
    try:
        file = await StorageFile.get_file_from_path_async(file_path)
        stream = await file.open_async(0)
        decoder = await BitmapDecoder.create_async(stream)
        software_bitmap = await decoder.get_software_bitmap_async()
        
        engine = OcrEngine.try_create_from_user_profile_languages()
        if engine is None:
            return ""
        result = await engine.recognize_async(software_bitmap)
        return result.text
    except Exception as e:
        return f"Error: {e}"

async def main():
    img_dir = r"c:\Users\yash pc\Desktop\Coding\hookkapaani-v2-live\public\images"
    results = {}
    
    files = [f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg', '.png'))]
    print(f"Found {len(files)} images. Running OCR...")
    
    for filename in files:
        path = os.path.join(img_dir, filename)
        text = await run_ocr(path)
        results[filename] = text.strip()
        print(f"{filename}: {text.strip()[:50]}...")
            
    with open("ocr_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
        
    print("Saved OCR results to ocr_results.json")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())

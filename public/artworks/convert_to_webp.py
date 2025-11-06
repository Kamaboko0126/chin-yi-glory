from PIL import Image
import os

# 輸入和輸出檔案路徑
input_file = "05.jpg"
output_file = "05.webp"

# 目標高度
target_height = 900

# 開啟圖片
img = Image.open(input_file)

# 取得原始尺寸
original_width, original_height = img.size

# 計算新的寬度以保持比例
aspect_ratio = original_width / original_height
new_width = int(target_height * aspect_ratio)

# 調整圖片大小
resized_img = img.resize((new_width, target_height), Image.Resampling.LANCZOS)

# 儲存為 WebP 格式
resized_img.save(output_file, "WEBP", quality=85)

print(f"✓ 轉換完成！")
print(f"  原始尺寸: {original_width} x {original_height}")
print(f"  新尺寸: {new_width} x {target_height}")
print(f"  輸出檔案: {output_file}")

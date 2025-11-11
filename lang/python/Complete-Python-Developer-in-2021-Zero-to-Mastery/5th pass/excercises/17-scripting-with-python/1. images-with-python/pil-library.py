from PIL import Image, ImageFilter
from os import path

img = Image.open('./images/pikachu.jpg')

print(dir(img))

print(img.format)
print(img.size)
print(img.mode)

# filtering

blur_img = img.filter(ImageFilter.BLUR)
blur_img.save(path.join("./output", "pikachu-blur.png"), "png")

smooth_img = img.filter(ImageFilter.SMOOTH)
smooth_img.save(path.join("./output", "pikachu-smooth.png"), "png")

sharp_img = img.filter(ImageFilter.SHARPEN)
sharp_img.save(path.join("./output", "pikachu-sharp.png"), "png")

# formats

grey_img = img.convert('L')
grey_img.save(path.join("./output", "pikachu-grey.png"), "png")

# shows image in default viewer
# grey_img.show()

# rotate

rotated_img = sharp_img.rotate(180)
rotated_img.save(path.join("./output", "rotated.png"), "png")

# resize 

resized_img = img.resize((300, 300))
resized_img.save(path.join("./output", "resized.png"), "png")

# crop

crop_img = img.crop((100, 100, 200, 200))
crop_img.save(path.join("./output", "crop.png"), "png")

astro = Image.open('./images/astro.jpg')
print(astro.size)
astro_copy = astro.copy()
astro_copy.thumbnail((400, 200)) # keeps aspect ratio
print(astro_copy.size)
astro_copy.save(path.join('./output', 'astro-resized.png'), 'png')
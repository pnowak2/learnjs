from PIL import Image, ImageFilter

img = Image.open('img/pikachu.jpg')
print(img.format)
print(img.size)
print(img.mode)

bw = img.convert('L') # b&w
bw.save('out/bw.png', 'png')

blur = img.filter(ImageFilter.BoxBlur(100))
blur.save('out/blur.png', 'png')

smooth = img.filter(ImageFilter.SMOOTH)
smooth.save('out/smooth.png', 'png')

sharp = img.filter(ImageFilter.SHARPEN)
sharp.save('out/sharp.png', 'png')

# img.show() # opens preview of img with default system app

rotated = img.rotate(90)
rotated.save('out/rotated.png', 'png')

resized = img.resize((300, 300))
resized.save('out/resized.png', 'png')

cropped = img.crop((100, 100, 400, 400))
cropped.save('out/cropped.png', 'png')
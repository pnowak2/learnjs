import sys
import os
from PIL import Image

# goal:
# jpg-to-png-converter.py source/ destination/

# grab first and second arguments
_, sourceDir, destDir, *_ = sys.argv

if (not os.path.exists(destDir)):
  os.makedirs(destDir)

for file_name in os.listdir(sourceDir):
  original = Image.open(os.path.join(sourceDir, file_name))
  clean_name = os.path.splitext(file_name)[0]
  print(clean_name)
  original.save(os.path.join(destDir, f'{clean_name}.png'), 'png')

print('all done')
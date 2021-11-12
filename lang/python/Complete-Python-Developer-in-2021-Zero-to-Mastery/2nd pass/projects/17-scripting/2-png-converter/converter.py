from os import listdir, path, mkdir
import sys
from PIL import Image

if len(sys.argv) < 3:
    print('syntax: converter.py <srcDir> <dstDir>')
else:
    srcDir = sys.argv[1]
    dstDir = sys.argv[2]


    if not path.exists(dstDir):
        mkdir('converted')

    original_files = listdir(srcDir)

    print(f'found files: {original_files}')
    file_names_without_extension = map(lambda name: name.split('.')[0], original_files)

    for file in file_names_without_extension:
        img = Image.open(f'{srcDir}/{file}.jpg')
        img.save(f'{dstDir}/{file}.png', 'png')
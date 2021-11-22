import PyPDF2
from sys import argv
from os import listdir

# inputs = argv[1:] # take all file paths from cmd
if len(argv) > 1:
    dir = argv[1]
else:
    dir = 'src'

inputs = listdir(dir) # take all file paths from cmd directory provided

def combine(pdfs):
    merger = PyPDF2.PdfFileMerger()
    for pdf in pdfs:
        merger.append(f'{dir}/{pdf}')

    merger.write('out/super.pdf')

combine(inputs)

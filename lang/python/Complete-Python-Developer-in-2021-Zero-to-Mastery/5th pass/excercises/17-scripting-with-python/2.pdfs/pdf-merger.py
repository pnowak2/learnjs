import pypdf
import sys
import os

_, *files = sys.argv

merger = pypdf.PdfWriter()

for pdf in files:
  if os.path.exists(pdf):
    merger.append(pdf)
    print(f'appending {pdf}')

merger.write('output/merged.pdf')
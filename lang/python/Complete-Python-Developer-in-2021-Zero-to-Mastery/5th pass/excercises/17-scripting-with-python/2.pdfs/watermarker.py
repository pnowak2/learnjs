import pypdf

stamp = pypdf.PdfReader('files/wtr.pdf').pages[0]
writer = pypdf.PdfWriter(clone_from="files/twopage.pdf")

for page in writer.pages:
  print(page)
  page.merge_page(stamp, over=False)

writer.write('output/watermarked.pdf')
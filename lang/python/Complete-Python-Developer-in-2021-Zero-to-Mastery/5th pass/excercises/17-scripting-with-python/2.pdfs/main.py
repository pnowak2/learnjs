import pypdf

with open('files/dummy.pdf', 'rb') as pdf:
  reader = pypdf.PdfReader(pdf)
  print(reader.get_num_pages())

with open('files/twopage.pdf', 'rb') as pdf:
  reader = pypdf.PdfReader(pdf)
  print(reader.get_num_pages())

with open('files/dummy.pdf', 'rb') as pdf:
  reader = pypdf.PdfReader(pdf)
  page = reader.get_page(0)
  page.rotate(180)

  writer = pypdf.PdfWriter()
  writer.add_page(page)

  with open('output/rotated.pdf', 'wb') as pdf:
    writer.write(pdf)


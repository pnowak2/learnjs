import PyPDF2

with open('src/twopage.pdf', 'rb') as file:
    reader = PyPDF2.PdfFileReader(file)
    print(reader.numPages)
    print(reader.getPage(0))

    page = reader.getPage(0)
    page.rotateClockwise(90)
    writer = PyPDF2.PdfFileWriter()
    with open('out/tilt.pdf', 'wb') as file:
        writer.addPage(page)
        writer.write(file)

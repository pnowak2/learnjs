class TestFileIO:
  def test_open(self):
    my_file = open(f"specs/files/readme.md")
    assert(my_file.read() == 'hello world')
    # cursor is at the end of the line, as line has been read
    assert(my_file.read() == '')

    my_file.close()

  def test_seek(self):
    my_file = open(f"specs/files/readme.md")
    assert(my_file.read() == 'hello world')

    # cursor is at the end of the line
    assert(my_file.read() == '')

    my_file.seek(0)

    # move cursor to the beginning
    assert(my_file.read() == 'hello world')

    my_file.close()

  def test_readline(self):
    my_file = open(f"specs/files/multiline.txt")
    assert(my_file.readline() == 'line 1\n')
    assert(my_file.readline() == 'line 2\n')
    assert(my_file.readline() == 'line 3')
    assert(my_file.readline() == '')

    my_file.close()

  def test_readlines(self):
    my_file = open(f"specs/files/multiline.txt")
    assert(my_file.readlines() == ['line 1\n', 'line 2\n', 'line 3'])

    my_file.close()
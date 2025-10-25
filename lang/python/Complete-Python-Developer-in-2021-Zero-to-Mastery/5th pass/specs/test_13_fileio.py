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

  def test_open_with(self):
    # no need to close the file
    with open(f"specs/files/readme.md") as file:
      assert(file.read() == 'hello world')

  def test_open_read_mode(self):
    with open(f"specs/files/logs.txt", mode='r') as file:
      file.readline() == 'first log'

  def test_open_write_mode(self):
    with open(f"specs/files/logs.txt", mode='w') as file:
      chars_written = file.write("something")
      assert(chars_written == 9)

    with open(f"specs/files/logs.txt", mode='r') as file:
      assert(file.readline() == 'something')

  def test_open_readwrite_mode(self):
    with open(f"specs/files/logs.txt", mode='r+') as file:
      file.write("something else")
      file.seek(0)
      assert(file.readline() == 'something else')

  def test_clear_file(self):
    with open(f"specs/files/logs.txt", mode="w") as file:
      file.write('') # wipes out everything in file and makes new content

    with open(f"specs/files/logs.txt", mode="r") as file:
      assert(file.read() == '')

  def test_read_and_write_to_file(self):
    with open(f"specs/files/logs.txt", mode="w") as file:
      file.write('1234567890') # wipes out everything in file and makes new content

    with open(f"specs/files/logs.txt", mode="r+") as file:
      file.write('hello') # reads file and writes starting from cursor zero

    with open(f"specs/files/logs.txt", mode="r") as file:
      assert(file.read() == 'hello67890')

  def test_open_append(self):
    with open(f"specs/files/logs.txt", mode="w") as file:
      file.write('hello') # wipes out everything in file and makes new content

    with open(f"specs/files/logs.txt", mode="a") as file:
      file.write('world')

    with open(f"specs/files/logs.txt", mode="r") as file:
      assert(file.read() == 'helloworld')

class TestContextManager:
  def test_with_on_own_class(self):
    class Connection:
      def __init__(self, username):
        self.username = username
        pass

      def __enter__(self):
        self.password = 'root'
        return self

      def __exit__(self, exception_type, exception_val, exception_traceback):
        self.password = 'none'

        if(exception_type is not None):
          'exception happened..'

        # True, exception never propagates, gets swallowed here
        # False exception propagates further
        return True 

    
    conn = Connection('pnowak')
    assert(conn.username == 'pnowak')

    with conn as c:
      assert(type(c) is Connection)
      assert(c.password == 'root')

    assert(conn.password == 'none')
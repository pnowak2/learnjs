from typing import TextIO
import pathlib


class TestFiles:
    class TestRead:
        def test_read_file(self):
            my_file = open('excercises/13-file-io/test.txt')
            assert my_file.read() == 'hello world!'

            my_file.close()

        def test_cursor(self):
            my_file = open('excercises/13-file-io/test.txt')
            assert my_file.read() == 'hello world!'
            assert my_file.read() == ''

            my_file.seek(0)

            assert my_file.read() == 'hello world!'

            my_file.close()

        def test_readline(self):
            my_file = open('excercises/13-file-io/multiline.txt')
            assert my_file.readline() == 'first line\n'
            assert my_file.readline() == 'second line\n'
            assert my_file.readline() == 'third line'
            assert my_file.readline() == ''

            my_file.close()

        def test_readlines(self):
            my_file = open('excercises/13-file-io/multiline.txt')
            assert my_file.readlines() == [
                'first line\n',
                'second line\n',
                'third line'
            ]

            my_file.close()

    class TestReadWriteAppend:
        def test_read_with_statement(self):
            with open('excercises/13-file-io/test.txt', mode='r') as file:
                assert file.read() == 'hello world!'

        def test_readwrite_with_statement(self):
            with open('excercises/13-file-io/readwrite.txt', mode='r+') as file:
                file.truncate()
                file.write('hello')

                file.seek(0)
                assert file.read() == 'hello'

                file.write('world')
                file.seek(0)
                assert file.read() == 'helloworld'

        def test_append_with_statement(self):
            '''no overrides, always adds at end of the file'''
            with open('excercises/13-file-io/append.txt', mode='a') as file:
                file.write('hello')
                file.write('world')

        def test_write_with_statement(self):
            '''will replace file with new contents, not just first bytes'''
            with open('excercises/13-file-io/write.txt', mode='w') as file:
                file.write('yo')
                file.write('man')

        def test_write_file_which_does_not_exist(self):
            '''will create new file even if it didnt exist before'''
            with open('excercises/13-file-io/doesnotexist.txt', mode='w') as file:
                file.write('now you do!')

    class TestFilePaths:
        def test_with_paths(self):
            path = pathlib.Path('excercises\\13-file-io\\test.txt')
            posix_path = path.as_posix()
            assert posix_path == 'excercises/13-file-io/test.txt'

            with open(posix_path, mode='r') as file:
                assert file.read() == 'hello world!'

    class TestFileIOErrors:
        def test_filenotfound(self):
            try:
                with open('excercises/13-file-io/null', mode='r') as file:
                    pass
            except FileNotFoundError as err:
                assert err.filename == 'excercises/13-file-io/null'
            else:
                assert False

        def test_ioerror(self):
            try:
                with open('excercises/13-file-io/null', mode='r') as file:
                    pass
            except IOError as err:
                assert True
            else:
                assert False
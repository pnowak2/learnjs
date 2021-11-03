from typing import TextIO


class TestFiles:
    def test_read_file(self):
        my_file = open('excercises/13-file-io/test.txt')
        assert my_file.read() == 'hello world!'

    def test_cursor(self):
        my_file = open('excercises/13-file-io/test.txt')
        assert my_file.read() == 'hello world!'
        assert my_file.read() == ''

        my_file.seek(0)

        assert my_file.read() == 'hello world!'

    def test_readline(self):
        my_file = open('excercises/13-file-io/multiline.txt')
        assert my_file.readline() == 'first line\n'
        assert my_file.readline() == 'second line\n'
        assert my_file.readline() == 'third line'
        assert my_file.readline() == ''

    def test_readlines(self):
        my_file = open('excercises/13-file-io/multiline.txt')
        assert my_file.readlines() == [
            'first line\n',
            'second line\n',
            'third line'
        ]
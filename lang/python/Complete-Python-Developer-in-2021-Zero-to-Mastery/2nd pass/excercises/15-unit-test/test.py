import unittest
import main

class TestMain(unittest.TestCase):

    def setUp(self):
        print('about to run test')

    def tearDown(self) -> None:
        print('teardown')

    def test_do_stuff(self):
        num = 10
        result = main.do_stuff(num)

        self.assertEqual(result, 15)

    def test_do_stuff2(self):
        num = 'bar' 
        result = main.do_stuff(num)

        self.assertIsInstance(result, ValueError)

    def test_do_stuff3(self):
        param = None
        result = main.do_stuff(param)

        self.assertEqual(result, 'please number')

    def test_do_stuff4(self):
        param = ''
        result = main.do_stuff(param)

        self.assertEqual(result, 'please number')

unittest.main()
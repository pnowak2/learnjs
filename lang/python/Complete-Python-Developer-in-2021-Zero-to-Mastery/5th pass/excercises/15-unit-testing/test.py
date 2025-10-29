import unittest
import main

class TestMain(unittest.TestCase):
  def setUp(self):
    print('about to test')

  def test_do_stuff(self):
    '''Some description for this test'''
    test_param = 10
    result = main.do_stuff(test_param)

    self.assertEqual(result, 100)

  def test_string(self):
    test_param = 'test'
    result = main.do_stuff(test_param)
    self.assertIsInstance(result, ValueError)

  def test_none(self):
    test_param = None
    result = main.do_stuff(test_param)
    self.assertEqual(result, 'please enter a number')

  def test_empty_string(self):
    test_param = ''
    result = main.do_stuff(test_param)
    self.assertEqual(result, 'please enter a number')

  def test_with_zero(self):
    test_param = 0
    result = main.do_stuff(test_param)
    self.assertEqual(result, 'please enter a number')

  def tearDown(self):
    print('cleaning up')

if __name__ == '__main__':
  unittest.main()
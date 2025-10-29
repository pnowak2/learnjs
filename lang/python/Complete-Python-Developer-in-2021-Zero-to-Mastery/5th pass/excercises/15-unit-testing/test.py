import unittest
import main

class TestMain(unittest.TestCase):
  def test_do_stuff(self):
    test_param = 10
    result = main.do_stuff(test_param)

    self.assertEqual(result, 100)

  def test_other_stuff(self):
    test_param = 'test'
    result = main.do_stuff(test_param)
    self.assertIsInstance(result, ValueError)

  def test_sth_else(self):
    test_param = None
    result = main.do_stuff(test_param)
    self.assertEqual(result, 'please enter a number')

  def test_empty_string(self):
    test_param = ''
    result = main.do_stuff(test_param)
    self.assertEqual(result, 'please enter a number')

if __name__ == '__main__':
  unittest.main()
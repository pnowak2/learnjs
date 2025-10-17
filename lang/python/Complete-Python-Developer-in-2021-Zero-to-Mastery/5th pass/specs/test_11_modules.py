import utility.math as math
from utility import math as m
from utility.math import sum, divide

class TestModules:
  def test_importing_module_from_package(self):
    assert(math.divide(6, 3) == 2)
    assert(math.sum(6, 3) == 9)
    assert(m.sum(6, 3) == 9)
    assert(sum(6, 3) == 9)
    assert(divide(9, 3) == 3)
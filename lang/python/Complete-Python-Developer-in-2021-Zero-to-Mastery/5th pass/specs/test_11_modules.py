import utility.math as math
from utility import math as m
from utility.math import sum, divide

import random
from random import shuffle
import random as rdm

import sys

class TestModules:
  def test_importing_module_from_package(self):
    assert(math.divide(6, 3) == 2)
    assert(math.sum(6, 3) == 9)
    assert(m.sum(6, 3) == 9)
    assert(sum(6, 3) == 9)
    assert(divide(9, 3) == 3)

class TestBuiltInModules:
  def test_random(self):
    assert(type(random.randint(0, 5)) == int)
    assert(type(random.random()) == float)
    assert(type(rdm.choice([1, 2, 4, 6])) == int)

  def test(self):
    assert(sys.argv == '')
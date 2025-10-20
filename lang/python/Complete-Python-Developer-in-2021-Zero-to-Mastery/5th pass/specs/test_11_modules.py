import utility.math as math
from utility import math as m
from utility.math import sum, divide

import random
from random import shuffle
import random as rdm

import sys

from collections import Counter, defaultdict, OrderedDict

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

class TestUsefulModules:
  def test_counter(self):
    lst = [3, 3, 1, 2, 2, 3]
    result = Counter(lst)

    # makes dictionary with counts
    # counts how many occurencies each item in list has
    assert(list(result.items()) == [(3, 3), (1, 1), (2, 2)])

    sentence = 'blah blah blah thinking about python'
    stats = Counter(sentence)

    # how many 'h' occurs in sentence
    assert(stats.get('h') == 5)
    
  def test_default_dict(self):
    dct = {'a': 1, 'b': 2}

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
    assert(dct['a'] == 1)

    try:
      assert(dct['c'])
      assert(False)
    except KeyError:
      assert(True)

    assert(dct.get('c') == None)
    assert(dct.get('c', 'does not exist') == 'does not exist')

    # same but with defaultdict
    defdict = defaultdict(lambda: 'does not exist', dct)

    assert(defdict['c'] == 'does not exist')
    assert(defdict['a'] == 1)
    assert(defdict['b'] == 2)

  def test_ordered_dict(self):
    # retains order of insertion
    d = OrderedDict()

    d['a'] = 1
    d['b'] = 2

    d2 = OrderedDict()

    d2['a'] = 1
    d2['b'] = 2

    assert(d == d2)

    # would fail if order of insertion is different
    # would pass for regular dictionaries as values and keys are same, order does not matter
    
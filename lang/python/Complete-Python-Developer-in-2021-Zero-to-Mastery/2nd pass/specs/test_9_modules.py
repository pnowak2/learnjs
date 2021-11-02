import modules.shopping.more_shopping
from modules.shopping.more_shopping.shopping_cart import buy
from modules.shopping.more_shopping import shopping_cart

from modules import *
from modules import utility
from modules.utility import divide, multiply, max as my_max

import random
from random import shuffle as shuf
import sys

from collections import Counter, OrderedDict, defaultdict
import datetime
from array import array
# import pyjokes

class TestModules:
    def test_utility_contents(self):
        assert modules
        assert type(utility.multiply)
        assert type(utility.divide)
        assert type(multiply)
        assert type(divide)

    def test__pycache__folder(self):
        # just caches compiled files using imports for performance reasons
        pass

    def test_imported_files(self):
        assert utility.multiply(2, 5) == 10
        assert utility.divide(9, 3) == 3 
        assert multiply(2, 5) == 10
        assert divide(9, 3) == 3 

    def test_packages_in_python(self):
        # __init__.py empty file should be placed in each package folder, this file actually makes folder python package
        assert shopping_cart
        assert modules.shopping.more_shopping.shopping_cart
        assert shopping_cart.buy('milk') == ['milk']

        assert buy('milk') == ['milk']

    def test_ways_to_import(self):
        # see top of the file
        pass

    def test_naming_imports(self):
        assert max(1, 2, 3) == 3
        assert my_max() == 'oops'

    class TestModuleName:
        def test_main(self):
            # will equal to '__name__' when in the main file, other imported files get full package name instead there
            # way to make sure im in main module
            if __name__ == '__main__':
                pass

        def test_module_name(self):
            assert __name__ == 'test_9_modules'

        def test_type_of_class(self):
            class Student:
                pass

            assert 'test_9_modules.TestModules.TestModuleName.test_type_of_class.<locals>.Student' in str(type(Student())) 

    class TestBuiltInModules:
        def test_random(self):
            assert random.random() < 1
            assert random.randint(1, 10) in list(range(10))
            assert random.choice([1, 3, 5]) in list([1, 3, 5])
            # alias to random.shuffle
            shuf([1, 2, 3]) # shuffles the list, mutable operation

        def test_sys(self):
            sys.argv # brings params passed to py file

        def test_python_package_index(self):
            '''pip install pyjokes'''
            '''pip list'''
            pass

        def test_pyjokes(self):
            # assert len(pyjokes.get_joke(category='chuck')) > 0
            pass

        def test_virtual_environments(self):
            # pip install virtualenv
            # $ python3 -m venv env
            # run activate script from scripts or bin
            # pip install dependency, it will be put in venv lib/site-packages folder
            pass

    class TestUsefulModules:
        def test_counter(self):
            li = [1, 1, 2, 2, 2, 3]

            assert Counter(li) == {
                1: 2,
                2: 3,
                3: 1
            }

        def test_defaultdict(self):
            d = {'a': 1, 'b': 2}
            assert d['a'] == 1

            try:
                d['c']
            except:
                assert True
            else:
                assert False

            assert defaultdict(int, d)['c'] == 0 # will call int() for items which do not exist on dictionary
            assert defaultdict(lambda: 'does not exist', d)['c'] == 'does not exist'
            assert defaultdict(int, d)['a'] == 1

        def test_ordered_dict(self):
            d = OrderedDict()
            d['a'] = 1
            d['b'] = 2

            d2 = OrderedDict()
            d2['b'] = 2
            d2['a'] = 1

            assert d != d2 # that would be equal for regular dictionary. as of 3.7 dicts are by default ordered

        def test_date_time(self):
            assert str(datetime.time(9, 14, 2 )) == '09:14:02'
            assert str(datetime.date.fromisoformat('2021-02-03')) == '2021-02-03'

        def test_array_module(self):
           arr = array('i', [1, 2, 3]) # more performant than list
           assert arr[1] == 2

import modules.shopping.more_shopping
from modules.shopping.more_shopping.shopping_cart import buy
from modules.shopping.more_shopping import shopping_cart

from modules import *
from modules import utility
from modules.utility import divide, multiply, max as my_max

import random

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
            random
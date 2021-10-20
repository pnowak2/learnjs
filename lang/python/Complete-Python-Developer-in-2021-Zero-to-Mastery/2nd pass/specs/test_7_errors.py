from functools import reduce
from time import time
from typing import final

class TestErrors:
    def test_try_except_else_finally_blocks(self):
        try:
            age = int('boo')
            5 / age
            assert False
        except ValueError:
            assert True
        except ZeroDivisionError:
            assert True
        else:
            assert True  # if no error, run this
        finally:
            assert True # whatever is the case, run this

    def test_multi_error_handling(self):
        def sum(num1, num2):
            try:
                return num1 / num2
            except ZeroDivisionError as err:
                return f'division by zero: {err}'
            except (TypeError, ValueError) as err:
                return f'not numbers: {err}'

        assert sum(6, 3) == 2
        assert 'division by zero' in sum(2, 0)
        assert 'not numbers' in sum('2', 3) 

    def test_raising_errors(self):
        def fn():
            raise ValueError('all is wrong')

        try:
            fn()
        except ValueError as err:
            assert err.args[0] == 'all is wrong'
        else:
            assert False
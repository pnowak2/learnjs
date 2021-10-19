from functools import reduce
from time import time

class TestDecorators:
    def test_functions_are_also_variables(self):
        def hello(fn):
            return fn()

        greet = hello

        assert hello(lambda: 'hello') == 'hello'
        assert greet(lambda: 'hello') == 'hello'

        del hello

        assert greet(lambda: 'hello') == 'hello'

    def test_nested_functions(self):
        def hello(fn):
            return fn()

        def greet():
            return 'hello'

        assert (hello(greet)) == 'hello'

    def test_higher_order_functions_HOC(self):
        def greet(fn):
            return fn()

        def run():
            def func():
                return 5
            return func

        assert greet(lambda: 5) == 5
        assert run()() == 5

    def test_decorator(self):
        def my_decorator(func):
            def wrap_func():
                return f'*** {func()} ***'

            return wrap_func

        @my_decorator
        def hello():
            return 'hello'

        assert hello() == '*** hello ***'
        
    def test_without_decorator_syntax(self):
        def my_decorator(func):
            def wrap_func():
                return f'*** {func()} ***'

            return wrap_func

        def hello():
            return 'hello'

        assert hello() == 'hello'
        assert my_decorator(hello)() == '*** hello ***'

    def test_decorator_with_params(self):
        def my_decorator(func):
            def wrap_func(name):
                return f'*** {func(name)} ***'

            return wrap_func

        @my_decorator
        def hello(name):
            return f'hello {name}'

        # same as
        # my_decorator(hello)('piotr')

        assert hello('piotr') == '*** hello piotr ***'

    def test_decorator_patern(self):
        def my_decorator(func):
            def wrapper(*args, **kwargs):
                return f'*** {func(*args, **kwargs)} ***'

            return wrapper

        @my_decorator
        def greet(name, age):
            return f'hello {name}, {age}'

        assert greet('piotr', 42) == '*** hello piotr, 42 ***'

    def test_decorator_factory_patern(self):
        def my_decorator_factory(params):
            def my_decorator(func):
                def wrapper(*args, **kwargs):
                    if(params.get( 'isYoung' )):
                        return f'*** {func(*args, **kwargs)} ***'
                    else:
                        return f'{func(*args, **kwargs)}'

                return wrapper

            return my_decorator


        @my_decorator_factory({
            'isYoung': True
        })
        def greet(name, age):
            return f'hello {name}, {age}'

        assert greet(name='piotr', age=42) == '*** hello piotr, 42 ***'

    def test_performance_decorator(self):
        def performance(fn):
            def wrapper(*args, **kwargs):
                start = time()
                result = fn(*args, **kwargs)
                end = time()

                return f'{result}, it took {end - start} s'
            return wrapper

        @performance
        def long_time():
            for i in range(10000000):
                i*5

        result = long_time()
from time import time

class TestAdvancedPythonDecorators:
    class TestPassingFunctions:
        def test(self):
            def hello(fn):
                return fn

            def greet():
                return 'hi'

            assert greet() == 'hi'
            assert hello(greet)() == 'hi'

    class TestDecorators:
        def test_simple_definition(self):
            def my_decorator(fn):
                def wrap_fn():
                    return 'before-' + fn() + '-after'
                
                return wrap_fn

            def hello_no_decorator():
                return 'hello'

            @my_decorator
            def hello():
                return 'hello'

            # same as
            hello_decorated = my_decorator(hello_no_decorator)

            @my_decorator
            def bye():
                return 'seeya'

            assert hello() == 'before-hello-after'
            assert hello_decorated() == 'before-hello-after'

            assert bye() == 'before-seeya-after'
        
        def test_with_arguments(self):
            def my_decorator(fn):
                def wrap_fn(*args, **kwargs):
                    return fn(*args, **kwargs)

                return wrap_fn

            @my_decorator
            def hello(name, age):
                return f'hello, {name} ({age})'

            assert hello('piotr', 43) == 'hello, piotr (43)'

        def test_with_performance_decorator(self):
            def performance(fn):
                def wrap_fn(*args, **kwargs):
                    start = time()
                    result = fn(*args, **kwargs)
                    end = time()

                    return {
                        'result': result,
                        'time': end - start
                    }

                return wrap_fn

            @performance
            def long_time():
                for i in range(100000):
                    i ** 5

                return 'done'

            assert long_time().get('result') == 'done'
            assert type(long_time().get('time')) == float

        def test_authenticated_decorator(self):
            # Create an @authenticated decorator that only allows the function to run is user1 has 'valid' set to True:
            user1 = {
                'name': 'Sorna',
                'valid': True #changing this will either run or not run the message_friends function.
            }
            user2 = {
                'name': 'Yon',
                'valid': False #changing this will either run or not run the message_friends function.
            }

            def authenticated(fn):
                def wrapper(*args, **kwargs):
                    if(args[0].get('valid')):
                        return fn(*args, **kwargs)
                    else:   
                        return f'sorry, {args[0]["name"]}'

                return wrapper

            @authenticated
            def message_friends(user):
                return f'ok {user["name"]}'

            assert message_friends(user1) == f'ok Sorna'
            assert message_friends(user2) == f'sorry, Yon'

            
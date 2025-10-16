class TestDecorators:
    def test_function_pointers(self):
        def hello():
            return 'hello'

        greet = hello
        del hello

        assert (greet() == 'hello')

    def test_passing_functions(self):
        def hello(fn):
            return f'calling fn: {fn()}'

        def greet():
            return 'hello fellow friend'

        assert (hello(greet) == 'calling fn: hello fellow friend')

    def test_higher_order_functions(self):
        def make_fn(param):
            def internal_fn(first, *args, **kwargs):
                return param * first

            return internal_fn

        assert (make_fn(5)(2) == 10)

    def test_first_decorator(self):
        def my_decorator(fn):
            def wrapper_fn(*args):
                return fn(*args)

            return wrapper_fn

        @my_decorator
        def hello(name):
            return f'hello {name}'

        result = hello('piotr')
        assert(result == 'hello piotr')

    def test_decorator_with_params(self):
        def my_decorator(arg):
            def actual_decorator(fn):
                def wrapper_fn(*args):
                    return fn(*args) + arg 

                return wrapper_fn

            return actual_decorator

        @my_decorator('!')
        def hello(name):
            return f'hello {name}'

        result = hello('piotr')
        assert(result == 'hello piotr!')

    def test_decorator_with_dict_config(self):
        def my_decorator(config):
            tag = config.get('tag', 'div')
            def actual_decorator(fn):
                def wrapper_fn(*args):
                    return f'<{tag}>{fn(*args)}</{tag}>'

                return wrapper_fn

            return actual_decorator

        @my_decorator({
            'tag': 'greeter'
        })
        def hello(name):
            return f'hello {name}'

        result = hello('piotr')
        assert(result == '<greeter>hello piotr</greeter>')
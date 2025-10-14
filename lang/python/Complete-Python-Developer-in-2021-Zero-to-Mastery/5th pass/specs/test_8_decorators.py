class TestDecorators:
    def test_function_pointers(self):
        def hello():
            return 'hello'

        greet = hello
        del hello
        
        assert(greet() == 'hello')
        
    def test_passing_functions(self):
        def hello(fn):
            return f'calling fn: {fn()}'

        def greet():
            return 'hello fellow friend'
        
        assert(hello(greet) == 'calling fn: hello fellow friend')
        
    def test_higher_order_functions(self):
        def make_fn(param):
            def internal_fn(first, *args, **kwargs):
                return param * first

            return internal_fn

        assert(make_fn(5)(2) == 10)
        
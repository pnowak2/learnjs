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
                    return fn(*args) + arg # unpack args

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
                def wrapper_fn(*args, **kwargs):
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

    def test_with_simple_class(self):
        class MyClass:
            def __init__(self, fn):
                self.fn = fn

            def __call__(self, *args, **kwargs):
                return f'@decor: {self.fn(*args, **kwargs)}'

        @MyClass
        def fn(arg):
            return f'arg: {arg}'

        # fn = MyClass(fn)

        assert(fn(5) == '@decor: arg: 5')

    def test_making_descriptor(self):
        class MyProperty:
            def __init__(self, getterFn):
                self._getterFn = getterFn

            def __get__(self, instance, clazz):
                if instance is None:
                    return self

                if self._getterFn is None:
                    raise AttributeError('Attribute not found')

                return self._getterFn(instance)

            def __set__(self, instance, value):
                if self._setterFn is None:
                    raise AttributeError('Attribute setter not found')

                self._setterFn(instance, value)

            def __delete__(self, instance):
                if self._deleterFn is None:
                    raise AttributeError('Attribute setter not found')
                self._deleterFn(instance)

            def setter(self, setterFn): 
                self._setterFn = setterFn
                return self

            def deleter(self, deleterFn):
                self._deleterFn = deleterFn
                return self

        class Person:
            def __init__(self, name):
                self._name = name

            @MyProperty
            def name(self):
                return "@" + self._name
            # name = MyProperty(name) # makes class level property which is getter/descriptor

            @name.setter
            def name(self, value):
                self._name = value + '!'
            # name = name.setter(name)

            @name.deleter
            def name(self):
                del self._name
            # name = name.deleter(name)

        p = Person('piotr')

        assert(p.name == '@piotr') # first looks in __dict__, but its not there, then check in class, to handle for descriptors

        p.name = 'domi'
        assert (p.name == '@domi!')

        p.name

        assert (Person.name == Person.name)

        del p.name

        try:
            p.name
        except AttributeError as ae:
            assert ae.args[0] == "'Person' object has no attribute '_name'"
            assert True



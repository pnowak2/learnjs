from functools import reduce
from time import time
from typing import final

class TestGenerators:
    def test_lists_in_memory(self):
        def make_list(num):
            result = []
            for i in range(num):
                result.append(i*2)

            return result

        lst = make_list(3)
        assert lst == [0, 2, 4]

    def test_generator_not_in_memory(self):
        def generator_fn(num):
            for i in range(num):
                yield i*2 # pauses function till next(), one item at a time in memory

        result = []
        for item in generator_fn(3):
            result.append(item)

        assert result == [0, 2, 4]

    def test_generator(self):
        def generator_fn(num):
            for i in range(num):
                yield i*2 # pauses function till next(), one item at a time in memory

        g1 = generator_fn(3)
        assert next(g1) == 0
        assert next(g1) == 2
        assert next(g1) == 4

        g2 = generator_fn(3)
        assert g2.__next__() == 0
        assert g2.__next__() == 2
        assert g2.__next__() == 4

        try:
            next(g1)
        except StopIteration:
            assert True
        else:
            assert False # no errors thrown

    def test_performance(self):
        pass # generators are very fast comparing to classic sets of data in memory

    def test_own_for(self):
        def my_for(iterable):
            iterator = iter(iterable) # gets iterator from object which supports it

            while True:
                try:
                    yield next(iterator)
                except StopIteration as si:
                    yield None
                    break

        mf = my_for([1, 2, 3])

        assert next(mf) == 1
        assert next(mf) == 2
        assert next(mf) == 3
        assert next(mf) == None

    def test_own_range(self):
        class MyGen():
            current = 0

            def __init__(self, first, last):
                self.first = first
                self.last = last

            def __iter__(self):
                return self

            def __next__(self):
                if MyGen.current < self.last:
                    num = MyGen.current
                    MyGen.current += 1
                    return num
                else:
                    raise StopIteration

        gen = MyGen(0, 3)

        assert iter(gen) == gen

        assert next(gen) == 0
        assert next(gen) == 1
        assert next(gen) == 2

        try:
            next(gen)
        except StopIteration:
            assert True
        else:
            assert False
class TestAdvancedPythonGenerators:
    class TestGenerators:
        def test_make_list_in_memory_at_once(self):
            def make_list(num):
                result = []
                for i in range(num):
                    result.append(i*2)
                return result

            assert make_list(3) == [0, 2, 4]

        def test_iterables(self):
            def my_generator(num):
                for i in range(num):
                    yield i # gives value and pauses the function

            gen1 = my_generator(3)

            assert list(gen1) == [0, 1, 2]

            gen2 = my_generator(4)
            try:
                assert next(gen2) == 0
                assert next(gen2) == 1
                assert next(gen2) == 2
                assert next(gen2) == 3
            except StopIteration:
                pass

            # same as above using dunder methods (not recommended calling those directly)
            gen3 = my_generator(5)
            assert gen3.__next__() == 0
            assert gen3.__next__() == 1
            assert gen3.__next__() == 2
            assert gen3.__next__() == 3
            assert gen3.__next__() == 4

    class TestIter:
        def test_own_for(self):

            def special_for(iterable):
                iterator = iter(iterable)
                while(True):
                    try:
                        next(iterator)
                    except StopIteration:
                        break

            special_for([1, 2, 3])

        def test_own_range(self):
            '''
            Allows to convert any object into iterable
            '''
            class MyRange:
                current = 0

                def __init__(self, first, last):
                    self.first = first
                    self.last = last

                def __iter__(self):
                    MyRange.current = 0
                    return self

                def __next__(self):
                    if MyRange.current < self.last:
                        num = MyRange.current
                        MyRange.current += 1
                        return num

                    raise StopIteration


            result = ''

            for i in MyRange(0, 5):
                result += str(i)

            assert result == '01234'

            rng = iter(MyRange(0, 3))
            assert next(rng) == 0
            assert next(rng) == 1
            assert next(rng) == 2

    class TestFibinacciNumbersWithGeneratorFunction:
        def test(self):

            def fib(number):
                a = 0
                b = 1

                for _ in range(number):
                    yield a
                    temp = a
                    a = b
                    b = temp + b
                
            fib3 = fib(8)

            assert next(fib3) == 0
            assert next(fib3) == 1
            assert next(fib3) == 1
            assert next(fib3) == 2
            assert next(fib3) == 3
            assert next(fib3) == 5
            assert next(fib3) == 8
            assert next(fib3) == 13

            # can also use it as any iterable, like in for loops etc
            result = ''
            for nbr in fib(5):
                result += str(nbr)

            assert result == '01123'
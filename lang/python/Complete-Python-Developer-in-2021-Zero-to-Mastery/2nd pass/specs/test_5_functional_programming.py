from functools import reduce

class TestFunctionalProgramming:
    class TestWhatsFP:
        def test(self):
            pass

    class TestPureFunctions:
        def test_classical_approach_pure_function(self):
            def multiply_by2(li):
                new_list = []
                for item in li:
                    new_list.append(item * 2)
                return new_list

            assert multiply_by2([1, 2, 3]) == [2, 4, 6]

        def test_not_pure_function(self):
            new_list = [] # !!!
            def multiply_by2(li):
                for item in li:
                    new_list.append(item * 2) # interacts with outside world
                return new_list

            assert multiply_by2([1, 2, 3]) == [2, 4, 6]

    class TestMap:
        def test(self):
            def mul(item):
                return item * 2

            assert list(map(mul, [1, 2, 3])) == [2, 4, 6]

    class TestFilter:
        def test(self):
            def is_even(item):
                return item % 2 == 0

            assert list(filter(is_even, [1, 2, 3, 4, 5, 6])) == [2, 4, 6]

    class TestZip:
        def test(self):
            assert list(zip(['a', 'b', 'c'], [1, 2, 3])) == [('a', 1), ('b', 2), ('c', 3)]

    class TestReduce:
        def test(self):
            numbers = [1, 2, 3, 4, 5]
            def sum(accum, item):
                return accum + item

            assert reduce(sum, numbers, 0) == 15
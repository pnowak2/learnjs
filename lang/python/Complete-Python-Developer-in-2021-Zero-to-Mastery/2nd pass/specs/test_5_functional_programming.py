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
            new_list = []  # !!!

            def multiply_by2(li):
                for item in li:
                    new_list.append(item * 2)  # interacts with outside world
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
            assert list(zip(['a', 'b', 'c'], [1, 2, 3])) == [
                ('a', 1), ('b', 2), ('c', 3)]

    class TestReduce:
        def test(self):
            numbers = [1, 2, 3, 4, 5]

            def sum(accum, item):
                return accum + item

            assert reduce(sum, numbers, 0) == 15

    class TestLambdaExpressions:
        def test(self):
            lambda param: param

            result = list(map(lambda item: item * 2, [1, 2, 3]))
            result = reduce(lambda acc, item: acc + item, [1, 2, 3], 0)
            assert result == 6

    class TestSortExcercise:
        def test(self):
            arr = [(1, 3), (3, 2), (5, 1)]
            arr.sort(key=lambda tupleItem: tupleItem[1], reverse=False)

            assert arr == [(5, 1), (3, 2), (1, 3)]

    class TestListComprehensions:
        def test(self):
            lst = [char for char in 'buba']
            assert lst == ['b', 'u', 'b', 'a']

            nbs = [num ** 2 for num in [1, 2, 3, 4, 5]]
            assert nbs == [1, 4, 9, 16, 25]

            evenNbs = [n for n in nbs if n % 2 == 0]
            assert evenNbs == [4, 16]

    class TestSetComprehensions:
        def test(self):
            st = {ch for ch in [1, 1, 1, 2, 3] if ch % 2 != 0}
            assert st == {1, 3}

    class TestDictionaryComprehensions:
        def test(self):
            dct = {
                'a': 'boo',
                'b': 'bar',
                'c': 'baz',
            }

            {key: val for key, val in dct.items()}

            result = {key: (val + 'suff') for key, val in dct.items() if key == 'a' or key == 'c'}
            assert result == {
                'a': 'boosuff',
                'c': 'bazsuff',
            }

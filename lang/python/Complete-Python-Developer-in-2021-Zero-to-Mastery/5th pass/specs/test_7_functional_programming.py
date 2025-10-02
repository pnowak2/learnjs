from functools import reduce


class TestFunctionalProgramming:
    def test_pure_functions(self):
        def multiply_by2(lst):
            # same input, same output
            # no side effects
            new_list = []
            for item in lst:
                new_list.append(item * 2)

            return new_list

        
        result = multiply_by2([1, 2, 3])
        assert(result == [2, 4, 6])

    def test_map(self):
        input = [1, 2, 3]

        def times_3(item):
            return item * 3

        result = list(map(times_3, input))

        assert(result == [3, 6, 9])

    def test_filter(self):
        input = [1, 2, 3, 4, 5, 6]

        def even_only(item):
            return item % 2 == 0

        result = list(filter(even_only, input))

        assert(result == [2, 4, 6])

    def test_zip(self):
        a = [1, 2, 3]
        b = ['a', 'b', 'c']

        result = list(zip(a, b))

        assert(result == [(1, 'a'), (2, 'b'), (3, 'c')])

    def test_reduct(self):
        a = [1, 2, 3]

        def reducer(acc, item):
            return acc + item

        result = reduce(reducer, a, 0)

        assert(result == 6)

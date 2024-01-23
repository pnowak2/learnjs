from functools import reduce

class TestAdvancedPythonFunctional:
    class TestPureFunctions:
        def test(self):
            def multiply_by2(lst):
                new_lst = []
                for item in lst:
                    new_lst.append(item * 2)

                return new_lst

            assert multiply_by2([1, 2, 3]) == [2, 4, 6]

    class TestMap:
        def test(self):
            def multiply_by2(item):
                return item * 2

            input = [1, 2, 3]
            output = list(map(multiply_by2, input))

            assert input == [1, 2, 3]
            assert output == [2, 4, 6]

    class TestFilter:
        def test(self):
            def is_even(item):
                return item % 2 == 0

            input = [1, 2, 3, 4, 5]
            output = list(filter(is_even, input))

            assert input == [1, 2, 3, 4, 5]
            assert output == [2, 4]

    class TestZip:
        def test(self):
            my_list = [1, 2, 3] # any iterable
            your_list = (10, 20, 30) # any iterable

            output = list(zip(my_list, your_list))
            assert output == [(1, 10), (2, 20), (3, 30)]

    class TestReduce:
        def test(self):
            def sum(acc, item):
                return acc + item

            input = [1, 2, 3, 4, 5]
            output = reduce(sum, input, 0)

            assert output == 15

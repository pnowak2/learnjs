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

    class TestLambdaExpressions:
        def test_lambda_map(self):
            input = [1, 2, 3]
            result = list(map(lambda item: item **2 , input))

            assert result == [1, 4, 9]

        def test_lambda_filter(self):
            input = [1, 2, 3, 4, 5]
            result = list(filter(lambda item: item % 2 == 0, input))

            assert result == [2, 4]

        def test_lambda_reduce(self):
            input = [1, 2, 3, 4, 5]
            result = reduce(lambda acc, item: acc + item, input)

            assert result == 15

        def test_sort_excercise(self):
            arr = [(0, 2), (4, 3), (10, -1), (9, 9)]
            arr.sort(key=lambda item: item[1])

            assert arr == [(10, -1), (0, 2), (4, 3), (9, 9)]

    class TestListComprehensions:
        def test(self):
            result = [item ** 2 for item in range(1, 5) if item % 2 == 0]
            assert result == [4, 16]

    class TestSetAndDictionaryComprehensions:
        def test_list(self):
            pass

        def test_dictionary(self):
            pass
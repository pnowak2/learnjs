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
            assert next(gen2) == 0
            assert next(gen2) == 1
            assert next(gen2) == 2
            assert next(gen2) == 3

            try:
                next(gen2)
            except StopIteration:
                pass

            gen3 = my_generator(5)
            assert gen3.__next__() == 0
            assert gen3.__next__() == 1
            assert gen3.__next__() == 2
            assert gen3.__next__() == 3
            assert gen3.__next__() == 4
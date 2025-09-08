import math

class TestPythonBasicsII:
    class TestConditionalLogic:
        class TestIf:
            def test_if_else(self):
                is_old = True
                is_licenced = True

                if is_old:
                    pass
                else:
                    assert(False)

                is_old = False

                if is_old:
                    assert(False)
                else:
                    pass

            def test_elif(self):
                is_old = True
                is_licenced = True

                if is_old:
                    pass
                elif is_licenced:
                    pass
                else:
                    assert(False)

            def test_and_or(self):
                is_old = True
                is_licenced = True

                if is_old and is_licenced:
                    pass
                else:
                    assert(False)

                is_licenced = False

                if is_old or is_licenced:
                    pass
                else:
                    assert(False)

            def test_or_fallback(self):
                result = False or 'default'

                assert(result == 'default')

            def test_truthy_falsy(self):
                assert(bool('5') is True)
                assert(bool('False') is True)
                assert(bool('') is False)
                assert(bool(0) is False)
                assert(bool(0j) is False)
                assert(bool(None) is False)
                assert(bool(()) is False)
                assert(bool([]) is False)
                assert(bool({}) is False)

        class TestTernaryOperator:
            def test(self):
                condition = True
                result = 'chop' if condition else 'baba'
                assert(result == 'chop')

                condition = False
                result = 'chop' if condition else 'baba'
                assert(result == 'baba')

        class TestShortCircuiting:
            def evaluate(self):
                raise RuntimeError() # never called

            def test(self, monkeypatch):
                assert((False or True) is True)
                assert((False and self.evaluate()) is False)

        class TestLogicalOperators:
            def test(self):
                assert((2 > 1) is True)
                assert((2 >= 2) is True)
                assert((2 < 3) is True)
                assert((3 <= 3) is True)
                assert((3 == 3) is True)
                assert(('hello' == 'hello') is True)
                assert(('hello' != 'ello') is True)

                assert(('a' > 'A') is True)
                assert((ord('A')) == 65)
                assert((ord('a')) == 97)

                assert(not(3 == 3) is False)


        class TestIsVsEquals:
            def test(self):
                # implicit type conversion is done first
                assert((True == 1) == True)
                assert(('' == 1) == False)
                assert(('1' == 1) == False)
                assert(([] == 1) == False)
                assert((10 == 10.0) == True)
                assert(([] == []) == True)

                # is location in memory also the same
                assert((True is 1) == False)
                assert(('' is 1) == False)
                assert(('1' is 1) == False)
                assert(([] is 1) == False)
                assert((10 is 10.0) == False)
                assert(([] is []) == False)

                lst = []
                lst2 = lst
                assert((lst is lst2) == True)

    class TestLoops:
        class TestForLoops:
            def test_string(self):
                result = ''

                for item in 'hello':
                    result += item + '-'

                assert(result == 'h-e-l-l-o-')

            def test_list(self):
                result = 0
                for item in [1, 2, 3]:
                    result += item

                assert(result == 6)
                assert(item == 3)

            def test_tuple(self):
                result = 0
                for item in (1, 2, 3):
                    result += item

                assert(result == 6)
                assert(item == 3)

            def test_set(self):
                result = 0
                for item in {1, 2, 3}:
                    result += item

                assert(result == 6)
                assert(item == 3)

        class TestIterables:
            def test_items_keys_values(self):
                user = {
                    'name': 'Piotr',
                    'age': 45,
                }

                items = list(user.items())
                assert(items == [('name', 'Piotr'), ('age', 45)])

                keys = list(user.keys())
                assert(keys == ['name', 'age'])

                values = list(user.values())
                assert(values == ['Piotr', 45])

            def test_items_keys_values(self):
                user = {
                    'name': 'Piotr',
                    'age': 45,
                }

                result = ''
                for key, value in user.items(): # returns array of tuples [(key, value)]
                    result += key + str(value)

                assert(result == 'namePiotrage45')

        class TestRange:
            def test_one_arg(self):
                result = list(range(5))
                assert(result == [0, 1, 2, 3, 4])

                sum = 0
                for i in range(4):
                    sum += i

                assert(sum == 6)

            def test_two_args(self):
                result = list(range(2, 6))
                assert(result == [2, 3, 4, 5])

            def test_three_args(self):
                result = list(range(2, 10, 2))
                assert(result == [2, 4, 6, 8])

                result = list(range(8, 2, -2))
                assert(result == [8, 6, 4])

        class TestEnumerate:
            # good when counter is needed for iterable
            def test(self):
                result = ''
                for index, char in enumerate('omg'):
                    result += f"{index}:{char},"

                assert(result == '0:o,1:m,2:g,')

            def test_enumerate_from_other_index(self):
                result = ''
                for index, char in enumerate('omg', 5):
                    result += f"{index}:{char},"

                assert(result == '5:o,6:m,7:g,')

        class TestWhileLoops:
            def test(self):
                result = ''
                i = 0
                while i < 5:
                    result += '-'
                    i += 1
                else:
                    result += 'done'

                assert(result == '-----done')

            def test_with_break(self):
                result = ''
                i = 0
                while i < 5:
                    result += '-'
                    i += 1

                    if i == 5:
                        break
                else:
                    result += 'done'

                assert(result == '-----')

            def test_duplicates(self):
                lst = [1, 2, 1, 3, 4, 3, 5, 6]

                dups = []
                for item in lst:
                    if lst.count(item) > 1 and item not in dups:
                        dups.append(item)

                assert(dups == [1, 3])


    class TestDeveloperFundamentalsIV:
        class TestFunctions:
            def test_declaration(self):
                def fun():
                    pass

                assert(fun() is None)

            def test_parameters_vs_arguments(self):
                def hello(name, emoji):
                    return f"hello {name} {emoji}"

                assert(hello('piotr', '😀') == 'hello piotr 😀')
                assert(hello(emoji='😀', name='bob') == 'hello bob 😀')

            def test_default_params_and_keyword_arguments(self):
                def hello(name = 'tom', emoji='😀'):
                    return f"hello {name} {emoji}"

                assert(hello('piotr') == 'hello piotr 😀')
                assert(hello() == 'hello tom 😀')
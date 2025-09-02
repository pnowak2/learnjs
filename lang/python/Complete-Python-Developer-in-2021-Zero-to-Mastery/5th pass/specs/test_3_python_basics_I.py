import math

class TestPythonBasics:
    class TestDataTypes:
        def test_fundamental_data_types(self):
            assert (type(1) is int)
            assert (type(1.0) is float)
            assert (type(True) is bool)
            assert (type('x') is str)
            assert (type([1, 2, 3]) is list)
            assert (type((1, 2, 3)) is tuple)
            assert (type({'a': 'b'}) is dict)

        def test_custom_types(self):
            class Car:
                pass

            assert  (type(Car()) is Car)

        def test_specialized_data_types(self):
            # things like imported types
            pass

        def test_none(self):
            nothing = None
            assert (nothing is None)

    class TestNumbers:
        def test_int_and_float(self):
            assert(2 + 4 == 6)
            assert(type(2 + 4) is int)

            assert(math.isclose(1.2*3, 3.6))
            assert(type(1.2 * 3) is float)
            assert(type(3 + 1.2) is float)

        def test_power(self):
            assert(3**3 == 27)

        def test_largest_integer(self):
            assert(4//3 == 1)
            assert(27//7 == 3)

        def test_modulo(self):
            assert(27%7 == 6)

    class TestMathFunctions:
        def test_math_functions(self):
            assert(math.sin(math.pi/2) == 1)
            assert(math.cos(math.pi) == -1)

            assert(round(2.1) == 2)
            assert(round(2.55) == 3)

            assert(abs(-5) == 5)

class TestDeveloperFundamentalsI:
    class TestOperators:
        def test(self):
            assert((20 - 3 * 4) == 8)

    class TestBinAndComples:
        def test_bin(self):
            assert(bin(5) == '0b101')
            assert(bin(7) == '0b111')
            
            assert(int('0b101', 2) == 5)

        def test_complex(self):
            assert(complex(1, 2) == 1 + 2j)

    class TestVariables:
        def test_declarations(self):
            user_id = 5
            _private_var = user_id

            assert(_private_var == 5)

        def test_constant(self):
            PI = 3.14 # convention only, still mutable

        def test_dunder(self):
            __loader__

    class TestExpressionsVsStatements:
        def test_expression(self):
            iq = 100 # statement
            user_age = iq / 5 # expression => entire line of code

    class TestAugmentedAssignmentOperator:
        def test(self):
            val = 3
            val += 2
            assert(val == 5)

    class TestStrings:
        class TestBasics:
            def test_str_types(self):
                assert(type('hi') is str)
                assert(type("hi") is str)
                assert(type('''hi''') is str)

            def test_multiline_str(self):
                user = '''
                        hi there!
                    '''
                assert(user.strip() == 'hi there!')

            def test_concat(self):
                first = 'piotr'
                last = 'nowak'

                full = first + ' ' + last
                assert(full == 'piotr nowak')

            def test_type_conversion(self):
                s = str(100)
                assert(type(s) is str)

                assert(s + str(5) == '1005') 
                assert(int('5') == 5)
                assert(float('5') == 5.0)

            def test_escape_sequence(self):
                weather = 'it\'s sunny'
                weather2 = "it's sunny \"today\""

                assert(weather == "it's sunny")
                assert(weather2 == '''it's sunny "today"''')
        
        class TestFormattedStrings:
            def test_fstrings(self):
                name = 'piotr'
                age = 45
                result = f'my name is {name} ({age})'

                assert(result == 'my name is piotr (45)')

            def test_old_way(self):
                name = 'piotr'
                age = 45
                result = 'my name is {} ({})'.format(name, age)

                assert(result == 'my name is piotr (45)')

            def test_old_way_with_order(self):
                name = 'piotr'
                age = 45
                result = 'my name is {1} ({0})'.format(name, age)

                assert(result == 'my name is 45 (piotr)')

            def test_old_way_with_names(self):
                name = 'piotr'
                age = 45
                result = 'my name is {a} ({n})'.format(n=name, a=age)

                assert(result == 'my name is 45 (piotr)')

        class TestStringIndexes:
            def test_slicing(self):
                name = 'hello world'

                # [start:end:step]

                assert(name[0] == 'h')
                assert(name[10] == 'd')
                assert(name[0:2] == 'he')
                assert(name[0:7] == 'hello w')

                assert(name[0:5:2] == 'hlo')

                assert(name[1:] == 'ello world')
                assert(name[:5] == 'hello')

                assert(name[::] == 'hello world')

                assert(name[-1] == 'd')
                assert(name[-3] == 'r')

                assert(name[::-1] == 'dlrow olleh')
                

        class TestImmutability:
            def test_strings_immutable(self):
                name = 'hello'
                try:
                    name[0] = '8' # illegal
                    assert None
                except TypeError:
                    pass

        class TestBuiltinFunctionsAndMethods:
            def test_len(self):
                assert(len('') == 0)
                assert(len('abc') == 3)
                assert(len('abc'[0:2]) == 2)

            def test_str_methods(self):
                name = 'hello world'

                assert(name.upper() == 'HELLO WORLD')
                assert(name.capitalize() == 'Hello world')
                assert(name.find('hello') == 0)
                assert(name.find('wo') == 6)
                assert(name.replace('wo', 'bo') == 'hello borld')
                assert(name == 'hello world') # immutable, not changed above

        class TestTypeConversion:
            def test(self):
                name = 'Piotr Nowak'
                age = 45
                relationship = 'single'
                relationship = 'married'

                birth_year = '1980'
                age = 2025 - int(birth_year) # need to convert str to int to avoid error
                assert(age == 45)

    class TestBooleans:
        def test(self):
            is_valid = True
            assert(is_valid is True)

            is_valid = False
            assert(is_valid is False)

            assert(bool(1) is True)
            assert(bool('True') is True)
            assert(bool('False') is True)

class TestDeveloperFundamentalsII:
    class TestPasswordChecker:
        def test(self):
            username = 'pnowak'
            passwd = 'pwd'
            masked_pwd = '*' * len(passwd)

            result = f'{username}, your password {masked_pwd} is {len(passwd)} chars long'

            assert(result == 'pnowak, your password *** is 3 chars long')

    class TestLists:
        def test_list_declaration(self):
            lst = [1, 2, 3]
            lst2 = ['a', 'b', 'c']
            lst3 = [1, 2, 'c', False]

        def test_cart(self):
            cart = ['notebooks', 'glasses']

            assert(cart[0] == 'notebooks')
            assert(cart[1] == 'glasses')

            try:
                cart[2]
                assert(False)
            except IndexError:
                pass

        def test_slicing(self):
            lst = [1, 2, 3, 4, 5]

            assert(lst[1:3] == [2, 3])
            assert(lst[:3] == [1, 2, 3])
            assert(lst[2:] == [3, 4, 5])
            assert(lst[::2] == [1, 3, 5])
            assert(lst[::-1] == [5, 4, 3, 2, 1])

        def test_mutable(self):
            lst = [1, 2, 3, 4, 5]

            lst[0] = 'a'

            assert(lst == ['a', 2, 3, 4, 5])

        def test_matrix(self):
            matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]

            assert(matrix[1][2] == 6)

        class TestListMethods:
            def test_append(self):
                lst = [1, 2, 3]

                assert(lst == [1, 2, 3])
                assert(len(lst) == 3)

                lst.append(4)

                assert(len(lst) == 4)
                assert(lst == [1, 2, 3, 4])

            def test_insert(self):
                lst = [1, 2, 3]
                lst.insert(1, 'a')

                assert(lst == [1, 'a', 2, 3])

            def test_extend(self):
                lst = [1, 2, 3]

                lst.extend(['a', 'b'])

                assert(lst == [1, 2, 3, 'a', 'b'])
                
            def test_pop(self):
                lst = ['a', 'b', 'c']

                idx = lst.pop()

                assert(lst == ['a', 'b'])
                assert(idx == 'c')

                idx = lst.pop(0)
                assert(lst == ['b'])
                assert(idx == 'a')

            def test_remove(self):
                lst = ['a', 'b', 'c']

                outcome = lst.remove('b')

                assert(lst == ['a', 'c'])
                assert(outcome is None)

            def test_clear(self):
                lst = ['a', 'b', 'c']

                lst.clear()

                assert(lst == [])

            def test_index(self):
                lst = ['a', 'b', 'c', 'd', 'b']

                assert(lst.index('b') == 1)
                assert(lst.index('b', 2) == 4)
                try:
                    assert(lst.index('b', 2, 3))
                    assert(False)
                except ValueError:
                    pass

            def test_in(self):
                lst = ['a', 'b', 'c', 'd', 'b']

                assert(('b' in lst) == True)
                assert(('z' in lst) == False)
                assert(('l' in 'hello') == True)

            def test_count(self):
                lst = ['a', 'b', 'c', 'd', 'b']

                assert(lst.count('b') == 2)

            def test_sort(self):
                lst = ['a', 'd', 'c', 'b', 'e']

                lst.sort()

                assert(lst == ['a', 'b', 'c', 'd', 'e'])

                lst.sort(reverse=True)

                assert(lst == ['e', 'd', 'c', 'b', 'a'])

            def test_sorted(self):
                lst = ['a', 'd', 'c', 'b', 'e']

                std = sorted(lst)

                assert(std == ['a', 'b', 'c', 'd', 'e'])
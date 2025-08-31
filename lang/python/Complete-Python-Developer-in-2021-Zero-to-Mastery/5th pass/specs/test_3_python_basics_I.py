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
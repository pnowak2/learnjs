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
        def test(self):
            user_id = 5
            _private_var = user_id

            assert(_private_var == 5)
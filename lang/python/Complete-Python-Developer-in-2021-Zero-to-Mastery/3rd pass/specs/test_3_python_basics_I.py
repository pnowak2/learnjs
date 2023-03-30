class TestDataTypes:
    def test_fundamental_data_types(self):
        int
        float
        bool
        str
        list
        tuple
        set
        dict

        # classes

        # specialized data types (packages/modules from libraries)
        # Modules

        None  # idea of zero, nothing


class TestNumbers:
    def test_types(self):
        assert type(4) is int
        assert type(3/2) is float
        assert type(1 is 2) is bool
        assert type(' ') is str
        assert type([1, 2, 3]) is list
        assert type(5 // 5) is int


class TestMathFunctions:
    def test_operators(self):
        assert 2 ** 3 is 8
        assert 5 // 4 is 1  # no decimals and returns an int
        assert 5 % 4 is 1

    def test_math_functions(self):
        assert round(5.4) is 5
        assert abs(-7) is 7


class TestBinAndComplex:
    def test_bin(self):
        assert bin(5) == '0b101'

    def test_convert_bin_to_int(self):
        assert(int('0101', 2)) == 5

    def test_complex(self):
        assert((1 + 3j) + (2 + 1j)) == 3 + 4j
        assert(complex(1, 3) + complex(2, 1)) == complex(3, 4)


class TestVariables:
    def test_var_init(self):
        iq = 190
        assert iq is 190

    def test_vars(self):
        user_iq = 190
        _user_iq = 190  # private
        user_iQ = 190
        user_age = user_iq / 4

    def test_constants(self):
        PI = 3.14

    def test_dunders(self):
        __builtins__
        __class__

    def test_mass(self):
        a, b, c = 1, 2, 3

        assert a is 1
        assert b is 2
        assert c is 3


class TestExpressionsVsStatements:
    def test(self):
        iq = 100  # statement
        user_age = iq / 5  # expression


class TestAugmentedAssignmentOperator:
    def test(self):
        some_value = 5
        some_value += 2
        assert some_value is 7


class TestStrings:
    def test(self):
        s1 = 'abc'
        s2 = "def"
        long_string = '''
        1 0 1
        0 1 0
        1 0 1 
        '''

        assert type(s1) is str
        assert type(s2) is str
        assert (s1 + s2) == 'abcdef'
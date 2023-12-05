class TestDataTypes:
    def test_fundamental_data_types(self):
        assert (type(1) is int)
        assert (type(2.5) is float)
        assert (type(True) is bool)
        assert (type("hell") is str)
        assert (type([1, 2, 3]) is list)
        assert (type({1, 2, 3}) is set)
        assert (type((1, 2, 3)) is tuple)
        assert (type({'a': 1, 'b': 2}) is dict)
        assert(type(2 + 3j) is complex)

        # classes => custom types
        # specialided data types => modules
        # None => nothing

    def test_binary(self):
        assert (type(bin(5)) is str)
        assert(bin(5) == "0b101")
        assert(int('0b101', 2) is 5)

class TestNumbers:
    def test_numbers(self):
        assert (type(2) is int)
        assert 2 * 2 is 4
        assert (type(2 / 4) is float)
        assert (type(10.56) is float)
        assert (type(20 + 0.1) is float)
        assert (type(9.9 + 0.1) is float)

    def test_power(self):
        assert(2**3) is 8

    def test_integer_rounded_down(self):
        assert(2 // 4) is 0
        assert(5 // 4) is 1
        assert(13 // 4) is 3 

    def test_modulo(self):
        assert(5 % 4) is 1

class TestMathFunctions:
    def test_round(self):
        assert (round(5.4) is 5)
        assert (round(5.6) is 6)

    def test_abs(self):
        assert abs(-5) is 5
        assert abs(5) is 5

class TestOperatorPrecedence:
    def test_precedence(self):
        # (), **, *, /, +, -
        assert (2 + 2 * 2) is 6

class TestVariables:
    def test_create_variable(self):
        iq = 190
        user_age = iq / 4
        user_id = 120
        _var_name = 'hi'

    def test_constant(self):
        PI = 3.14 # dont change me, only convention

    def test_dunder(self):
        __my_var = 5

    def test_multiple_assignment(self):
        a, b, c = 1, 2, 3
        assert a is 1
        assert b is 2
        assert c is 3

class TestExpressionsVsStatements:
    def test_expression(self):
        iq = 100
        user_age = iq / 5 # iq / is expression. whole line is a statement

class TestAugmentedAssignmentOperator:
    def test(self):
        someValue = 2
        someValue += 5

        assert someValue is 7


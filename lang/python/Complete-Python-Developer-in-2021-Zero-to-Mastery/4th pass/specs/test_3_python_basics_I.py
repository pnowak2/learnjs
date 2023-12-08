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

class TestString:
    def test_declaration(self):
        'hi hello'
        "hi hello"
        assert type("string") is str

        username = 'supercode'
        passwd = 'superpasword'

    def test_long_string(self):
        long_string = '''hello
                         world
                         how are
                         you'''

        assert type(long_string) is str

    def test_merging_strings(self):
        first = 'piotr'
        last = 'nowak'
        full = first + ' ' + last

        assert full == 'piotr nowak'

    def test_concatenation(self):
        assert 'hello' + ' piotr' == 'hello piotr'

class TestTypeConversion:
    def test(self):
        conv = str(100)
        assert conv == '100'
        assert type(conv) is str

class TestEscapeSequence:
    def test_escape_quote(self):
        weather = 'it\'s sunny'
        another = '''it's sunny'''
        assert weather == "it's sunny"
        assert another == "it's sunny"

    def test_other(self):
        weather = 'hello\tworld' # tab
        weather = 'hello\nworld' # new line

class TestFormattedStrings:
    def test_format_string_python3(self):
        name = 'pnowak'
        message = f'hello {name}'

        assert message == 'hello pnowak'

    def test_format_string_python2(self):
        name = 'pnowak'
        age = 43
        message = 'hello {0}, you are {1}'.format(name, age)

        assert message == 'hello pnowak, you are 43'

    def test_named_format_string_python2(self):
        message = 'hello {name}, you are {age}'.format(name='andrew', age=29)

        assert message == 'hello andrew, you are 29'

class TestStringIndexes:
    def test_indexes(self):
        msg = 'hello'

        assert msg[0] == 'h'
        assert msg[4] == 'o'

    def test_range(self):
        msg = 'hello'

        assert msg[1:3] == 'el'

    def test_range_with_stepover(self):
        msg = 'hello world'
        assert msg[0:len(msg):2] == 'hlowrd'
        assert msg[6:] == 'world' # no end index means till end
        assert msg[:6] == 'hello ' # no start index means till beginning
        assert msg[::1] == 'hello world'
        assert msg[::3] == 'hlwl'
        assert msg[-1] == 'd'
        assert msg[::-1] == 'dlrow olleh'

    def test_anatomy(self):
        # [start:stop:stepover]
        pass

class TestImmutability:
    def test(self):
        name = 'piotr'
        name = 100
        # name[0] = 'b' # immutable, cannot change it in python

class TestBuilInFunctionsAndMethods:
    def test_builtins(self):
        quote = 'hello'
        assert quote.upper() == 'HELLO'
        assert quote.capitalize() == 'Hello'
        assert 'HOME'.lower() == 'home'
        assert quote.find('lo') == 3
        assert quote.replace('lo', 'l yeah') == 'hell yeah'
        assert quote == 'hello'

class TestBooleans:
    def test_booleans(self):
        name = 'peter'
        is_auth = False
        is_auth = True

        assert is_auth is True
        assert bool(1) is True
        assert bool(0) is False

class TypeConversion:
    def test(self):
        pass
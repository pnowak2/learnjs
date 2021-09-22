class TestDataTypes:
    def test_fundamental_data_types(self):
        int()
        float()
        bool()
        str()
        list()
        tuple()
        set()
        dict()
    
    def test_custom_types(self):
        class SuperCar:
            pass

    def test_specialized_datatypes(self):
        # modules, libs
        pass

    def test_none_type(self):
        None # Nothing, idea of zero in math, absence of value

class TestNumbers:
    def test_type_fn(self):
        assert type(4) == int
        assert type(4 - 2) == int
        assert type(4 + 2) == int
        assert type(4 * 2) == int

        assert type(2 / 4) == float
        assert type(0.001) == float
        assert type(5.001) == float

        assert type(0) == int

        assert type(20 + 0.1) == float
        assert type(0.9 + 0.1) == float

    def test_int(self):
        assert (2 + 4) == 6
        assert (5 - 4) == 1
        assert (8 / 4) == 2
        assert (5 * 4) == 20

    def test_power(self):
        assert (2**3) == 8
        assert (3**3) == 27

    def test_floor_to_int(self):
        assert (2//3) == 0
        assert (7//3) == 2
        assert (20//3) == 6

    def test_modulo(self):
        assert (5 % 4) == 1
        assert (20 % 4) == 0
        assert (6 % 4) == 2

class TestMathFunctions:
    def test_round(self):
        assert round(3.1) == 3
        assert round(3.9) == 4
        assert round(3.5) == 4

    def test_abs(self):
        assert abs(-20) == 20

class TestDeveloperFundamentals_1:

    class TestOperatorPrecedence:
        def test_operator_precedence(self):
            assert (20 + 3 * 4) == 32
            assert (20 - 3 * 4) == 8 
            assert ((20 - 3) + 2**2) == 21 

            # 1. ()
            # 2. **
            # 3. * /
            # 3. + -

    class TestBinAndComplex:
        def test_complex(self):
            complex
            c = complex(2, 3) # (2 + 3i)
            assert c.real == 2
            assert c.imag == 3
        
        def test_bin(self):
            assert bin(5) == '0b101'
            assert bin(7) == '0b111'

        def test_hex(self):
            assert hex(15) == '0xf'
            assert hex(16) == '0x10'

        def test_convert_number_types_to_other_types(self):
            assert int('0b101', 2) == 5
            assert int('0b111', 2) == 7
            assert int('0xf', 16) == 15 

    class TestVariables:
        def test_vars(self):
            iq = 190
            user_id = 10 # snake case
            _private_var = 5 # private var (convention only)
            user_ID = 8 # case sensitive
            PI = 3.14 # constant, only convention

            # int, if, for, print, etc - reserved words, not for variables

            assert iq == 190

        def test_assignment(self):
            iq = 100
            age = iq / 4

            assert age == 25

        def test_dunder(self):
            __vari = 'test' # dont use for variables

        def test_multiple_assign(self):
            a, b, c = 1, 2, 3
            assert a == 1
            assert b == 2
            assert c == 3

    class TestExpressionsVsStatements:
        def test_expression(self):
            iq = 100 # statement
            iq = (iq / 5) # statement + expression in ()

    class TestAugmentedAssignOperator:
        def test(self):
            iq = 100
            iq += 5
            assert iq == 105
            iq -= 5
            assert iq == 100
            # and other
            iq *= 5
            iq /= 5

    class TestStrings:
        def test(self):
            'hi hello there'
            "hi hello there"
            assert (type("")) == str

        def test_multiline(self):
            long_str = '''
            Hello
            World
            '''

            assert type(long_str) == str

        def test_concat(self):
            first = 'piotr'
            last = 'nowak'
            full = first + last

            assert full == 'piotrnowak'

    class TestStringConcatenation:
        def test_plus(self):
            name = 'hello' + ' piotr'
            assert name == 'hello piotr'

        def test_only_strings(self):
            # name = 'hello' + 5 // illegal
            name = 'hello' + str(5)
            assert name == 'hello5'

    class TestTypeConversion:
        def test(self):
            nbr = str(100)
            assert type(nbr) == str
            assert nbr == '100'

            assert type(int(nbr)) == int
            assert int(nbr) == 100

    class TestEscapeSequences:
        def test_backslash(self):
            # weather = 'it's sunny' # Illegal
            weather = "it's sunny"
            # weather = "it's "kind of" sunny" # Illegal
            escape = 'It\'s sunny'

            assert escape == "It's sunny"

    class TestTabLineEtc:
        def test_backslash(self):
            escape = 'It\'s \t \n sunny'

    class TestFormattedStrings:
        def test_simple_format(self):
            name = 'Piotr'
            age = 41

            greet = 'hi ' + name + ' You are ' + str(age) + ' old';
            assert greet == 'hi Piotr You are 41 old'

        def test_f_string_format(self):
            name = 'Piotr'
            age = 41

            greet = f'hi {name}, you are {age} years old' # no conversions to str needed
            assert greet == 'hi Piotr, you are 41 years old'

        def test_python2_format(self):
            name = 'Piotr'
            age = 41

            greet ='hi {}, you are {} years old'.format(name, age)
            assert greet == 'hi Piotr, you are 41 years old'

        def test_python2_format_arg_order(self):
            name = 'Piotr'
            age = 41

            greet ='hi {1}, you are {0} years old'.format(name, age)
            assert greet == 'hi 41, you are Piotr years old'

        def test_python2_format_with_tuple_named_vars(self):
            name = 'Piotr'
            age = 41

            greet ='hi {name}, you are {age} years old'.format(name='pi', age=2)
            assert greet == 'hi pi, you are 2 years old'

    class TestStringIndexes:
        def test_index(self):
            str = 'hello'

            assert str[0] == 'h'
            assert str[4] == 'o'
            assert str[-1] == 'o'

        def test_index_format(self):
            # [start:stop:step]
            str = 'hello world'

            assert str[0:2] == 'he'
            assert str[0:3] == 'hel'
            assert str[0:5:2] == 'hlo'
            assert str[0::2] == 'hlowrd'
            assert str[1:] == 'ello world'
            assert str[:5] == 'hello'
            assert str[::-1] == 'dlrow olleh'
            assert str[::-2] == 'drwolh'

    class TestImmutability:
        def test(self):
            selfish = '0123456'
            # selfish[0] = '8' # illegal
            # cannot reassign part of string, rather create new string
            selfish += '8'
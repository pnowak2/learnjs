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
            complex(2, 3) # (2 + 3i)
        
        def test_bin(self):
            assert bin(5) == '0b101'
            assert bin(7) == '0b111'

        def test_convert_number_types_to_other_types(self):
            assert int('0b101', 2) == 5
            assert int('0b111', 2) == 7
            assert int('0xf', 16) == 15 
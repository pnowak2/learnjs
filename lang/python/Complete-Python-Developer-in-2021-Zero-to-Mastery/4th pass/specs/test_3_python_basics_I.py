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

        # classes => custom types
        # specialided data types => modules
        # None => nothing

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

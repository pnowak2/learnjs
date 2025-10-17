class TestErrorHandling:
    def test_try_except_catchall(self):
        try:
            10/0
            assert False 
        except:
            assert True

    def test_try_except(self):
        age: str = 'abc'
        try:
            int(age)
            assert False
        except ValueError:
            assert True

    def test_try_except_else(self):
        age: str = 5
        try:
            int(age)
            assert True
        except ValueError:
            assert True
        else:
            # executed only if no exceptions caught
            assert True

    def test_error_details(self):
        def sum(a, b):
            return a + b

        try:
            sum('a', 2)
            assert False
        except TypeError as err:
            assert True

    def test_handle_many_errors(self):
        def sum(a, b):
            return a + b

        try:
            sum(3, 2)
            5/0
            assert False
        except (TypeError, ZeroDivisionError):
            assert True

    def test_raise_error(self):
        try:
            raise Exception('boo')
        except Exception as err:
            assert True
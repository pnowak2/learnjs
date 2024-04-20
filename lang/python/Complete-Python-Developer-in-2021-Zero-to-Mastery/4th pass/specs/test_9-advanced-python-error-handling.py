class TestAdvancedPythonErrorHandling:
    class TestErrorsInPython:
        def test(self):
            try:
                1 + 'hello'
            except TypeError:
                pass

    class TestErrorHandling:
        def test_generic_error(self):
            try:
                age = int('a')
            except:
                assert True
            else:
                # if no errors, go here
                assert False

        def test_specific_error(self):
            try:
                5 / 0
            except ValueError:
                assert True
            except ZeroDivisionError:
                assert True
            else:
                assert False

    class TestMoreErrorHandling:
        def test_generic_error_bad_practice(self):

            def sum(num1, num2):
                try:
                    return num1 + num2
                except:
                    return None

            assert sum(1, 3) == 4
            assert sum('1', 3) is None

        def test_generic_error_better_practice(self):
            def sum(num1, num2):
                try:
                    return num1 + num2
                except TypeError as err:
                    return f'please enter numbers {err}'

            assert sum(1, 3) == 4
            assert  'please enter numbers' in sum('1', 3) 
            assert  'not "int"' in sum('1', 3) 

        def test_generic_error_wrap_few_errors(self):
            def divide(num1, num2):
                try:
                    return num1 / num2
                except (TypeError, ZeroDivisionError) as err:
                    return f'please enter numbers {err}'

            assert divide(6, 3) == 2
            assert  'please enter numbers' in divide('1', 3) 
            assert  'please enter numbers' in divide(1, 0) 

    class TestFinallyKeyword:
        def test_generic_error_wrap_few_errors(self):
            def divide(num1, num2):
                try:
                    return num1 / num2
                except (TypeError, ZeroDivisionError) as err:
                    return f'please enter numbers {err}'
                else:
                    pass
                finally:
                    # will be always called, no matter what, even for exceptions
                    pass
            
            divide(8, 3)

    class TestRaisingExceptions:
        def test(self):
            def fn():
                raise Exception('uh oh!')

            try:
                fn()
            except Exception:
                assert True
            else:
                assert False
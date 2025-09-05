import math

class TestPythonBasicsII:
    class TestConditionalLogic:
        class TestIf:
            def test_if_else(self):
                is_old = True
                is_licenced = True

                if is_old:
                    pass
                else:
                    assert(False)

                is_old = False

                if is_old:
                    assert(False)
                else:
                    pass

            def test_elif(self):
                is_old = True
                is_licenced = True

                if is_old:
                    pass
                elif is_licenced:
                    pass
                else:
                    assert(False)

            def test_and_or(self):
                is_old = True
                is_licenced = True

                if is_old and is_licenced:
                    pass
                else:
                    assert(False)

                is_licenced = False

                if is_old or is_licenced:
                    pass
                else:
                    assert(False)

            def test_or_fallback(self):
                result = False or 'default'

                assert(result == 'default')

            def test_truthy_falsy(self):
                assert(bool('5') is True)
                assert(bool('False') is True)
                assert(bool('') is False)
                assert(bool(0) is False)
                assert(bool(0j) is False)
                assert(bool(None) is False)
                assert(bool(()) is False)
                assert(bool([]) is False)
                assert(bool({}) is False)

        class TestTernaryOperator:
            def test(self):
                condition = True
                result = 'chop' if condition else 'baba'
                assert(result == 'chop')

                condition = False
                result = 'chop' if condition else 'baba'
                assert(result == 'baba')

        class TestShortCircuiting:
            def test(self):
                pass
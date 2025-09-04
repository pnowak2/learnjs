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
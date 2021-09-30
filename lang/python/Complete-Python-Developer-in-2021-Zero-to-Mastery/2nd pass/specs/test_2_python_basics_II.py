class TestConditionalLogic:
    def test_if_else(self):
        is_old = True

        if is_old:
            assert True
        else:
            assert False

    def test_if_else_elif(self):
        is_old = True
        is_licenced = False

        if is_licenced:
            assert False
        elif is_old:
            assert True
        else:
            assert False

    def test_if_and(self):
        is_old = True
        is_licenced = True

        if is_licenced and is_old:
            assert True
        else:
            assert False

class TestIndentation:
    def test_indentation(self):
        a = True
        b = False

        if a or b: # no ; semicolons like in other languages
            pass
        else:
            pass

class TestTruthyFalsy:
    def test(self):
        a = 5
        b = 'hi'

        assert bool(a) == True
        assert bool(b) == True
        assert bool('') == False
        assert bool(0) == False
        assert bool([]) == False
        assert bool(()) == False
        assert bool({}) == False
        assert bool(None) == False
        assert bool(False) == False

class TestTernaryOperator:
    def test(self):
        isOn = True
        assert ('yes' if isOn else 'no') == 'yes'

        isOn = False
        assert ('yes' if isOn else 'no') == 'no'

class TestShortCircuiting:
    def test(self):
        is_friend = False
        
        if True or is_friend: # short circuit, is_friend never checked
            pass

        if True and is_friend:
            pass

class TestLogicalOperators:
    def test(self):
        if 4 > 5: pass
        if 4 >= 5: pass
        if 4 < 5: pass
        if 4 <= 5: pass
        if 4 < 5 < 2: pass
        if 4 == 5: pass
        if 4 != 5: pass
        if 4 is not 5: pass
        if 4 is 5: pass
        if 4 and 5: pass
        if 4 or 5: pass
        if not False: pass
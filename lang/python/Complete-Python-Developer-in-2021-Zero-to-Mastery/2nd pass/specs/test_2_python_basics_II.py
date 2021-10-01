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

class TestExcerciseLogicalOperators:
    def test(self):
        is_magician = False
        is_expert = True

        if is_magician and is_expert:
            assert True
        elif is_magician and not is_expert:
            assert True
        elif not is_magician:
            assert True
        else:
            assert False

class TestIsVsDoubleEquals:
    def test_dbl_equals(self):
        assert True == 1
        assert True == bool(1)
        assert 10 == 10.0
        assert [1,2] == [1,2]
        # assert '' == 1 # no, empty string == True, nope

    def test_is(self): # check if location in memory is same
        assert (True is 1) == False
        assert (10 is 10.1) == False
        assert ([1,2] is [1,2]) == False

class TestForLoops:
    def test_string(self):
        result = ''
        for item in 'hello': # iterable
            result += item
        
        assert result == 'hello'

    def test_set(self):
        result = ''
        for item in {'h', 'e', 'l'}: # iterable
            result += item
        
        assert ''.join(sorted(list(result))) == 'ehl' # iteration on set has no order, thus list/sort/join trick

    def test_tuple(self):
        result = ''
        for item in ('h', 'e', 'l'): # iterable
            result += item
        
        assert ''.join(sorted(list(result))) == 'ehl' # iteration on set has no order, thus list/sort/join trick

    def test_list(self):
        result = ''
        for item in ['h', 'e', 'l']: # iterable
            result += item
        
        assert ''.join(sorted(result)) == 'ehl' # iteration on set has no order, thus list/sort/join trick

    def test_last_item_stored_into_var(self):
        for item in ['h', 'e', 'l']: # iterable
            pass

        assert item == 'l'

class TestIterables:
    def test_items_values_keys(self):
        # list, dictionary, tuple, set, string
        # can be iterated, one by one

        user = {
            'name': 'piotr',
            'age': 41,
            'canLearn': True
        }

        for prop in user:
            assert prop in user
            assert user[prop] in user.values()

        for key in user.keys():
            assert key in user

        for value in user.values():
            assert value in user.values()

        for key, value in user.items():
            assert key in user

    def test_items_values_keys(self):
        user = {
            'name': 'piotr',
            'age': 41,
            'canLearn': True
        }

        for key, value in user.items(): # tuples list, then destructurize each
            assert key in user
            assert value in user.values()

class TestTrickyCounterExcercise:
    def test(self):
        my_list = [1, 2, 3, 4, 5, 6, 7, 8]

        sum = 0
        for item in my_list:
            sum += item

        assert sum == 36

class TestRange:
    def test_what_is_range(self):
        type(range(5)) == range

        assert list(range(5)) == [0, 1, 2, 3, 4]

    def test_range_with_for(self):
        counter = 0
        for item in range(0, 4): # [0, 1, 2, 3]
            counter += item

        assert counter == 6

    def test_range_stepover(self):
        counter = 0
        for item in range(1, 8, 3): # [1, 4, 7]
            counter += item

        assert counter == 12

    def test_range_negative_stepover(self):
        counter = ''
        for item in range(10, 0, -1): # [1, 4, 7]
            counter += str(item)

        assert counter == '10987654321'

class TestEnumerate:
    def test(self):
        pass
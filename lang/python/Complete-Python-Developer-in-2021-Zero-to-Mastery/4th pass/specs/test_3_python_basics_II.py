class TestPythonBasicsII:
    class TestConditionalLogic:
        def test_if_else_elif_and(self):
            is_old = False
            is_licenced = True

            if is_old and is_licenced:
                assert True
            elif is_licenced:
                assert True
            else:
                assert False

    class TestIndentationInPython:
        def test(self):
            pass

    class TestTruthyVsFalsy:
        def test(self):
            a = 'hello'
            b = 5
            c = 0
            d = []
            e = {}
            f = ''
            g = ()

            assert (bool(a) is True)
            assert (bool(b) is True)
            assert (bool(c) is False)
            assert (bool(d) is False)
            assert (bool(e) is False)
            assert (bool(f) is False)
            assert (bool(g) is False)

            if(a and ~c):
                assert True
            else:
                assert False

    class TestTernaryOperator:
        def test(self):
            is_friend = True
            can_message = "message allowed" if is_friend else "not allowed"

            assert can_message == 'message allowed'

            is_friend = False
            can_message = "message allowed" if is_friend else "not allowed"

            assert can_message == 'not allowed'

    class TestShortCircuiting:
        def test(self):
            is_friend = True
            is_user = True

            assert(is_friend and is_user) == True
            assert(is_friend or is_user) == True  # is_user never checked

    class TestLogicalOperators:
        def test(self):
            is_friend = True
            is_user = True

            assert(is_friend and is_user) == True
            assert(is_friend or is_user) == True
            assert(not is_friend) == False
            assert(not(is_friend)) == False
            assert((4 > 5) == False)
            assert((4 >= 5) == False)
            assert((5 < 6) == True)
            assert((5 <= 6) == True)
            assert((4 == 5) == False)
            assert((4 != 5) == True)

    class TestIsVsDoubleEquals:
        def test_double_equals(self):
            assert((True == 1) == True)
            assert(('' == 1) == False)
            assert(('1' == 1) == False)
            assert(('1' == 1) == True)
            assert(([] == 1) == False)
            assert((10 == 10.0) == True)
            assert(([] == []) == True)
            assert(([1, 2, 3] == [1, 2, 3]) == True)

        def test_double_equals(self):
            assert((True is 1) == False)
            assert(('' is 1) == False)
            assert(('1' is 1) == False)
            assert(('1' is 1) == False)
            assert(([] is 1) == False)
            assert((10 is 10.0) == False)
            assert(([] is []) == False)
            assert(([1, 2, 3] is [1, 2, 3]) == False)

            lst = [1, 2, 3]
            assert((lst is lst) == True)
            assert(([1, 2, 3] is [1, 2, 3]) == False)

    class TestForLoops:
        def test_string(self):
            result = ''
            for item in 'Hello world':
                assert type(item) is str
                result += item

            assert result == 'Hello world'

        def test_list(self):
            result = ''
            for item in [1, 2, 3]:
                result += str(item)

            assert result == '123'

        def test_tuple(self):
            result = ''
            for item in (1, 2, 3):
                result += str(item)

            assert result == '123'

        def test_dict(self):
            result = ''
            for item in {'a': 1, 'b': 2, 'c': 3}:
                assert type(item) is str
                result += item

            assert result == 'abc'
            assert item == 'c'

    class TestIterables:
        def test_iterable_types(self):
            # list, dict, tuple, set, string..
            pass

        def test_dict_items_keys_values(self):
            user = {
                'name': 'Golem',
                'age': 5006,
                'can_swim': False
            }

            assert(list(user.items()) == [('name', 'Golem'), ('age', 5006), ('can_swim', False)])
            assert(user.keys() == {'name', 'age', 'can_swim'})
            assert(list(user.values()) == ['Golem', 5006, False])

        def test_unpacking(self):
            user = {
                'name': 'Golem',
                'age': 5006,
                'can_swim': False
            }

            for item in user.items():
                key, value = item
                assert user[key] is value

            # same as 

            for k, v in user.items():
                assert user[k] is v
                # becase unpacking works like thit

            key, value = ('foo', 'bar')
            assert key == 'foo'
            assert value == 'bar'

        def test_tricky_counter_excercise(self):
            lst = [1,2,3,4,5,6,7,8,9]

            sum = 0
            for item in lst:
                sum += item

            assert sum == 45

    class TestRange:
        def test_declaration(self):
            assert(list(range(5)) == [0, 1, 2, 3, 4])
            assert(list(range(1, 5)) == [1, 2, 3, 4])
            assert(list(range(1, 10, 2)) == [1, 3, 5, 7, 9]) # step as last param to range
            assert(list(range(10, 0, -1)) == [10,9,8,7,6,5,4,3,2,1])

        counter = 0
        def test_in_for_loops(self):
            counter = 0
            for _ in range(1, 5):
                counter += 1

            assert counter == 4
    class TestEnumarate:
        def test_declaration(self):
            text = 'hello'

            for idx, char in enumerate(text):
               assert text[idx] == char

        def test_excercise_index_of_50(self):
            index = None

            for i, n in enumerate(list(range(100))):
                if n == 50:
                    index = i

            assert index == 50 

    class TestWhileLoops:
        def test_break_loop(self):
            result = 0

            while True:
                result += 1
                if(result == 10):
                    break

            assert result == 10

        def test_condition(self):
            result = 0

            while result < 10:
                result += 1

            assert result == 10

        def test_while_else(self):
            result = 0
            counter = 0

            while counter < 10:
                counter += 1
            else: # called only once after all loops are done
                result += 1

            assert result == 1

        def test_while_else_with_break(self):
            result = 0
            counter = 0

            while counter < 10:
                counter += 1
                if counter == 3:
                    break
            else: # never called if break appeared in loop
                result += 1

            assert result == 0

        def test_while_vs_for(self):
            my_list = [1,2,3]
            for _ in my_list:
                pass

            i = 0
            while i < len(my_list): # when not sure how long i want to loop
                i += 1

            while True:
                # make some input('ask user..')
                response = 'bye'
                if response == 'bye':
                    break
                elif True:
                    continue # goes back to while / for loop / beginning
                else:
                    pass
class TestDeveloperFundamentalsIV:
    class TestFindDuplicates:
        def test(self):
            some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']
            dups = dict()
            dups_lst = []

            for item in some_list:
                if(some_list.count(item) > 1):
                    dups[item] = some_list.count(item)

                    if(item not in dups_lst):
                        dups_lst.append(item)

            
            assert dups == {
                'b': 2,
                'n': 2
            }

            assert dups_lst == ['b', 'n']

    class TestFunctions:
        def test(self):
            pass
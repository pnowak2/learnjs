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
        None  # Nothing, idea of zero in math, absence of value


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
            c = complex(2, 3)  # (2 + 3i)
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
            user_id = 10  # snake case
            _private_var = 5  # private var (convention only)
            user_ID = 8  # case sensitive
            PI = 3.14  # constant, only convention

            # int, if, for, print, etc - reserved words, not for variables

            assert iq == 190

        def test_assignment(self):
            iq = 100
            age = iq / 4

            assert age == 25

        def test_dunder(self):
            __vari = 'test'  # dont use for variables

        def test_multiple_assign(self):
            a, b, c = 1, 2, 3
            assert a == 1
            assert b == 2
            assert c == 3

    class TestExpressionsVsStatements:
        def test_expression(self):
            iq = 100  # statement
            iq = (iq / 5)  # statement + expression in ()

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

            greet = 'hi ' + name + ' You are ' + str(age) + ' old'
            assert greet == 'hi Piotr You are 41 old'

        def test_f_string_format(self):
            name = 'Piotr'
            age = 41

            # no conversions to str needed
            greet = f'hi {name}, you are {age} years old'
            assert greet == 'hi Piotr, you are 41 years old'

        def test_python2_format(self):
            name = 'Piotr'
            age = 41

            greet = 'hi {}, you are {} years old'.format(name, age)
            assert greet == 'hi Piotr, you are 41 years old'

        def test_python2_format_arg_order(self):
            name = 'Piotr'
            age = 41

            greet = 'hi {1}, you are {0} years old'.format(name, age)
            assert greet == 'hi 41, you are Piotr years old'

        def test_python2_format_with_tuple_named_vars(self):
            greet = 'hi {name}, you are {age} years old'.format(
                name='pi', age=2)
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

    class TestBuiltInFunctionsAndMethods:
        def test_len(self):
            assert len('hey') == 3
            assert len('hey'[2:]) == 1

        def test_methods(self):
            quote = 'to be'
            assert quote.upper() == 'TO BE'
            assert quote.capitalize() == 'To be'
            assert quote.find('be') == 3
            assert quote.replace('be', 'me') == 'to me'

    class TestBooleans:
        def test(self):
            bool('1'), True, False

            name = 'Piotr'
            is_cool = False
            assert is_cool == False
            is_cool = True
            assert is_cool == True

            assert bool(0) == False
            assert bool(1) == True
            assert bool('Yes') == True
            assert bool('No') == True
            assert bool('True') == True
            assert bool('False') == True

    class TestTypeConversions:
        def test(self):
            name = 'piotr'
            age = 41
            status = 'single'

            status = 'it\s complicated'

        def test_guess_age(self):
            year = '1980'
            age = f'your age is {2021 - int(year)}'

            assert age == 'your age is 41'


class TestDeveloperFundamentals_2:
    class TestComments:
        def test(self):
            name = 'piotr'  # comment

    class TestPasswordChecker:
        def test(self):
            username = 'pnowak'
            password = 'secret'

            password_hashed = '*' * len(password)

            result = f'Hey {username}, your password {password_hashed} is {len(password)} letters long'

            assert result == 'Hey pnowak, your password ****** is 6 letters long'

    class TestLists:
        def test(self):
            list = [1, 2, 3, 4, 5]
            list2 = ['a', 'b', 'c']
            list3 = [1, 'b', False]

        def test_data_structure(self):
            cart = ['books', 'pis']
            assert cart[0] == 'books'
            assert cart[1] == 'pis'
            assert len(cart) == 2

        def test_list_slicing(self):
            cart = ['a', 'b', 'c', 'd']
            assert cart[1:3] == ['b', 'c']
            assert cart[1::2] == ['b', 'd']

        def test_lists_are_mutable(self):
            cart = ['a', 'b', 'c', 'd']
            cart[0] = 'boo'
            assert cart == ['boo', 'b', 'c', 'd']

        def test_list_slicing_makes_new_list(self):
            cart = ['a', 'b', 'c', 'd']
            new_cart = cart[1:3]
            assert cart == ['a', 'b', 'c', 'd']
            assert new_cart == ['b', 'c']

        def test_list_copying(self):
            cart = ['a', 'b', 'c', 'd']
            new_cart = cart[:]
            assert cart == ['a', 'b', 'c', 'd']
            assert new_cart == ['a', 'b', 'c', 'd']
            assert cart is not new_cart

        def test_matrix(self):
            matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]

            assert matrix[0] == [1, 2, 3]
            assert matrix[1][1] == 5

        class TestListMethods:
            def test_len(self):
                cart = ['a', 'b', 'c', 'd']
                assert len(cart) == 4

            def test_append(self):
                cart = ['a', 'b', 'c', 'd']
                cart.append('e')  # mutable

                assert cart == ['a', 'b', 'c', 'd', 'e']

            def test_insert(self):
                cart = ['a', 'b', 'c']
                cart.insert(1, 'boo')  # mutable

                assert cart == ['a', 'boo', 'b', 'c']

            def test_extend(self):
                cart = ['a', 'b', 'c']
                cart.extend([1, 2])  # mutable

                assert cart == ['a', 'b', 'c', 1, 2]

            def test_pop(self):
                cart = ['a', 'b', 'c']

                itemPopped = cart.pop()
                assert cart == ['a', 'b']  # mutable
                assert itemPopped == 'c'

                cart = ['a', 'b', 'c']
                itemPopped = cart.pop(0)
                assert cart == ['b', 'c']

            def test_remove(self):
                cart = ['a', 'b', 'c']
                cart.remove('b')  # mutable
                assert cart == ['a', 'c']

            def test_clear(self):
                cart = ['a', 'b', 'c']
                cart.clear()  # mutable
                assert cart == []

            def test_index(self):
                cart = ['a', 'b', 'c']
                assert cart.index('b') == 1
                assert cart.index('c') == 2
                assert cart.index('b', 1, 2) == 1

            def test_in(self):
                cart = ['a', 'b', 'c']
                assert ('a' in cart) == True
                assert ('x' in cart) == False
                assert ('i' in 'hi there') == True

            def test_count(self):
                cart = ['a', 'b', 'c', 'b', 'd', 'b']
                assert cart.count('b') == 3
                assert cart.count('d') == 1

            def test_sort(self):
                cart = ['c', 'b', 'a']
                assert cart == ['c', 'b', 'a']
                cart.sort()  # mutable
                assert cart == ['a', 'b', 'c']

            def test_copy(self):
                cart = ['a', 'b', 'c']
                new_cart = cart.copy()
                assert cart == ['a', 'b', 'c']
                assert new_cart == ['a', 'b', 'c']
                assert cart is not new_cart

            def test_reverse(self):
                cart = ['a', 'b', 'c']
                assert cart == ['a', 'b', 'c']
                cart.reverse()
                assert cart == ['c', 'b', 'a']

            def test_sorted(self):
                cart = ['c', 'b', 'a']
                assert cart == ['c', 'b', 'a']

                cart_sorted = sorted(cart)  # makes sorted copy of list

                assert cart == ['c', 'b', 'a']
                assert cart_sorted == ['a', 'b', 'c']

        class TestCommonListPatterns:
            def test_reverse_with_index(self):
                cart = ['a', 'b', 'c']
                reversed = cart[::-1]  # makes a copy of the list
                assert reversed == ['c', 'b', 'a']

            def test_range(self):
                assert list(range(3)) == [0, 1, 2]
                assert list(range(1, 3)) == [1, 2]
                assert list(range(0, 3)) == [0, 1, 2]
                assert list(range(33, 37)) == [33, 34, 35, 36]

            def test_join(self):
                sentence = ' '

                joined = sentence.join(['hi', 'my name', 'is piotr'])
                assert joined == 'hi my name is piotr'

        class TestListUnpacking:
            def test_simple_unpack(self):
                a, b, c = [1, 2, 3]
                assert a == 1
                assert b == 2
                assert c == 3

            def test_unpack_with_rest(self):
                a, b, c, *rest = [1, 2, 3, 4, 5, 6]
                assert a == 1
                assert b == 2
                assert c == 3
                assert rest == [4, 5, 6]

            def test_unpack_with_rest_and_more(self):
                a, b, c, *rest, d = [1, 2, 3, 4, 5, 6]
                assert a == 1
                assert b == 2
                assert c == 3
                assert rest == [4, 5]
                assert d == 6

        class TestNone:
            def test_none(self):
                None  # special datatype, like null
                weapons = None
                assert weapons == None

    class TestDictionaries:
        def test_dict(self):
            dictionary = {
                'a': 1,
                'b': 2,
                'c': 3,
            }

            assert dictionary['b'] == 2

        def test_dict_any_values(self):
            dictionary = {
                'a': [1, 2],
                'b': 'piotr',
                'c': 3,
            }

            assert dictionary['a'] == [1, 2]
            assert dictionary['b'] == 'piotr'
            assert dictionary['c'] == 3

        def test_list_with_dict_any_values(self):
            lst = [{'a': 1, 'b': 2}, 'foo']

            assert lst[0] == {'a': 1, 'b': 2}
            assert lst[0]['b'] == 2
            assert lst[1] == 'foo'


class TestDeveloperFundamentals_3:
    class TestDictionaryKeys:
        def test_keys_have_to_be_unmutable(self):
            dictionary = {
                123: 1,
                True: 2,
                # [1, 2]: 3, # unhashable key, list can change!
            }

            assert dictionary[123] == 1
            assert dictionary[True] == 2

        def test(self):
            dictionary = {
                123: 1,
                123: 2,  # last one wins, overrides the previous one with same key
            }

            assert dictionary[123] == 2

    class TestDictionaryMethods:
        def test_get(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            # dic['baz'] # undefined key error!

            assert dic.get('baz') == None
            # provide default value
            assert dic.get('baz', 'default') == 'default'

        def test_get(self):
            usr = dict(name='piotr', age=41)

            assert usr['name'] == 'piotr'
            assert usr['age'] == 41

        def test_in(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            assert ('foo' in dic) == True
            assert ('baz' in dic) == False

        def test_keys(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            assert ('foo' in dic.keys()) == True  # dictionary view object
            assert list(dic.keys()) == ['foo', 'bar']

        def test_values(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            assert ([1, 2, 3] in dic.values()) == True
            assert list(dic.values()) == [[1, 2, 3], 'hello']

        def test_items(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            # assert dic.items() == [('foo', [1, 2, 3]), ('bar', 'hello')]

        def test_clear(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            dic.clear()
            assert dic == {}

        def test_copy(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            copied = dic.copy()
            dic.clear()

            assert dic == {}
            assert copied == {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

        def test_pop(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            item = dic.pop('bar')

            assert item == 'hello'
            assert dic == {
                'foo': [1, 2, 3]
            }

        def test_popitem(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            item = dic.popitem()

            assert item == ('bar', 'hello')
            assert dic == {
                'foo': [1, 2, 3]
            }

        def test_update(self):
            dic = {
                'foo': [1, 2, 3],
                'bar': 'hello'
            }

            dic.update({
                'foo': 'boo'
            })

            assert dic == {
                'foo': 'boo',
                'bar': 'hello'
            }

    class TestTuples:
        def test_tuple(self):
            # immutable list
            tpl = (1, 2, 3)
            assert tpl[0] == 1
            # tpl[0] = 'boo' # can't change it!

        def test_tuple_as_valid_dict_key(self):
            dic = {
                (1, 2): 'boo' # tuple is immutable, so can be a key, list is not though.
            }

            assert dic[(1, 2)] == 'boo'

        def test_slice_tuple(self):
            tpl = (1, 2, 3, 4, 5)
            assert tpl[2:4] == (3, 4)

        def test_destructure_tuple(self):
            tpl = (1, 2, 3, 4, 5)
            x, y, *z = tpl

            assert x == 1
            assert y == 2
            assert z == [3, 4, 5]

        def test_tuple_count(self):
            tpl = (1, 2, 2, 2, 5)
            assert tpl.count(2) == 3
            
        def test_tuple_index(self):
            tpl = (1, 2, 3, 4, 5)
            assert tpl.index(3) == 2

        def test_tuple_len(self):
            tpl = (1, 2, 3, 4, 5)
            assert len(tpl) == 5

    class TestSets: # unordered collections of unique items
        def test(self):
            my_set = { 1, 2, 2, 3, 4 ,5, 5}
            assert type(my_set) == set
            assert my_set == { 1, 2, 3, 4 ,5}

        def test_add(self):
            my_set = { 1, 2, 3, 4 ,5}
            my_set.add(6)

            assert my_set == { 1, 2, 3, 4 ,5, 6}

        def test_convert_dup_list_to_set(self):
            lst = { 1, 2, 2, 3, 3, 4 ,5}
            st = set(lst)
            assert st == { 1, 2, 3, 4 ,5}

        def test_in_set(self):
            my_set = { 1, 2, 3, 4 ,5}
            assert (2 in my_set) == True

        def test_len_set(self):
            my_set = { 1, 2, 3, 4 ,5}
            assert len(my_set) == 5

        def test_set_to_list(self):
            my_set = { 1, 2, 3, 4 ,5}
            lst = list(my_set)
            assert lst == [1, 2, 3, 4 ,5]

        def test_set_copy(self):
            my_set = { 1, 2, 3, 4 ,5}
            copied = my_set.copy()
            my_set.clear()

            assert copied == { 1, 2, 3, 4 ,5 }
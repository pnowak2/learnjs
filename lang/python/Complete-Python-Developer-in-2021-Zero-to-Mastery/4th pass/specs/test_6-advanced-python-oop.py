class TestAdvancedPythonOOP:
    class TestWhatIsOOP:
        class BigObject:
            pass

        obj1 = BigObject() # () instantiate
        obj2 = BigObject() # () instantiate
        obj3 = BigObject() # () instantiate

        def test(self):
            assert type(self.obj1) == self.BigObject

    class TestCreatingOwnObjects:
        class PlayerCharacter:
            def __init__(self, name, age):
                self.name = name
                self.age = age

            def run(self):
                return 'run'

        player1 = PlayerCharacter('peter', 43)
        player2 = PlayerCharacter('tom', 62)

        player1.attack = 50

        def test(self):
            assert self.player1.name == 'peter'
            assert self.player1.age == 43
            assert self.player1.run() == 'run'

            assert self.player2.name == 'tom'
            assert self.player2.age == 62 
            assert self.player2.run() == 'run'

            assert self.player1.attack == 50
            # player2 has no attack, error when using it

    class TestAttributesAndMethods:
        class Player:
            # class object / static
            membership = True

            def __init__(self, name, age):
                if(self.membership):
                    self.name = name
                    self.age = age

            def shout(self, speed='medium'):
                return f'my name is {self.name}, and i am {speed}'

        p1 = Player('peter', 43)
        p2 = Player('david', 24)
            
        def test_static(self):
            assert self.Player.membership is True
            assert self.p1.membership is True
            assert self.p2.membership is True

            self.Player.membership = False

            assert self.Player.membership is False
            assert self.p1.membership is False
            assert self.p2.membership is False

        def test_method(self):
            assert self.p1.shout('fast') == 'my name is peter, and i am fast'

    class TestInit:
        class Player:
            def __init__(self, name='none', age=0):
                if age >= 18:
                    self.name = name
                    self.age = age

        p1 = Player('tom', 18)

        def test(self):
            assert self.p1.name == 'tom'

    class TestClassMethod:
        class Player:
            def __init__(self, name='none', age=0):
                if age >= 18:
                    self.name = name
                    self.age = age

            @classmethod
            def add(Clazz, num1, num2):
                obj = Clazz()
                assert type(obj) is Clazz

                return num1 + num2

        p1 = Player('tom', 18)

        def test(self):
            assert self.Player.add(1,6) == 7
            assert self.p1.add(1,6) == 7

    class TestStaticMethod:
        class Player:
            def __init__(self, name='none', age=0):
                if age >= 18:
                    self.name = name
                    self.age = age

            @staticmethod
            def add(num1, num2):
                return num1 + num2

        p1 = Player('tom', 18)

        def test(self):
            assert self.Player.add(1,6) == 7
            assert self.p1.add(1,6) == 7

    class TestEncapsulation:
        class Player:
            def __init__(self, name, age):
                self.name = name
                self.age = age

            def speak(self):
                return f'{self.name} {self.age}'

        p1 = Player('tom', 18)

        def test(self):
            assert self.p1.speak() == 'tom 18'

    class TestAbstraction:
        class Player:
            def __init__(self, name, age):
                self.name = name
                self.age = age

            def speak(self):
                return f'{self.name} {self.age}'

        p1 = Player('tom', 18)

        def test(self):
            assert self.p1.speak() == 'tom 18'

    class TestPrivateVsPublicVariables:
        class Player:
            def __init__(self, name, age):
                self._name = name
                self._age = age

            def speak(self):
                return f'{self._name} {self._age}'

        p1 = Player('tom', 18)

        def test(self):
            assert self.p1.speak() == 'tom 18'

    class TestInheritance:
        class Player:
            def __init__(self, name, age):
                self._name = name
                self._age = age

            def speak(self):
                return f'{self._name} {self._age}'

        p1 = Player('tom', 18)

        def test(self):
            assert self.p1.speak() == 'tom 18'
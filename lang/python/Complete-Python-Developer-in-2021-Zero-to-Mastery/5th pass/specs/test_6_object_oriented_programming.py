class TestObjectOrientedProgramming:
    def test_declare_class_instantiate_object(self):
        class BigObject:
            pass

        # object
        b = BigObject()

        assert(type(b) == BigObject)

    def test_creating_own_objects(self):
        class PlayerCharacter:
            def __init__(self, name, age):
                self.name = name
                self.age = age

            def run(self):
                return 'run'

        player1 = PlayerCharacter('piotr', 45)
        player2 = PlayerCharacter('tom', 40)

        assert(player1.name == 'piotr')
        assert(player1.age == 45)
        assert(player1.run() == 'run')

        assert(player1 is not player2)

        
    def test_attributes_and_methods(self):
        class PlayerCharacter:
            # class object
            membership = True

            def __init__(self, name, age):
                self.name = name
                self.age = age

            def run(self):
                return 'run'

            def shout(self):
                return f'I\'m {self.name}'

        player1 = PlayerCharacter('piotr', 45)
        player2 = PlayerCharacter('tom', 40)

        assert(PlayerCharacter.membership is True)
        assert(player1.membership is True)
        assert(player2.membership is True)

        PlayerCharacter.membership = False

        assert(PlayerCharacter.membership is False)
        assert(player1.membership is False)
        assert(player2.membership is False)

        assert(player1.shout() == '''I'm piotr''')

    def test_init(self):
        class PlayerCharacter:
            # class object
            membership = True

            def __init__(self, name='anonymous', age=0):
                self.name = name
                self.age = age

            def run(self):
                return 'run'

            def shout(self):
                return f'I\'m {self.name}'

        player1 = PlayerCharacter()
        assert(player1.name == 'anonymous')
        assert(player1.age == 0)

    def test_classmethod_static_method(self):
        class PlayerCharacter:
            # class object
            membership = True

            def __init__(self, name='anonymous', age=0):
                self.name = name
                self.age = age

            def run(self):
                return 'run'

            def shout(self):
                return f'I\'m {self.name}'

            @classmethod
            def adding_things(Clazz, num1, num2):
                return num1 + num2

            @classmethod
            def make(Clazz, num1, num2):
                return Clazz(name = 'bob', age = num1 + num2)

            @staticmethod
            def add(num1, num2):
                return num1 + num2

        result = PlayerCharacter.adding_things(2, 5)

        assert(result == 7)

        clazzPlayer = PlayerCharacter.make(40, 3)

        assert(type(clazzPlayer is PlayerCharacter))
        assert(clazzPlayer.name == 'bob')
        assert(clazzPlayer.age == 43)


        assert(clazzPlayer.add(2, 7) == 9)

class TestDeveloperFundamentalsV:
    def test_encapsulation(self):
        pass
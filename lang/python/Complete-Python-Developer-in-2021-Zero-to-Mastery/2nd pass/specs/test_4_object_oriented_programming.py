class TestObjectOrientedProgramming:
    class TestWhatsOOP:
        def test(self):
            class BigObject:
                pass

            obj1 = BigObject()
            obj2 = BigObject()

            assert type(obj1) == BigObject
            assert type(obj2) == BigObject

    class TestCreatingOwnObjects:
        def test(self):
            class PlayerCharacter:
                def __init__(self, name):
                    '''
                    Constructor
                    '''
                    self.name = name

                def run(self):
                    '''
                    Method
                    '''
                    return 'run'

            player1 = PlayerCharacter('piotr')
            player1.attack = 50

            player2 = PlayerCharacter('domi')
            player2.attack = 30

            assert type(player1) == PlayerCharacter
            assert player1.name == 'piotr'
            assert player1.run() == 'run'

            assert player2.name == 'domi'

    class TestAttributesAndMethods:
        def test_class_object_attribute(self):
            class PlayerCharacter:
                membership = True

                def __init__(self, name):
                    self.name = name

                def run(self):
                    return 'run'

                def shout(self):
                    return f'my name is {self.name}'

            player1 = PlayerCharacter('piotr')

            assert PlayerCharacter.membership == True
            assert player1.membership == True

            assert player1.shout() == 'my name is piotr'

    class Test__init__:
        def test(self):
            class PlayerCharacter:
                membership = True

                def __init__(self, name='anonymous', age=2):
                    self.name = name
                    self.age = age

                def run(self):
                    return 'run'

                def shout(self):
                    return f'my name is {self.name}'

            assert PlayerCharacter().name == 'anonymous'
            assert PlayerCharacter().age == 2

    class TestClassMethodAndStaticMethod:
        def test(self):
            class PlayerCharacter:
                membership = True

                # got access to class method
                @classmethod
                def adding_things(cls, num1, num2):
                    return num1 + num2

                # got access to class method
                @classmethod
                def make(cls, name, age):
                    return cls(name, age)

                # NO access to class method
                @staticmethod
                def do(num1, num2):
                    return num1 + num2
                

                def __init__(self, name='anonymous', age=2):
                    self.name = name
                    self.age = age

                def run(self):
                    return 'run'

                def shout(self):
                    return f'my name is {self.name}'

            assert PlayerCharacter.adding_things(2, 4) == 6
            assert PlayerCharacter.do(3, 4) == 7

            p = PlayerCharacter.make('piotr', 41)
            assert type(p) == PlayerCharacter
            assert p.name == 'piotr'
            assert p.age == 41

class TestDeveloperFundamentals_5:
    class TestEncapsulation:
        def test(self):
            pass
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

    class TestEncapsulation:
        def test(self):
            class PlayerCharacter:
                def __init__(self, name, age):
                    self.name = name
                    self.age = age

                def run(self):
                    return 'run'

                def speak(self):
                    return f'I am {self.name} and {self.age} years old'

            p = PlayerCharacter('piotr', 41)
            assert p.speak() == 'I am piotr and 41 years old'

    class TestPrivateVsPublicVariables:
        def test(self):
            # no true way to do it, just naming convention
            class Player:
                def __init__(self, name, age):
                    self._name = name
                    self._age = age

                def run(self):
                    return 'run'

                def speak(self):
                    return f'I am {self._name} and {self._age} years old'

            p = Player('piotr', 41)
            assert p.speak() == 'I am piotr and 41 years old'

    class TestInheritance:
        def test(self):
            class User:
                def signin(self):
                    return 'logged in'

            class Wizard(User):
                def __init__(self, name, power):
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            class Archer(User):
                def __init__(self, name, arrows):
                    self.name = name
                    self.arrows = arrows

                def attack(self):
                    return f'attacking with arrows, left {self.arrows}'

            w = Wizard('rince', 10)
            assert w.signin() == 'logged in'
            assert w.attack() == 'attacking with power of 10'

            a = Archer('legolas', 5)
            assert a.signin() == 'logged in'
            assert a.attack() == 'attacking with arrows, left 5'

    class TestInheritance2:
        def test_isinstance(self):
            class User:
                def signin(self):
                    return 'logged in'

            class Wizard(User):
                def __init__(self, name, power):
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            class Archer(User):
                def __init__(self, name, arrows):
                    self.name = name
                    self.arrows = arrows

                def attack(self):
                    return f'attacking with arrows, left {self.arrows}'

            w = Wizard('rince', 10)
            assert type(w) == Wizard
            assert isinstance(w, Wizard) == True

            a = Archer('legolas', 5)
            assert type(a) == Archer
            assert isinstance(a, Archer) == True

            assert type(w) != User
            assert isinstance(w, User) == True

        def test_issubclass(self):
            class User:
                def signin(self):
                    return 'logged in'

            class Wizard(User):
                def __init__(self, name, power):
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            w = Wizard('rince', 10)
            assert issubclass(Wizard, User) == True
            assert issubclass(Wizard, object) == True

        def test_all_inherit_from_object(self):
            class User:
                def signin(self):
                    return 'logged in'

            class Wizard(User):
                def __init__(self, name, power):
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            w = Wizard('rince', 10)
            assert isinstance(w, object) == True

    class TestPolymorphism:
        def test(self):
            class User:
                def signin(self):
                    return 'logged in'

                def attack(self):
                    return 'do nothing'

            class Wizard(User):
                def __init__(self, name, power):
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            class Archer(User):
                def __init__(self, name, arrows):
                    self.name = name
                    self.arrows = arrows

                def attack(self):
                    return f'attacking with arrows, left {self.arrows}'

            u = User()
            w = Wizard('merlin', 60)
            a = Archer('robin', 30)

            def player_attack(p):
                return p.attack()
            
            assert player_attack(u) == 'do nothing'
            assert player_attack(w) == 'attacking with power of 60'
            assert player_attack(a) == 'attacking with arrows, left 30'

            for p in [u, a, w]:
                p.attack()

            
    class TestSuper:
        def test(self):
            class User:
                def __init__(self, email):
                    self.email = email

                def signin(self):
                    return 'logged in'

                def attack(self):
                    return 'do nothing'

            class Wizard(User):
                def __init__(self, name, power, email):
                    User.__init__(self, email)
                    # or using super, more versatile
                    super().__init__(email) # no need to pass self
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            w = Wizard('merlin', 60, "test@gmail.com")
            assert w.email == 'test@gmail.com'

    class TestObjectIntrospection:
        def test(self):
            class User:
                def __init__(self, email):
                    self.email = email

                def signin(self):
                    return 'logged in'

                def attack(self):
                    return 'do nothing'

            class Wizard(User):
                def __init__(self, name, power, email):
                    super().__init__(email) # no need to pass self
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            w = Wizard('merlin', 60, "test@gmail.com")

            # dif provides list of all methods and properties
            assert type(dir(w)) == list
            assert 'email' in dir(w)
            assert 'signin' in dir(w)
            assert 'attack' in dir(w)
            assert '__init__' in dir(w)

    class TestDunderMethods:
        def test_default_str(self):
            class Toy():
                def __init__(self, color, age):
                    self.color = color
                    self.age = age

            figure = Toy('red', 0)
            assert '<test' in figure.__str__()

        def test_own_dunder_methods(self):
            class Toy():
                def __init__(self, color, age):
                    self.color = color
                    self.age = age

                def __str__(self):
                    return f'{self.color} - {self.age}'

                def __len__(self):
                    return self.age

                def __del__(self):
                    print('deleted!')

                def __call__(self):
                    return f'called me {self.color} ?'

                def __getitem__(self, i):
                    return self.color[i]

            figure = Toy('red', 0)
            assert figure.__str__() == 'red - 0'
            assert len(figure) == 0
            assert figure() == 'called me red ?'
            assert figure[2] == 'd'

            del(figure)

        def test_excercise_superlist(self):
            class SuperList(list):
                def __len__(self):
                    return 1000

            lst = SuperList()
            lst.append(1)
            lst.append(2)
            lst.append(3)
            lst.append(10)

            assert lst[2] == 3
            assert lst[3] == 10 
            assert len(lst) == 1000
            
    class TestMultipleInheritance:
        def test(self):
            class User:
                def signin(self):
                    return 'logged in'

                def attack(self):
                    return 'do nothing'

            class Wizard(User):
                def __init__(self, name, power):
                    self.name = name
                    self.power = power

                def attack(self):
                    return f'attacking with power of {self.power}'

            class Archer(User):
                def __init__(self, name, arrows):
                    self.name = name
                    self.arrows = arrows

                def attack(self):
                    return f'attacking with arrows, left {self.arrows}'

                def run(self):
                    return 'runs really fast'

                def check_arrows(self):
                    return self.arrows

            class HybridBorg(Wizard, Archer):
                def __init__(self, name, power, arrows):
                    Wizard.__init__(self, name, power)
                    Archer.__init__(self, name, arrows)

            hb = HybridBorg('borgie', 50, 21)

            assert hb.run() == 'runs really fast'
            assert hb.check_arrows() == 21
            assert hb.signin() == 'logged in' 

    class TestMethodResolutionOrder_MRO:
        def test(self):
            class A:
                num = 10
            class B(A):
                pass
            class C(A):
                num = 1
            class D(B, C):
                pass

            assert D.num == 1
            D.mro()

    class TestWithStatement:
        def test(self):
            class Person(object):
                def __init__(self, n):
                    self.name = n
                    pass

                def get_name(self):
                    return self.name

                def __enter__(self):
                    return self

                def __exit__(self, type, exception_value, traceback):
                    self.name += '-closed'

            p = Person('Piotr')

            assert p.get_name() == 'Piotr'

            with p as prn:
                assert prn.get_name() == 'Piotr'

            assert prn.get_name() == 'Piotr-closed'

            

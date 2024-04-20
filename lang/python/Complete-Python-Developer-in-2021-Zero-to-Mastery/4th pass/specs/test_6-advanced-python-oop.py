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
        class User:
            def sign_in(self):
                return 'login'

        class Wizard(User):
            def __init__(self, name, power):
                self.name = name
                self.power = power
            
            def attack(self):
                return f"attacking with power of {self.power}"

        class Archer(User):
            def __init__(self, name, num_arrows):
                self.name = name
                self.num_arrows = num_arrows
            
            def attack(self):
                return f"attacking with arrows {self.num_arrows}"

        wizard = Wizard("peter", 43)
        archer = Archer("john", 6)

        def test(self):
            assert isinstance(self.wizard, object)
            assert isinstance(self.wizard, self.User)
            assert isinstance(self.archer, self.User)
            assert isinstance(self.wizard, self.Wizard)
            assert isinstance(self.archer, self.Archer)

            assert self.wizard.sign_in() == 'login'
            assert self.archer.sign_in() == 'login'
            assert self.wizard.attack() == 'attacking with power of 43'
            assert self.archer.attack() == 'attacking with arrows 6'

    class TestPolymorphism:
        class User:
            def sign_in(self):
                return 'login'

            def attack(self):
                return 'no action'
        class Wizard(User):
            def attack(self):
                return 'wizard attack'

        class Archer(User):
            def attack(self):
                return 'archer attack'

        def player_attack(self, character: User):
            return character.attack()

        def test(self):
            archer = self.Archer();
            wizard = self.Wizard();

            assert self.player_attack(self.User()) == 'no action'
            assert self.player_attack(archer) == 'archer attack'
            assert self.player_attack(wizard) == 'wizard attack'

            result = []
            for character in [archer, wizard, self.User()]:
                result.append(character.attack())

            assert ",".join(result) == 'archer attack,wizard attack,no action'

    class TestSuper:
        class User:
            def __init__(self, email):
                self.email = email

            def sign_in(self):
                return 'login'

            def attack(self):
                return 'no action'

        class Wizard(User):
            def __init__(self, email):
                super().__init__(email)

            def attack(self):
                return 'wizard attack'

        class Archer(User):
            def __init__(self, email):
                super().__init__(email)

            def attack(self):
                return 'archer attack'

        def test(self):
            archer = self.Archer('archer mail');
            wizard = self.Wizard('wizard mail');

            assert archer.email == 'archer mail'
            assert wizard.email == 'wizard mail'

    class TestIntrospection:
        class User:
            def __init__(self, email):
                self.email = email

            def sign_in(self):
                return 'login'

            def attack(self):
                return 'no action'

        class Wizard(User):
            def __init__(self, email):
                super().__init__(email)

            def attack(self):
                return 'wizard attack'


        def test(self):
            wizard = self.Wizard('wizard mail')

            assert "sign_in" in dir(wizard)

    class TestDunderMethods:
        class Toy:
            def __init__(self, color, age):
                self.color = color
                self.age = age

            def __str__(self) -> str:
                return f"Toy({self.color},{self.age})"

            def __len__(self):
                return len(str(self))

            def __del__(self):
                return 'deleted'

            def __call__(self):
                return f'called {self.color}'

            def __getitem__(self, i):
                return self.color[i]
                

        figure = Toy('red', 5)

        def test(self):
            assert str(self.figure) == 'Toy(red,5)'
            assert self.figure.__str__() == 'Toy(red,5)'
            assert len(self.figure) == 10
            assert(self.figure() == 'called red')
            assert self.figure[2] == 'd'

            # del self.figure

    class TestSuperList:
        class SuperList(list):
            def __len__(self):
                return 1000 + super().__len__()

        super_list = SuperList()
        super_list.append(5)

        def test(self):
            assert len(self.super_list) == 1001
            assert issubclass(list, object)
            assert issubclass(self.SuperList, object)
            assert issubclass(self.SuperList, list)
            assert isinstance(self.super_list, list)

    class TestMultipleInheritance:
        class User:
            def __init__(self, email):
                self.email = email

            def sign_in(self):
                return 'login'

            def attack(self):
                return 'no action'

        class Wizard(User):
            def __init__(self, email):
                super().__init__(email)

            def attack(self):
                return 'wizard attack'

        class Archer(User):
            def __init__(self, email):
                super().__init__(email)

            def attack(self):
                return 'archer attack'

        class HybridBorg(Archer, Wizard,):
            def __init__(self, email):
                super().__init__(email)
                # normally work but here in tests those are not accessible for whatever reason.
                # Archer.__init(...)
                # Wizard.__init(...)

        def test(self):
            borg = self.HybridBorg('borg mail')
            assert borg.email == 'borg mail'
            assert borg.attack() == 'archer attack'

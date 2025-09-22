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
        class Player:
            def __init__(self, name, age):
                self.name = name
                self.age = age

            def run(self):
                return 'run'

            def speak(self):
                return f'Hi, I\'m {self.name}'

        player1 = Player('piotr', 45)
        assert(player1.speak() == '''Hi, I'm piotr''')

    def test_private_vs_public_vars(self):
        class Player:
            def __init__(self, name, age):
                # only naming convention, not enforced by python
                self._name = name
                self._age = age

            def get_name(self):
                return self._name

            def get_age(self):
                return self._age

        p1 = Player('piotr', 45)
        assert(p1.get_name() == 'piotr')
        assert(p1.get_age() == 45)

class TestDeveloperFundamentalsV:
    def test_inheritance(self):
        class User:
            def sign_in(self):
                return 'login'

        class Wizard(User):
            def __init__(self, name, power):
                self.name = name
                self.power = power

            def attack(self):
                return f'{self.name} attacking with power of {self.power}'

        class Archer(User):
            def __init__(self, name, arrows):
                self.name = name
                self.arrows = arrows

            def attack(self):
                return f'{self.name} attacking with {self.arrows} arrows'

        w = Wizard('piotr', 10)
        a = Archer('robin', 8)

        assert(isinstance(w, object) is True)
        assert(isinstance(w, User) is True)
        assert(isinstance(w, Wizard) is True)
        assert(isinstance(w, Archer) is False)

        assert(w.sign_in() == 'login')
        assert(a.sign_in() == 'login')

        assert(w.attack() == 'piotr attacking with power of 10')
        assert(a.attack() == 'robin attacking with 8 arrows')

    def test_polymorphism_and_super(self):
        class User:
            def __init__(self, email):
                self.email = email

            def sign_in(self):
                return 'login'

            def attack(self):
                return '[attack]'

        class Wizard(User):
            def __init__(self, name, email, power):
                super().__init__(email)

                self.name = name
                self.power = power

            def attack(self):
                return f'{super().attack()} {self.name} attacking with power of {self.power}'

        w = Wizard('piotr', 'piotr@gmail.com', 10)

        def player_attack(character: User):
            return character.attack()

        assert(player_attack(w) == '[attack] piotr attacking with power of 10')
        assert(w.email == 'piotr@gmail.com')

    def test_introspection(self):
        class User:
            def __init__(self, email):
                self.email = email

            def sign_in(self):
                return 'login'

            def attack(self):
                return '[attack]'

        class Wizard(User):
            def __init__(self, name, email, power):
                super().__init__(email)

                self.name = name
                self.power = power

            def attack(self):
                return f'{super().attack()} {self.name} attacking with power of {self.power}'

        w = Wizard('piotr', 'piotr@gmail.com', 10)
        props_methods_of_w = dir(w)

        assert('sign_in' in props_methods_of_w)
        assert('attack' in props_methods_of_w)
        assert('email' in props_methods_of_w)
        assert('__gt__' in props_methods_of_w)

    def test_dunder_methods(self):
        class User:
            def __init__(self, email):
                self.email = email

            def sign_in(self):
                return 'login'

            def __len__(self):
                return len(self.email)

            def __str__(self):
                return f'str({self.email})'

            def __call__(self, name):
                return f'yes {name}?' 

            def __getitem__(self, idx):
                if type(idx) is str:
                    return idx in self.email 
                else:
                    return self.email[idx]

            def __delete__(self):
                return 'deleted'

        u = User('mail.com')
        assert(len(u) == 8)
        assert(str(u) == 'str(mail.com)')
        assert(u('master') == 'yes master?')
        assert(u[2] == 'i')
        assert(u['mail'] is True)

        del u

    def test_extend_list(self):
        class SuperList(list):
            def __len__(self):
                return 1000

        slist = SuperList()
        slist.append('a')
        slist.append('b')

        assert(slist[1] == 'b')
        assert(len(slist) == 1000)
        assert(issubclass(SuperList, list))

    def test_multiple_inheritance(self):
        class User:
            def __init__(name):
                self.name = name

        class Wizard(User):
            def __init__(self, stamina: int):
                self.stamina = stamina

            def magic(self):
                return 'magic'

        class Archer(User):
            def __init__(self):
                pass

            def arrow(self):
                return 'arrow'

        class HybridBorg(Wizard, Archer):
            def __init__(self, stamina):
                Wizard.__init__(self, stamina)
                Archer.__init__(self)

        hb = HybridBorg(10)
        hb.arrow()
        hb.magic()
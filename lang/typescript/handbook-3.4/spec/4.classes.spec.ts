describe('4 Classes', () => {
  describe('Classes', () => {
    it('should declare simple class', () => {
      class Greeter {
        greeting: string;

        constructor(message: string) {
          this.greeting = message;
        }

        greet() {
          return `Hello, ${this.greeting}`;
        }
      }

      const g = new Greeter('Peter');

      expect(g.greet()).toEqual('Hello, Peter');
    });
  });

  describe('Inheritance', () => {
    it('should declare types with inheritance', () => {
      class Animal {
        move(distanceInMeters: number = 0) {
          // console.log(`Animal moved ${distanceInMeters}m.`);
        }
      }

      class Dog extends Animal {
        bark() {
          // console.log('Woof! Woof!');
        }
      }

      const dog = new Dog();
      dog.move();
      dog.bark();
    });

    it('should have access to super class members', () => {
      class Animal {
        name: string;
        constructor(theName: string) { this.name = theName; }
        move(distanceInMeters: number = 0) {
          return distanceInMeters;
        }
      }

      class Horse extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 45) {
          return super.move(distanceInMeters);
        }
      }
    });
  });

  describe('Public, Private, Protected modifiers', () => {
    it('should by public by default', () => { });
    it('should private cannot be accessed from outside the class', () => {
      class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
      }

      const a = new Animal('horse');
      // a.name; // error, private property
    });

    it('should protected be accessible for childs', () => {
      class Person {
        protected name: string;
        constructor(name: string) { this.name = name; }
      }

      class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
          super(name);
          this.department = department;
        }

        public getElevatorPitch() {
          return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
      }

      const e = new Employee('Peter', 'it');

      expect(e.getElevatorPitch()).toEqual('Hello, my name is Peter and I work in it.')
    });
  });

  describe('Readonly Modifier', () => {
    it('should be initialized to mark as readonly', () => {
      class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor(theName: string) {
          this.name = theName;
        }
      }

      const o = new Octopus('octo');

      // o.name = 'boo' // error, readonly
    });
  });

  describe('Parameter properties', () => {
    it('should create instance variable in the fly in constructor, by using one of the accessibility modifiers or readonly', () => {
      class Octopus {
        constructor(readonly name: string) {
        }
      }

      const o = new Octopus('octo');
      expect(o.name).toEqual('octo');
    });
  });

  describe('Accessors', () => {
    it('should create get and set for prop', () => {
      class Employee {
        private _fullName: string = '';

        get fullName() {
          return this._fullName;
        }

        set fullName(value) {
          this._fullName = '[set] ' + value;
        }
      }

      const e = new Employee();
      e.fullName = 'Piotr Nowak';

      expect(e.fullName).toEqual('[set] Piotr Nowak');
    });
  });

  describe('Static Properties', () => {
    it('should declare class level props', () => {
      class Grid {
        static origin = { x: 0, y: 0 };
      }

      Grid.origin;
    });
  });

  describe('Abstract Classes', () => {
    it('should make class abstract, cannot instantiate it', () => {
      abstract class Animal {
        abstract makeSound(): void;
        move(): void {

        }
      }

      class Dog extends Animal {
        makeSound() {

        }
      }

      const d = new Dog();
      // const a = new Animal(); // error, abstract
    });
  });
});
import { expect } from 'chai';

describe('Classes', () => {
  describe('Definition', () => {
    it('should define simple class', () => {
      class Greeter {
        greeting: string;

        constructor(message: string) {
          this.greeting = message;
        }

        greet() {
          return `Hello, ${this.greeting}`;
        }
      }

      const greeter = new Greeter('Peter');

      expect(greeter.greet()).to.eql('Hello, Peter');
    });
  });

  describe('Inheritance', () => {
    it('should inherit from base class', () => {
      class Animal {
        position: number = 0;
        move(dist: number) {
          this.position += dist;
        }
      }

      class Dog extends Animal {
        bark() {
          return 'woof';
        }
      }

      const dog = new Dog();
      dog.move(2);

      expect(dog.position).to.eql(2);
      expect(dog.bark()).to.eql('woof');
    });

    it('should access super class methods/props', () => {
      class Animal {
        position: number = 0;
        move(dist: number) {
          this.position += dist;
        }
      }

      class Dog extends Animal {
        bark() {
          return 'woof';
        }

        move(dist: number) {
          return super.move(dist + 1);
        }
      }

      const dog = new Dog();
      dog.move(2);

      expect(dog.position).to.eql(3);
      expect(dog.bark()).to.eql('woof');
    });
  });


  describe('Public, Private and Protected Modifiers', () => {
    it('should be public by default', () => {
      class Animal {
        name: string;
        public constructor(theName: string) { this.name = theName; }
        public move(distanceInMeters: number) { }
      }

      let a = new Animal('aardwark');
      a.move(2);
      expect(a.name).to.eql('aardwark');
    });

    it('should be private', () => {
      class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
      }

      const a = new Animal("Cat");
      // a.name; // Error: 'name' is private;
    });

    it('should be protected', () => {
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

      let howard = new Employee("Howard", "Sales");
      expect(howard.getElevatorPitch()).to.eql('Hello, my name is Howard and I work in Sales.');
      // console.log(howard.name); // error
    });

    it('should have protected constructor', () => {
      class Person {
        protected name: string;
        protected constructor(theName: string) { this.name = theName; }
      }

      // Employee can extend Person
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

      let howard = new Employee("Howard", "Sales");
      // let john = new Person("John"); // Error: The 'Person' constructor is protected
      expect(howard.getElevatorPitch()).to.eql('Hello, my name is Howard and I work in Sales.');
    });

    it('should have readonly modifier (initialized in constructor the latest)', () => {
      class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor(theName: string) {
          this.name = theName;
        }
      }
      let dad = new Octopus("Man with the 8 strong legs");
      // dad.name = "Man with the 3-piece suit"; // error! name is readonly.
    });
  });

  describe('Parameter properties / properties shortcut', () => {
    it('should declare props in shortcut manner', () => {
      class Person {
        constructor(public name: string, public age: number) { }
      }

      const p = new Person('peter', 37);

      expect(p.name).to.eql('peter');
      expect(p.age).to.eql(37);
    });
  });

  describe('Accessors', () => {
    it('should define accessors', () => {
      class Person {
        private _fullname;

        constructor(fullname: string) {
          this.fullname = fullname;
        }

        get fullname() {
          return this._fullname;
        }

        set fullname(value) {
          this._fullname = `${value} [full]`;
        }
      }

      const p = new Person('peter');

      expect(p.fullname).to.eql('peter [full]');
    });
  });
  
  describe('Static Properties', () => {
    it('should define class visible props', () => {
      class Grid {
        static origin = { x: 0, y: 0 }

        calculate(x: number, y: number) {
          let distX = x + Grid.origin.x;
          let distY = y + Grid.origin.y;

          return {
            distX, distY
          }
        }
      }

      const g = new Grid();

      expect(g.calculate(5, 6)).to.eql({
        distX: 5,
        distY: 6
      })
    });
  });
  
  describe('Abstract Classes', () => {
    it('should define abstract class', () => {
      abstract class Animal {
        abstract makeSound(): void;
        move(): void {
          console.log('moving..');
        }
      }

      // const a = new Animal(); // illegal, abstract classes cannot be instantiated
    });

    it('should inherit from abstract class', () => {
      abstract class Animal {
        abstract makeSound(): void;
        move(): void {
          console.log('moving..');
        }
      }

      class Cat extends Animal {
        makeSound() {
          console.log('meow');
        }
      }

      const c = new Cat();
      const a = new Cat();
      c.makeSound();
      c.makeSound();
    });
  });
});

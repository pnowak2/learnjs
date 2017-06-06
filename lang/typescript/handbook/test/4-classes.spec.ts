import { expect } from 'chai';

describe('Classes', () => {
  describe('First class', () => {
    it('should define class', () => {
      class Greeter {
        greeting: string;

        constructor(message: string) {
          this.greeting = message;
        }

        greet() {
          return `Hello, ${this.greeting}`;
        }
      }

      let greeter = new Greeter('Peter');

      expect(greeter.greet()).to.eql('Hello, Peter');
    });
  });

  describe('Inheritance', () => {
    it('should inherit', () => {
      class Animal {
        name: string;

        constructor(name: string) {
          this.name = name;
        }

        move(distance: number): string {
          return `${this.name}: Moving ${distance} meters`;
        }
      }

      class Snake extends Animal {
        constructor(name: string) {
          super(name);
        }

        move(distance: number = 5) {
          return super.move(distance);
        }
      }

      class Rabbit extends Animal {
        constructor(name: string) {
          super(name);
        }

        move(distance: number = 25) {
          return super.move(distance);
        }
      }

      const snake = new Snake('Slither');
      const rabbit = new Rabbit('Jumper');

      expect(snake.move()).to.eql('Slither: Moving 5 meters');
      expect(rabbit.move()).to.eql('Jumper: Moving 25 meters');
    });
  });

  describe('Public, private and protected modifiers', () => {
    it('should have public by default', () => {
      class Animal {
        public name: string; // public is by default
      }

      const animal = new Animal();
      animal.name;
    });

    it('should have private', () => {
      class Animal {
        private name: string;
        constructor(name: string) { this.name = name; };
      }

      const animal = new Animal('Turtle');
      // animal.name; // illegal, private property
    });


    it('should have protected', () => {
      class Animal {
        protected name: string;
        constructor(name: string) { this.name = name; };
        speak() {
          return 'spea'
        }
      }

      class Cat extends Animal {
        constructor(name: string) { super(name) };
        speak() {
          this.name = 'boo';
          return 'bar';
        }
      }

      let cat = new Cat('greg');
      cat.speak();

    });

    it('should mark constructor as protected to allow only inheritance', () => {
      class Animal {
        protected name: string;
        protected constructor(name: string) { this.name = name; };
      }

      class Cat extends Animal {
        constructor(name: string) { super(name) };
      }

      // const animal = new Animal('test'); // illegal, constructor is protected
      const cat = new Cat('test');
    });

  });

  describe('Readonly modifier', () => {
    it('should mark as readonly', () => {
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


    it('should use parameter properties pattern to initialize ', () => {
      class OctopusNoProperty {
        constructor(name: string) {
          // this.name = name; // won't work, no property created
        }
      }


      class Octopus {
        constructor(readonly name: string) {
          this.name = name;
        }
      }

      class Octopus2 {
        constructor(public name: string) {
          this.name = name;
        }
      }

      class Octopus3 {
        constructor(protected name: string) {
          this.name = name;
        }
      }

      class Octopus4 {
        constructor(private name: string) {
          this.name = name;
        }
      }

      let o = new Octopus('octo');
      let o2 = new Octopus2('octo');
      let o3 = new Octopus3('octo');
      let o4 = new Octopus4('octo');
      o.name;

      o.name;
      // o.name = ''; // illegal, readonly
      o2.name = 'test';
      // o3.name; // illegal, protected
      // o4.name; // illegal, private 
    });
  });

  describe('Accessors', () => {
    it('should make get/set accessors', () => {
      class Employee {
        private _fullName: string;

        get fullName(): string {
          return this._fullName;
        }

        set fullName(newName: string) {
          this._fullName = newName;
        }
      }

      let e = new Employee();
      e.fullName = 'peter';

      expect(e.fullName).to.eql('peter');
    });
  });

  describe('Static Properties', () => {
    it('should have static props', () => {
      class Grid {
        static origin: { x: number, y: number } = { x: 0, y: 0 };
      }

      expect(Grid.origin).to.eql({
        x: 0,
        y: 0
      });
    });
  });

  describe('Abstract Classes', () => {
    it('should have abstract class declaration', () => {
      abstract class Animal {
        abstract makeSound(): void;
        move(): string {
          return 'animal moving';
        }
      }

      class Cat extends Animal {
        makeSound() {

        }
      }
    });
  });

  describe('Advanced Techniques', () => {
    it('should use class as an interface', () => {
      class Point {
        x: number;
        y: number;
      }

      interface Point3d extends Point {
        z: number;
      }

      let point3d: Point3d = { x: 1, y: 2, z: 3 };
    });
  });
});
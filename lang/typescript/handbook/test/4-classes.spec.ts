import { expect } from 'chai';

describe('Classes', () => {
  describe('Simple class', () => {
    it('should be defined', () => {
      class Greeter {
        greeting: string;

        constructor(message: string) {
          this.greeting = message;
        }

        greet() {
          return `Hello, ${this.greeting}`;
        }
      }

      let greeter = new Greeter('Piotr');

      expect(greeter.greet()).to.eql('Hello, Piotr');
    });
  });

  describe('Inheritance', () => {
    it('should be possible', () => {
      class Animal {
        name: string;
        position: number = 0;
        constructor(theName) {
          this.name = theName;
        }
        move(distanceInMeters: number = 0) {
          this.position += distanceInMeters;
        }
      }

      class Snake extends Animal {
        constructor(name: string) {
          super(name);
        }

        move(distanceInMeters: number = 5) {
          super.move(distanceInMeters);
        }
      }

      class Horse extends Animal {
        constructor(name: string) {
          super(name);
        }

        move(distanceInMeters: number = 45) {
          super.move(distanceInMeters);
        }
      }

      let snake = new Snake('bob the snake');
      let horse = new Horse('john the horse');

      snake.move();
      horse.move();

      expect(snake.position).to.eql(5);
      expect(horse.position).to.eql(45);
    });
  });

  describe('Public, private and protected modifiers', () => {
    describe('Public', () => {
      it('should use public by default', () => {
        class Animal {
        /* same as: public */ name: string
          public constructor(theName: string) {
            this.name = theName;
          }
          public move(distance: number) {
            // do something with it..
          }
        }
      });
    });

    describe('Private', () => {
      it('should use private only when declared', () => {
        class Animal {
          private name: string;
          constructor(theName: string) {
            this.name = theName;
          }
        }

        var animal = new Animal('cat');
        // animal.name; // Error, name is private
      });

      it('should not be possible to have same types if private properties are used in inheritance chain', () => {
        class Animal {
          private name: string;
          constructor(theName: string) {
            this.name = theName;
          }
        }

        class Rhino extends Animal {
          constructor() {
            super('rhino');
          }
        }

        class Employee {
          private name: string;
          constructor(theName: string) {
            this.name = theName;
          }
        }

        let animal = new Animal('Goat');
        let rhino = new Rhino();
        let employee = new Employee('Piotr');

        animal = rhino;
        // animal = employee; // Illegal !
      });
    });

    describe('Protected', () => {
      it('should allow access only to classes deriving the source class', () => {
        class Person {
          protected name: string;
          constructor(name: string) {
            this.name = name;
          }
        }

        class Employee extends Person {
          private department: string;

          constructor(name: string, department: string) {
            super(name);
            this.department = department;
          }

          getElevatorPitch(): string {
            return `My name is ${this.name} and i work in ${this.department}`;
          }
        }

        let piotr = new Employee('Piotr', 'IT');

        expect(piotr.getElevatorPitch()).to.eql('My name is Piotr and i work in IT');
      });

      it('should allow for protected constructors', () => {
        class Person {
          protected name: string;
          protected constructor(name: string) {
            this.name = name;
          }
        }

        class Employee extends Person {
          private department: string;
          constructor(name: string, department: string) {
            super(name);
            this.department = department;
          }
        }

        // let person = new Person('piotr'); // Illegal, constructor is protected
      });
    });

    describe('Readonly modifier', () => {
      it('should be initialized at its declaration', () => {
        class Person {
          readonly type: string;

          constructor(type: string) {
            this.type = 'human';
          }
        }

        let person = new Person('another');
        // person.type = 'test'; // Illegal, its readonly
      });
    });
  });
});
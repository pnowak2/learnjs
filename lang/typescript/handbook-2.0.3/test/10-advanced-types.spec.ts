import { expect } from 'chai';

describe('Advanced Types', () => {
  describe('Intersection Types', () => {
    it('should combine multiple types into one', () => {
      function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};

        for (let id in first) {
          (<any>result)[id] = (<any>first)[id];
        }

        for (let id in second) {
          if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
          }
        }

        return result;
      }

      class Person {
        constructor(public name: string) { }
      }
      interface Loggable {
        log(): void;
      }
      class ConsoleLogger implements Loggable {
        log() {
          // ...
        }
      }

      let jim = extend(new Person('jim'), new ConsoleLogger());
      jim.log;
      jim.name;
    });
  });

  describe('Union Types', () => {
    it('should declare union types with pipe |', () => {
      function padLeft(value: string, padding: string | number) {
        padding = 5;
        padding = '';
      }
    });

    it('should provide another example, where only common props will be accessible', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function getSmallPet(): Fish | Bird {
        return <Bird>{
          layEggs: () => { }
        };
      }

      let pet = getSmallPet();
      pet.layEggs(); // okay
      // pet.swim();    // errors, not common property to both interfaces
    });
  });


  describe('Type Guards', () => {
    it('should declare user defined type guard', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function isFish(pet: Fish | Bird): pet is Fish /* <= this is type predicate */ {
        return (<Fish>pet).swim !== undefined;
      }

      function getSmallPet(): Fish | Bird {
        return <Bird>{
          fly: () => { }
        };
      }

      let pet = getSmallPet();

      if (isFish(pet)) { // only possible because of above :pet is Fish
        pet.swim();
      }
      else {
        pet.fly();
      }
    });

    it('should use typeof guard', () => {
      function isNumber(x: any) {
        return typeof (x) === 'number';
      }

      expect(isNumber(5)).to.be.true;
      expect(isNumber('5')).to.be.false;
    });


    it('should use instanceof type guard', () => {
      class Person {
        name: string;
      }

      class Office {
        address: string;
      }

      const isPerson = (type: any) => {
        return type instanceof Person;
      }

      const isOffice = (type: any) => {
        return type instanceof Office;
      }

      expect(isPerson(new Person())).to.be.true;
      expect(isOffice(new Person())).to.be.false;
    });
  });

  describe('Nullable types', () => {
    it('should be aware of null in declaration', () => {
      function f(sn: string | null): string {
        return sn || "default";
      }
    });
  });

  describe('Type aliases', () => {
    it('should declare simple type alias', () => {
      type Name = string;

      const n: Name = 'Piotr';

      expect(n).to.eql('Piotr');
    });

    it('should declare more advanced example to simplify long declarations', () => {
      type Name = string;
      type NameResolver = () => string;
      type NameOrResolver = Name | NameResolver;

      function getName(n: NameOrResolver): Name {
        if (typeof n === "string") {
          return n;
        }
        else {
          return n();
        }
      }

      expect(getName('piotr')).to.eql('piotr');
      expect(getName(() => 'nowak')).to.eql('nowak');
    });
  });

  it('should declare generic type aliases', () => {
    type Tree<T> = {
      root: T,
      child?: Tree<T>
    }

    let birch: Tree<string> = {
      root: 'oak'
    }

    birch.root;
    // birch.child.child.root; // this is working properly and intellisense gives good hints.
  });

  describe('String Literal Types', () => {
    type Easing = "ease-in" | "ease-out" | "ease-in-out";

    const ease = (easing: Easing) => {

    }

    ease('ease-in');
    // ease('garbage'); // won't compile, not on the list of allowed string literals
  });

  describe('Discriminated Unions', () => {
    it('should avoid casting using discrimination mechanism', () => {
      interface Square {
        kind: "square";
        size: number;
      }
      interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
      }
      interface Circle {
        kind: "circle";
        radius: number;
      }

      type Shape = Square | Rectangle | Circle; // discriminated union

      function area(s: Shape) {
        switch (s.kind) {
          case "square": return s.size * s.size;
          case "rectangle": return s.height * s.width;
          case "circle": return Math.PI * s.radius ** 2;
        }
      }
    });
  });

  describe('Polymorphic this types', () => {
    it('should make use of this in inherited classes', () => {
      class BasicCalculator {
        public constructor(protected value: number = 0) { }

        public currentValue(): number {
          return this.value;
        }

        public add(operand: number): this {
          this.value += operand;
          return this;
        }

        public multiply(operand: number): this {
          this.value *= operand;
          return this;
        }
      }

      class ScientificCalculator extends BasicCalculator {
        public constructor(value = 0) {
          super(value);
        }

        public sin() {
          this.value = Math.sin(this.value);
          return this;
        }
      }


      let v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();

      let v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();


      expect(v).to.eql(11);
      expect(v2).to.be.closeTo(0.45, 0.01);
    });
  });

  describe('Index Types', () => {
    it('should behave...', () => {
      function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
        return names.map(n => o[n]);
      }

      interface Person {
        name: string;
        age: number;
      }

      let person: Person = {
        name: 'Jarid',
        age: 35
      };

      let strings: string[] = pluck(person, ['name']);

      expect(strings).to.eql(['Jarid']);
    });
  });
});
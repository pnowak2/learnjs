import { expect } from 'chai';

describe('Advanced Types', () => {
  describe('Intersection Types', () => {
    it('should mix properties from different types', () => {
      function extend<T, U>(first: T, second: U): T & U {
        let result = {} as T & U;

        for (let id in first) {
          result[id] = <any>first[id];
        }

        for (let id in second) {
          if (!result.hasOwnProperty(id)) {
            result[id] = <any>second[id];
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
          return `i am jim`;
        }
      }

      const jim = extend(new Person('jim'), new ConsoleLogger());

      expect(jim.name).to.eql('jim');
      expect(jim.log()).to.eql('i am jim');
    });
  });

  describe('Union Types', () => {
    it('should expect more than one type in arguments to function, problem with any', () => {
      function padLeft(value: string, padding: any) {
        if (typeof padding === "number") {
          return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
          return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
      }

      expect(padLeft('12', 5)).to.eql('     12');
      expect(padLeft('12', '  ')).to.eql('  12');
      expect(function () {
        padLeft('12', {});
      }).to.throw();
    });

    it('should expect more than one type in arguments to function, problem with any', () => {
      function padLeft(value: string, padding: number | string) {
        if (typeof padding === "number") {
          return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
          return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
      }

      expect(padLeft('12', 5)).to.eql('     12');
      expect(padLeft('12', '  ')).to.eql('  12');
      // padLeft('12', {}); // Illegal, only numbers or strings are allowed as second argument
    });

    it('should see only common types from union', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function getPet(): Bird | Fish {
        return {
          fly() { },
          layEggs() { }
        };
      }

      const pet = getPet();
      pet.layEggs();
      // pet.swim(); // illegal, not in common types
    });
  });


  describe('Type Guards and Differentiating Types', () => {
    it('should check manually for presence of properties to determine the type', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function getPet(): Bird | Fish {
        return {
          fly() { },
          layEggs() { }
        };
      }

      let pet = getPet();

      if ((<Fish>pet).swim) {
      } else if ((<Bird>pet).fly) {
      }
    });

    it('should have user-defined type guards', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function isFish(pet: Fish | Bird): pet is Fish { // pet is Fish - tells its a fish if this predicate returns true, then in context of if using this method pet will by type of Fish
        return (<Fish>pet).swim !== undefined;;
      }

      function makePet(): any {
        if (Math.random()) {
          return {
            swim() { },
            layEggs() { }
          }
        }
        return {}
      }

      const pet = makePet();

      if (isFish(pet)) {
        pet.layEggs();
        pet.swim();
      } else {
        // pet.layEggs(); // type of pet unknown here
      }
    });


    it('should use typeof guards for primitives. works with "number", "string", "boolean", or "symbol"', () => {
      function padLeft(value: string, padding: string | number) {
        if (typeof padding === "number") {
          padding.toFixed();
          return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
          padding.charAt(0);
          return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
      }
    });

    it('should use instanceof typeguard', () => {
      function padLeft(value: string, padding: string | number) {
        let t = {};

        if (t instanceof String) {
          // here compiler knows its string, no cast needed
          t.trim();
        }
      }
    });
  });

  describe('Nullable types', () => {
    it('should not be possible to asign null to variable with strictNullChecks', () => {
      let s = 'foo';
      s = null; // in --strictNullChecks mode that would be an error
    });
  });

  describe('Type Aliases', () => {
    it('should make alias to any type', () => {
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
    });

    it('should be also generic', () => {
      type Nazwa<T> = { a: T };

      const t: Nazwa<number> = {
        a: 5
      };
    });

    it('should be possible to do mind bending constructions like below', () => {
      type LinkedList<T> = T & { next: LinkedList<T> };

      interface Person {
        name: string;
      }

      var people: LinkedList<Person>;

      // compiles, but undefined object, thus commenting
      // var s = people.name;
      // var s = people.next.name;
      // var s = people.next.next.name;
      // var s = people.next.next.next.next.next.next.name;
    });
  });

  describe('String Literal Types', () => {
    it('should allow only for exact values', () => {
      type Str = 'a' | 'b';
      let s: Str = 'b'
      // s = 'c'; // illegal, only a or b are allowed

      class MyClass {
        a: 'a' | 'b' = 'b';
      }

      let c = new MyClass();
      c.a = 'a'
      // c.a = 'c' // illegal
    });
  });

  describe('Numeric Literal Types', () => {
    it('should allow only for exact values', () => {
      type Num = 1 | 2;
      let s: Num = 1
      // s = 3; // illegal, only 1 or 2 are allowed

      function getNumber(): 1 | 2 {
        return 2;
      }
    });
  });

  describe('Discriminated Unions', () => {
    it('should..', () => {
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
      interface Triangle {
        kind: "triangle";
        width: number;
      }
      // union type
      type Shape = Square | Rectangle | Circle | Triangle;

      function area(s: Shape): number {
        switch (s.kind) {
          // guarded here, each case has different type down there.
          case "square": return s.size * s.size;
          case "rectangle": return s.height * s.width;
          case "circle": return Math.PI * s.radius ** 2;
        }
      }
    });
  });

  describe('Polymorphic this types', () => {
    it('should use polymorphism using this keyword', () => {
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
        // ... other operations go here ...
      }

      let v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();

      expect(v).to.eql(11);

      class ScientificCalculator extends BasicCalculator {
        public constructor(value = 0) {
          super(value);
        }
        public sqrt() {
          this.value = Math.sqrt(this.value);
          return this;
        }
      }

      let v2 = new ScientificCalculator(2)
        .multiply(5)
        .add(6)
        .sqrt()
        .currentValue();

      expect(v2).to.eql(4);
    });
  });

  describe('Index Types', () => {
    it('should explain keyof keyword. It returns type which is a union of public property names of given type', () => {
      interface Person {
        name: string;
        age: number;
      }

      // this is nice, because pto is dynamically accepting any property name added later to Person interface
      let pto: keyof Person;
      pto = 'name';
      pto = 'age';
      // pto = 'other' // error, pto can accept only 'name' and 'age'

      // manual equivalent

      let pdo: 'name' | 'age';
      pdo = 'name';
      pdo = 'age';
      // pdo = 'other' // error, pdo can accept only 'name' and 'age'
    });


    it('should allow to compile time check property names', () => {
      function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
        return names.map(n => o[n]);
      }

      interface Person {
        name: string;
        age: number;
      }

      let p: Person = {
        name: 'Peter',
        age: 37
      };

      let strings: string[] = pluck(p, ['name']);

      expect(strings).to.eql(['Peter']);
    });

    it('should index types and string index signatures check', () => {
      interface Map<T> {
        [key: string]: T;
      }
      let keys: keyof Map<number>; // string
    });
  });

  describe('Mapped Types', () => {
    it('should mark interface with ? or readonly by hand', () => {
      interface PersonPartial {
        name?: string;
        age?: number;
      }

      interface PersonReadonly {
        readonly name: string;
        readonly age: number;
      }
    });

    it('should make simples mapped type', () => {
      type Keys = 'option1' | 'option2';
      type Flags = {[K in Keys]: boolean };
      // type Flags = {[K in 'option1' | 'option2']: boolean }; // equivalent of above

      let f: Flags = {
        option1: true,
        option2: false,
        // option3: true // not allowed, only names from Keys are valid there
      }
    });


    it('should make it more automatic, using keyof instead of manual union type like above', () => {
      interface Person {
        name: string;
        age: number;
      }

      type ReadOnly<T> = {
        readonly [P in keyof T]: T[P] // P is key of object of T type - [P in keyof T], where T[P] represents typed value of this key
      }
      type Optional<T> = {
        [P in keyof T]?: T[P] // P is key of object of T type - [P in keyof T], where T[P] represents typed value of this key
      }
      type ReadonlyPerson = Readonly<Person>;
      type OptionalPerson = Optional<Person>;

      let p: Person = {
        name: 'peter',
        age: 37
      }
      p.age = 38;

      let p2: ReadOnly<Person> = {
        name: 'peter',
        age: 37
      }

      let p3: OptionalPerson = {} // Possible because mapped Person to OptionalPerson where all properties are optional
      // p2.age = 38; // compilation error, readonly !
    });
  });
});

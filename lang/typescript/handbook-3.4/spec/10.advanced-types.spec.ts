describe('10 Advanced Types', () => {
  describe('Intersection Types', () => {
    it('should combine several types into one', () => {
      function extend<First, Second>(first: First, second: Second): First & Second {
        let result: First & Second = { ...first, ...second };

        return result;
      }

      class Person {
        constructor(public name: string) { }
      }

      interface Loggable {
        log(name: string): void;
      }

      class ConsoleLogger implements Loggable {
        log(name) { }
      }

      const jim = extend(new Person('Jim'), ConsoleLogger.prototype);

      jim.name;
      jim.log
    });
  });

  describe('Union Types', () => {
    it('should allow to pass one of specified types', () => {
      function padLeft(value: string, padding: string | number) {
        if (typeof padding === 'number') {
          padding.toExponential;
        } else {
          padding.repeat;
        }
      }

      padLeft('test', 5);
      padLeft('test', '5px');
    });

    it('should take common', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function getSmallPet(): Fish | Bird {
        return {
          layEggs() { },
          swim() { }
        }
      }

      const p = getSmallPet();
      // p.layEggs // common to both
    });
  });

  describe('Type Guards and Differentiating Types', () => {
    it('should provide user-defined type guard', () => {
      interface Bird {
        fly();
        layEggs();
      }

      interface Fish {
        swim();
        layEggs();
      }

      function getSmallPet(): Fish | Bird {
        return {
          layEggs() { },
          swim() { }
        }
      }

      // User Defined Type Guard
      function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;
      }

      let pet = getSmallPet();

      if (isFish(pet)) {
        pet.swim();
      }
      else {
        pet.fly();
      }
    });

    it('should use typeof guards', () => {
      function padLeft(value: string, padding: string | number) {
        if (typeof padding === "number") {
          return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
          return padding.repeat(5) + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
      }
    });

    it('should use instanceof guards', () => {
      interface Padder {
        getPaddingString(): string
      }

      class SpaceRepeatingPadder implements Padder {
        constructor(private numSpaces: number) { }
        getPaddingString() {
          return Array(this.numSpaces + 1).join(" ");
        }

        repeating() { }
      }

      class StringPadder implements Padder {
        constructor(private value: string) { }
        getPaddingString() {
          return this.value;
        }

        stringing() { }
      }

      function getRandomPadder() {
        return Math.random() < 0.5 ?
          new SpaceRepeatingPadder(4) :
          new StringPadder("  ");
      }

      // Type is 'SpaceRepeatingPadder | StringPadder'
      let padder: Padder = getRandomPadder();

      if (padder instanceof SpaceRepeatingPadder) {
        padder.repeating; // type narrowed to 'SpaceRepeatingPadder'
      }
      if (padder instanceof StringPadder) {
        padder.stringing; // type narrowed to 'StringPadder'
      }
    });
  });

  describe('Nullable types', () => {
    it('should not allow to assign null to type, unless strictNullChecks set to false', () => {
      let x: number | null = null;
      // let y: number = null; // will get warning
      // let z: number = undefined; // will get warning
    });
  });

  describe('Type Aliases', () => {
    it('should create new name for a type', () => {
      type Name = string;
      type NameResolver = (n: number) => string;
      type NameOrResolver = Name | NameResolver;

      function getName(n: NameOrResolver): Name {
        if (typeof n === 'string') {
          return n;
        } else {
          return n(2);
        }
      }

      expect(getName((n) => 'buba'.repeat(n))).toEqual('bubabuba');
    });

    it('should be used with generics too', () => {
      type Node<T> = { value: T, parent?: Node<T> }

      // same as interface
      // interface Node<T> {
      //   value: T;
      //   parent?: Node<T>;
      // }

      const o: Node<number> = {
        value: 5,
        parent: {
          value: 3
        }
      }

      const v: Node<string> = {
        value: 'a',
        parent: {
          value: 'b'
        }
      }
    });

    it('should not be possible to extend from type aliases', () => {
      type NUM = number;
      // cannot make another type extending the above one. possible with interfaces
    });
  });

  describe('String literal types', () => {
    it('should force exact literal value of string', () => {
      let str: 'a' | 'b';

      str = 'a';
      str = 'b';
      // str = 'c'; // error
    });
  });

  describe('Discriminated Unions', () => {
    it('should use common property to get proper type chosen', () => {
      interface Square {
        customKind: "square";
        size: number;
      }
      interface Rectangle {
        customKind: "rectangle";
        width: number;
        height: number;
      }
      interface Circle {
        customKind: "circle";
        radius: number;
      }
      interface Triangle {
        customKind: "triangle";
        angles: number;
      }
  
      type Shape = Square | Rectangle | Circle | Triangle;
  
      function assertNever(x: never): never {
        throw new Error("Unexpected object: " + x);
      }
  
      function area(s: Shape) {
        switch (s.customKind) {
          case "square": return s.size * s.size;
          case "rectangle": return s.height * s.width;
          case "circle": return Math.PI * s.radius ** 2;
          // default: return assertNever(s); // error here if there are missing cases
        }
      }
    });
  });

  describe('Index Types', () => {
    it('should use keyof T to get union of known properties', () => {
      class Person {
        name: 'ec'
        age: 50
      }

      let p: keyof Person;
      // same as, but dynamic, thus better
      let r: 'name' | 'age';
      p = 'name';
      p = 'age';

      r = p;
    });

    it('should use index access operator T[K]', () => {
      class Person {
        name: 'ec'
        age: 38
      }

      function getProperty<T, K extends keyof T>(obj: T, name: K): T[K] {
        return obj[name];
      }

      // getProperty(new Person(), 'name').toUpperCase
      // getProperty(new Person(), 'age').toFixed
    });

    it('should make compiler check property names', () => {
      function pluck<T, K extends keyof T>(obj: T, names: Array<K>): T[K][] {
        return names.map(name => obj[name]);
      }

      const obj = {
        name: 'ec',
        age: 50,
        location: 'lux'
      }

      expect(pluck(obj, ['name', 'age'])).toEqual(['ec', 50]);
    });

    it('should make compiler check props passed to constructor, allowing only those which exist', () => {
      type Props<T> = { [K in keyof T]?: T[K] } | { [k: string]: any };
      type UxLinkProps = Props<UxLink>;
      
      class UxLink {
        href: string = '';
        title: string = '';

        constructor(props: UxLinkProps) {
          Object.assign(this, props);
        }
      }

      expect(new UxLink({
        href: 'http',
        title: '5'
      }).href).toEqual('http');

      new UxLink({
        title: 'test',
        blabla: 'other'
      });
    });
  });

  describe('Mapped Types', () => {
    interface Person {
      name: string;
      age: number;
    }

    it('should make interface readonly', () => {
      type Readonly<T> = {
        readonly [P in keyof T]: T[P];
      }

      type PersonReadonly = Readonly<Person>;
      const p: PersonReadonly = {
        name: 'ec',
        age: 50,
      }

      // p.name = 'test'; // error, its read only

    });

    it('should make interface partial', () => {
      type Partial<T> = {
        [K in keyof T]?: T[K];
      }

      type PersonaPartial = Partial<Person>;
      const p: PersonaPartial = {
        name: 'ec',
      }

      p.age = 20;
      p.name = 'ptr';
    });

    it('should make interface nullable', () => {
      type Partial<T> = {
        [K in keyof T]: T[K] | null;
      } | null

      type PersonNullable = Partial<Person>;

      let p: PersonNullable = {
        name: 'ec',
        age: null
      }

      p = null;
    });
  });

  describe('Conditional Types', () => {
    it('should make function return type dependant of input data', () => {
      // declare function f<T extends boolean>(x: T): T extends true ? string : number;
    });
  });
});
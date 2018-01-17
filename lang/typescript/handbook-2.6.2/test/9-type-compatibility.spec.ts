import { expect } from 'chai';

describe('Type Compatibility', () => {
  describe('Introduction', () => {
    it('should be possible to assign different types with same props', () => {
      interface Named {
        name: string;
      }

      class Person {
        name: string;
      }

      let p: Named;
      // OK, because of structural typing
      p = new Person();
    });
  });

  describe('Starting Out', () => {
    it('x is compatible with y if y has at least the same members as x', () => {
      interface Named {
        name: string;
      }

      let x: Named;
      // y's inferred type is { name: string; location: string; }
      let y = { name: "Alice", location: "Seattle" };
      x = y;

      function greet(n: Named) { }

      expect(x.name).to.eql('Alice');
      greet(y);
    });
  });

  describe('Comparing Two Functions', () => {
    it('should be possible to discard parameter', () => {
      let x = (a: number) => 0;
      let y = (b: number, s: string) => 0;

      y = x; // OK
      // x = y; // Error

      // because its common in js, like forEach callback

      let items = [1, 2, 3];

      // Don't force these extra parameters
      items.forEach((item, index, array) => console.log(item));

      // Should be OK!
      items.forEach(item => console.log(item));
    });
  });

  describe('Function Parameter Bivariance', () => {
    it('should behave...', () => {
      enum EventType { Mouse, Keyboard }

      interface Event { timestamp: number; }
      interface MouseEvent extends Event { x: number; y: number }
      interface KeyEvent extends Event { keyCode: number }

      function listenEvent(eventType: EventType, handler: (n: Event) => void) {
        /* ... */
      }

      // Unsound, but useful and common
      listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

      // Undesirable alternatives in presence of soundness
      listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
      listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

      // Still disallowed (clear error). Type safety enforced for wholly incompatible types
      // listenEvent(EventType.Mouse, (e: number) => console.log(e)); // error
    });
  });

  describe('Classes', () => {
    it('should be interchangable', () => {
      class Animal {
        feet: number;
        constructor(name: string, numFeet: number) { }
      }

      class Size {
        feet: number;
        constructor(numFeet: number) { }
      }

      let a: Animal;
      let s: Size;

      a = s;  //OK
      s = a;  //OK
    });
  });

  describe('Generics', () => {
    it('should be interchangable unless T is used as type of property inside', () => {
      interface Empty<T> { name: string }
      let x: Empty<number>;
      let y: Empty<string>;

      x = y;  // okay, y matches structure of x

      // not ok
      interface NotEmpty<T> {
        data: T;
      }
      let a: NotEmpty<number>;
      let b: NotEmpty<string>;

      // a = b;  // error, x and y are not compatible
    });
  });
});

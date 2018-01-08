import { expect } from 'chai';

describe('Type Compatibility', () => {
  describe('Structural subtyping, depends on members, not by interface name', () => {
    it('should be compatibile', () => {
      interface Name {
        name: string
      }

      class Person {
        name: string;
      }

      let p: Name = new Person();
    });

    it('should x is compatible with y if y has at least the same members as x', () => {
      interface Named {
        name: string;
      }

      let x: Named;
      // y's inferred type is { name: string; location: string; }
      let y = { name: "Alice", location: "Seattle" };
      x = y;
    });

    it('should compare two functions with different arguments', () => {
      let x = (a: number) => 0;
      let y = (b: number, s: string) => 0;

      y = x; // OK
      // x = y; // Error
    });

    it('should compare two functions with different return types', () => {
      let x = () => ({ name: "Alice" });
      let y = () => ({ name: "Alice2", location: "Seattle2" });

      x = y; // OK
      // y = x; // Error because x() lacks a location property
    });
  });

  describe('Enums compatibility', () => {
    it('should not be compatibile between enums', () => {
      enum Status { Ready, Waiting };
      enum Color { Red, Blue, Green };

      let status = Status.Ready;
      // status = Color.Green;  //error
    });
  });

  describe('Classes compatibility', () => {
    it('should be compatibile between classes, static props and constructors are ignored', () => {
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
});
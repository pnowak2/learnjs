import { expect } from 'chai';

describe('Interfaces', () => {
  describe('First interface', () => {
    it('should define simple contract', () => {
      function printLabel(labelledObj: { label: string }) {
        return labelledObj.label;
      }

      let myObj = { size: 10, label: "Size 10 Object" };

      const result = printLabel(myObj);

      expect(result).to.eql('Size 10 Object');
    });

    it('should define simple interface', () => {
      interface LabelledValue {
        label: string;
      }

      function printLabel(labelledObj: LabelledValue) {
        return labelledObj.label
      }

      let myObj = { size: 10, label: "Size 10 Object" };

      const result = printLabel(myObj);

      expect(result).to.eql('Size 10 Object');
    });
  });

  describe('Optional Properties', () => {
    it('should define interface with optional properties', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): { color: string, area: number } {
        let newSquare = { color: "white", area: 100 };

        if (config.color) {
          newSquare.color = config.color;
        }
        if (config.width) {
          newSquare.area = config.width * config.width;
        }
        return newSquare;
      }

      expect(createSquare({})).to.eql({
        color: 'white',
        area: 100
      });

      expect(createSquare({ color: 'red' })).to.eql({
        color: 'red',
        area: 100
      });
    });
  });


  describe('Readonly Properties', () => {
    it('should declare it', () => {
      interface Point {
        readonly x: number;
        readonly y: number;
      }

      let p: Point = { x: 5, y: 6 };
      // p.x = 6; // illegal - readonly property
    });


    it('should provide readonly array type', () => {
      let arr: number[] = [1, 2, 3, 4];
      let roArr: ReadonlyArray<number> = arr;

      arr[0] = 5;
      arr.push(6);
      // roArr[0] = 5; // illegal, readonly array there
      // roArr.push(7) // push() does not exist here in interface of readonly array
    });
  });

  describe('Excess Property Checks', () => {
    it('should complain when using object literals with interface', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): { color: string; area: number } {
        return null;
      }

      // let mySquare = createSquare({ colour: "red", width: 100 }); // compiler will complain, colour is not color
    });

    it('should use object literals omitting required fields with casting', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): { color: string; area: number } {
        return null;
      }

      let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig); // possible, with casting
    });

    it('should declare interface so it can accept any property of "any" type in the object', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
      }

      function createSquare(config: SquareConfig): { color: string; area: number } {
        return null;
      }

      let mySquare = createSquare({ colour: "red", width: 100 }); // legal, colour will be treated as [propName: string]: any
    });
  });

  describe('Function Types', () => {
    it('should declare function type', () => {
      interface SearchFunc {
        (source: string, substring: string): boolean;
      }

      let mySearch: SearchFunc;

      mySearch = function (src: string, sub: string) { // param names do not need to match
        return false;
      }
    });
  });

  describe('Indexable Types (only String and Number allowed)', () => {
    it('should declare type which can be used as myVar[0]', () => {
      interface StringArray {
        [index: number]: string;
      }

      let arr: StringArray = ['a', 'b', 'c']

      expect(arr[0]).to.eql('a');
    });

    it('should declare indexable type with string key', () => {
      interface AnyStringValue {
        readonly [propName: string]: any;
      }

      let obj: AnyStringValue = {
        a: 'b',
        c: 'd'
      }

      // obj['a'] = 'e'; // not possible because its readonly declared
      // obj.a = 'e'; // possible
    });
  });

  describe('Class Types', () => {
    it('should declare and implement interface', () => {
      interface ClockInterface {
        currentTime: Date;
        setTime(d: Date);
      }

      class Clock implements ClockInterface {
        currentTime: Date;

        constructor(h: number, m: number) {
          this.currentTime = new Date(h, m);
        }

        setTime(d: Date) {
          this.currentTime = d;
        }
      }

      const c = new Clock(11, 46);
    });

    describe('Difference between the static and instance sides of classes', () => {
      interface ClockInterface {
        tick(): void;
      }

      interface ClockConstructor {
        new (hour: number, minute: number): ClockInterface;
      }

      function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
      }

      class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }

        tick() { }
      }

      class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }

        tick() { }
      }

      const d: ClockInterface = createClock(DigitalClock, 11, 55);
      const a: ClockInterface = createClock(AnalogClock, 11, 55);
    });
  });

  describe('Extending Interfaces', () => {
    it('should make extension possible', () => {
      interface Shape {
        color: string;
      }

      interface Square extends Shape {
        sideLength: number;
      }

      let square: Square = {
        color: 'red',
        sideLength: 5
      }
    });
  });

  describe('Hybrid Types', () => {
    it('should describe function and object', () => {
      interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
      }

      function getCounter(): Counter {
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { };

        return counter;
      }

      let c = getCounter();
      c(10);
      c.reset();
      c.interval = 2;
    });
  });
});
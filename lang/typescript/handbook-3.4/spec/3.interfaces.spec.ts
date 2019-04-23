describe('3 Interfaces', () => {
  describe('First interface', () => {
    it('should use explicit syntax with function example', () => {
      function fn(labeledObj: { label: string }): string {
        return labeledObj.label;
      }

      const arg = { label: 'hejo', api: false };
      const result = fn(arg);

      expect(result).toEqual('hejo');
    });

    it('should use interface to describe argument', () => {
      interface LabeledValue {
        label: string
      }

      function fn(labeledObj: LabeledValue): string {
        return labeledObj.label;
      }

      const arg = { label: 'hejo', api: false };
      const result = fn(arg);

      expect(result).toEqual('hejo');
    });
  });

  describe('Property definition', () => {
    it('should care about shape, not implementation of arg', () => {
      interface LabeledValue {
        label: string;
      }

      function fn(labeled: LabeledValue) { return labeled.label }
      const arg = { label: 'test' }
      const result = fn(arg);

      expect(result).toEqual('test')
    });

    it('should not allow to put literal with excess props, unless cast to proper type', () => {
      interface LabeledValue {
        label: string;
      }

      function fn(labeled: LabeledValue) { return labeled.label }
      // fn({ label: 'test', age: 38 }); // error
      const result = fn({ label: 'test', age: 38 } as LabeledValue);

      expect(result).toEqual('test')
    });
  });

  describe('Optional Properties', () => {
    it('should make some/all props optional', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function makeSquare(config: SquareConfig): SquareConfig {
        const defaults = { color: 'white', width: 10 };

        return { ...defaults, ...config };
        // or 
        // return Object.assign({}, defaults, config);
      }

      expect(makeSquare({})).toEqual({ color: 'white', width: 10 });
      expect(makeSquare({ color: 'red' })).toEqual({ color: 'red', width: 10 });
      expect(makeSquare({ width: 5 })).toEqual({ color: 'white', width: 5 });
      expect(makeSquare({ color: 'red', width: 5 })).toEqual({ color: 'red', width: 5 });
    });
  });

  describe('Readonly Properties', () => {
    it('should make some/all properties as readonly', () => {
      interface Point {
        readonly x: number;
        readonly y: number;
      }

      let p: Point = { x: 10, y: 20 };
      // p.x = 5; // error
    });

    it('should use ReadonlyArray<T> for immutable js array', () => {
      let ro: ReadonlyArray<number> = [1, 2, 3];
      // ro.push // error
      // ro.pop
    });
  });

  describe('Excess Property Checks', () => {
    it('should complain when passing literal with props not matching the type', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): { color: string, area: number } {
        return { color: 'red', area: 25 };
      }

      // createSquare({ colour: 'green' }) // error for literals
    });

    it('should use casting to avoid error', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): { color: string, area: number } {
        return { color: 'red', area: 25 };
      }

      createSquare({ colour: 'green' } as SquareConfig)
    });

    it('should add string index signature to pass excess properties', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
      }

      function createSquare(config: SquareConfig): { color: string, area: number } {
        return { color: 'red', area: 25 };
      }

      createSquare({ colour: 'green', opacity: 2 }) // any excess property matches here
    });
  });

  describe('Function Types', () => {
    it('should declare function type', () => {
      interface SearchFunc {
        (source: string, substring: string): boolean;
      }

      const mySearch: SearchFunc = (source: string, sub: string) => {
        return true;
      }

      expect(mySearch('a', 'b')).toEqual(true);
    });
  });

  describe('Indexable Types', () => {
    it('should declare number indexed type', () => {
      interface StringArray {
        [index: number]: string;
      }

      let myArr: StringArray = ['a', 'b', 'c'];

      expect(myArr[1]).toEqual('b');
    });

    it('should numeric indexer return type must be subtype of return of string indexer', () => {
      class Animal {
        name: string = ''
      }
      class Dog extends Animal {
        breed: string = '';
      }

      interface Okay {
        [x: string]: Animal;
        [x: number]: Dog;
      }
    });

    it('should make array items readonly', () => {
      interface ROArray {
        readonly [index: number]: string;
      }

      let myArray: ROArray = ['a', 'b'];
      // myArray[0] = 'c'; // error, readonly index type
    });
  });

  describe('Class Types', () => {
    it('should declare class interface', () => {
      interface IClock {
        currentTime: Date;
      }

      class Clock implements IClock {
        currentTime: Date = new Date();
        constructor(h: number, m: number) { }

        setTime(d: Date) {
          this.currentTime = d;
        }
      }
    });

    it('should define constructor type', () => {
      interface IClock {
        currentTime: Date;
      }

      interface ClockCtor {
        new(hour: number, minute: number): IClock;
      }

      function makeClock(ctor: ClockCtor, hour: number, minute: number): IClock {
        return new ctor(hour, minute);
      }
    });
  });

  describe('Extending Interfaces', () => {
    it('should extend interface', () => {
      interface Shape {
        color: string;
      }

      interface Square extends Shape {
        width: number;
      }

      let square: Square = {} as Square;
      square.color;
      square.width;
    });
  });

  describe('Hybrid Types', () => {
    it('should make interface with props and function types', () => {
      interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
      }

      function getCounter(): Counter {
        const ctr = function(start: number) { } as Counter;
        ctr.interval = 123;
        ctr.reset = function() {};

        return ctr;
       } ;
    });
  });

  describe('Interfaces Extending Classes', () => {
    it('should interface extend from class', () => {
      class Control {
        private state: any;
      }

      interface SelectableControl extends Control {
        select(): void;
      }

      class Button extends Control implements SelectableControl {
        select() {
          return;
        }
      }

      let btn = new Button();
      btn.select();
    });
  });
});
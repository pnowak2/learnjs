import { expect } from 'chai';

describe('Interfaces', () => {
  describe('First Interface', () => {
    it('Use without Interface', () => {
      function printLabel(labeledObj: { label: string }) {
        return `printed ${labeledObj.label}`;
      }

      let result = printLabel({
        label: 'test',
      });

      expect(result).to.eql('printed test');
    });

    it('Done with using Interface', () => {
      interface LabelledValue {
        label: string
      }

      function printLabel(labeledObj: LabelledValue) {
        return `printed ${labeledObj.label}`;
      }

      let result = printLabel({
        label: 'document'
      });

      expect(result).to.eql('printed document');
    });
  });

  describe('Optional Properties', () => {
    interface SquareConfig {
      color?: string;
      width?: number;
    }

    function createSquare(config: SquareConfig): { color: string, area: number } {
      let newSquare = {
        color: 'white',
        area: 100
      };

      if (config.color) {
        newSquare.color = config.color;
      }

      if (config.width) {
        newSquare.area = config.width * config.width;
      }

      return newSquare;
    }

    let square1 = createSquare({});
    let square2 = createSquare({ color: 'red' });
    let square3 = createSquare({ color: 'blue', width: 8 });

    expect(square1.color).to.eql('white');
    expect(square1.area).to.eql(100);

    expect(square2.color).to.eql('red');
    expect(square2.area).to.eql(100);

    expect(square3.color).to.eql('blue');
    expect(square3.area).to.eql(64);
  });

  describe('Read Only Properties', () => {
    it('should declare as readonly variable', () => {
      interface Point {
        readonly x: number;
        readonly y: number;
      }

      let p1: Point = { x: 2, y: 4 };

      expect(p1.x).to.eql(2);
      expect(p1.y).to.eql(4);
    });
  });

  describe('ReadonlyArray<T>', () => {
    it('should not be possible to mutate any members', () => {
      let arr: ReadonlyArray<string> = ['a', 'b', 'c'];

      expect(arr[0]).to.eql('a');
    });
  });

  describe('Excess Property Checks', () => {
    it('should not allow to omit some properties', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): { color: string, area: number } {
        return null;
      }

      createSquare(<SquareConfig>{
        colour: 'red'
      }); // Without casting tsc throws an error
    });

    it('should allow to omit some properties with any', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any // string index signature solution
      }

      function createSquare(config: SquareConfig): { color: string, area: number } {
        return null;
      }

      createSquare({
        colour: 'blue'
      })
    });
  });

  describe('Function Types', () => {
    it('should define function signatures', () => {
      interface SearchFunc {
        (source: string, destination: string): boolean
      }

      let fun: SearchFunc = (source, destination) => source !== destination;
    });
  });

  describe('Indexable Types', () => {
    it('should define indexable type by number or string', () => {
      interface StringArray {
        [idx: number]: string
      }

      let arr: StringArray = ['the']

      expect(arr[0]).to.eql('the');
    });
  });

  describe('Class Types', () => {
    it('should define class interface', () => {
      interface ClockInterface {
        currentTime: Date;
        setTime(d: Date);
      }

      class Clock implements ClockInterface {
        currentTime: Date;

        setTime(d: Date) {
          this.currentTime = d;
        }

        constructor(y: number, m: number) {
          this.currentTime = new Date(y, m);
        }
      }

      let c = new Clock(2016, 10);

      expect(c.currentTime.getMonth()).to.eql(10);
    });
  });

  describe('Extending Interfaces', () => {
    it('should extend existing interface with new features', () => {
      interface Shape {
        color: string;
      }

      interface Square extends Shape {
        sideLength: number;
      }

      let square = <Square>{};

      square.color = 'blue';
      square.sideLength = 22;

      expect(square.color).to.eql('blue');
      expect(square.sideLength).to.eql(22);
    });
  });

  describe('Hybrid types', () => {
    it('should', () => {
      interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
      }

      function getCounter(): Counter {
        let fn = function (start: number) { };
        let counter = <Counter>fn;

        counter.interval = 123;
        counter.reset = function () { };
        return counter;
      }

      let c = getCounter();
      c(10);
      c.reset();
      c.interval = 5.0;

      expect(c).to.be.a('function');
    });
  });

  describe('Interfaces Extending Classes', () => {
    class Control {
      private state: any;
    }

    interface SelectableControl extends Control {
      select(): void;
    }

    class Button extends Control {
      // No complaints here, we are extending not implementing from interface
      // SelectableControl is not used anywhere, just showing that we can extend class type
      // to get it all api including private and protected
    }

    let btn = new Button();

    expect(btn).to.be.instanceOf(Button);
  });
});
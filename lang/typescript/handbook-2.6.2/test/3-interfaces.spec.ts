import { expect } from 'chai';

describe('Interfaces', () => {
  describe('Braces Notation', () => {
    it('should declare properly', () => {
      function print(label: { name: string }) {
        console.log(label.name);
      }

      print({
        name: 'test'
      });

      let obj = {
        name: 'hello',
        age: 20
      };

      print(obj);
    });
  });

  describe('Interface Keyword', () => {
    it('should declare properly', () => {
      interface Labelled {
        name: string;
      }

      function print(label: Labelled) {
        console.log(label.name);
      }

      print({
        name: 'test'
      });

      let obj = {
        name: 'hello',
        age: 20
      };

      print(obj);
    });
  });

  describe('Optional properties', () => {
    it('should declare properly', () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig) {
        let sq = { color: 'white', area: 100 };

        if (config.color) {
          sq.color = config.color;
        }

        if (config.width) {
          sq.area = config.width * config.width;
        }

        return sq;
      }

      expect(createSquare({})).to.eql({
        color: 'white',
        area: 100
      });

      expect(createSquare({ color: 'red' })).to.eql({
        color: 'red',
        area: 100
      });

      expect(createSquare({ color: 'red', width: 5 })).to.eql({
        color: 'red',
        area: 25
      });
    });
  });

  describe('Read Only Properties', () => {
    it('should declare property', () => {
      interface Point {
        readonly x: number;
        readonly y: number;
      }

      let p1: Point = { x: 10, y: 20 };
      // p1.x = 5; // illegal, readonly
    });

    it('should declare readonly array', () => {
      let arr: number[] = [1, 2, 3, 4];
      let ro: ReadonlyArray<number> = arr;

      arr[1] = 5;
      // ro[1] = 5; // illegal, readonly access
      // ro[1].push(5); // illegal, compilation error, no such method
    });
  });

  describe('String Index Signature', () => {
    interface SquareConfig {
      color?: string;
      width?: number;
      [key: string]: any;
    }

    let config: SquareConfig = {
      colour: 'misspelled property name',
      nonExistingProp: 'boo!'
    }
  });

  describe('Function Types', () => {
    it('should describe simple function', () => {
      interface SearchFn {
        (src: string, sub: string): boolean;
      }

      let mySearch: SearchFn;

      mySearch = function (src: string, sub: string): boolean {
        let result = src.search(sub);
        return result > -1;
      }

      expect(mySearch('test', 'es')).to.be.true;
    });
  });

  describe('Indexable Types', () => {
    it('should support numerical indexes', () => {
      interface StringArray {
        [index: number]: string;
      }

      let arr: StringArray = ['1', '2', '3'];

      expect(arr[2]).to.eql('3');
    });

    it('should support string indexes', () => {
      interface AnyObjProp {
        [key: string]: any;
      }

      let obj: AnyObjProp = { name: 'test'};

      expect(obj.name).to.eql('test');
    });

    it('should support readonly numerical indexes', () => {
      interface StringArray {
        readonly [index: number]: string;
      }

      let arr: StringArray = ['1', '2', '3'];

      expect(arr[2]).to.eql('3');
      // arr[1] = '5'; // invalid, readonly index
    });
  });
  
  describe('Class Types', () => {
    it('should implement interface', () => {
      interface IClock {
        currentTime: Date;
        setTime(d: Date);
      }

      class Clock implements IClock {
        currentTime: Date;

        constructor(h: number, m: number) {
          this.currentTime = new Date(2018, 0, 5, h, m);
        }

        setTime(d: Date) {
          this.currentTime = d;
        }
      }

      let c = new Clock(16, 20);
      expect(c.currentTime).to.be.a('Date');
    });
  });
  
  describe('Difference between the static and instance sides of classes', () => {
    it('should make possible to describe constructor of class with interface (new keyword)', () => {
      interface ClockConstructor {
        new (time: Date);
      }

      interface IClock {
        tick();
      }

      function makeClock(ctr: ClockConstructor, time: Date): IClock {
        return new ctr(time);
      }

      class DigitalClock implements IClock {
        tick() {

        }
      }

      const c: IClock = makeClock(DigitalClock, new Date());
      c.tick();
    });
  });
  
  describe('Extending Interfaces', () => {
    it('should make derived interface', () => {
      interface Shape {
        color: string;
      }

      interface Square extends Shape {
        sideLength: number;
      }

      let square = {} as Square;
      square.color;
      square.sideLength;
    });
  });
  
  describe('Hybrid Types', () => {
    it('should do mix of property / method interface', () => {
      interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
      }

      function getCounter(): Counter {
        let counter = <Counter>function(start: number) {}
        counter.interval = 122;
        counter.reset = function () {}

        return counter;
      }
    });
  });
    
});

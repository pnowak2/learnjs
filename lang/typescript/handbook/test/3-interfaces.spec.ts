import { expect } from 'chai';

describe('Interfaces', () => {
  describe('First Interface', () => {
    it('Use without Interface', () => {
      function printLabel(labeledObj: { label: string }) {
        return `printed ${labeledObj.label}`;
      }

      let result = printLabel({
        label: 'test'
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
});
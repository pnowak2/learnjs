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
    it('should behave...', () => {
      
    });
  });
});

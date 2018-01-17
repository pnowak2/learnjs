import { expect } from 'chai';

describe('Type Inference', () => {
  describe('Basics', () => {
    it('should infer type by value', () => {
      let x = 3;
    });
  });

  describe('Best Common Type', () => {
    class Animal { }
    class Rhino { }
    class Elephant { trumpet: boolean }
    class Snake { }

    it('should be union type Rhino | Elephant | Snake', () => {
      let x = [new Rhino(), new Elephant(), new Snake()];
      let y: Array<Rhino | Elephant | Snake> = [new Rhino(), new Elephant(), new Snake()];
    });
  });
});

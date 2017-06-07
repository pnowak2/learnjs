import { expect } from 'chai';

describe('Type Inference', () => {
  describe('Basics', () => {
    it('should declare and infer type', () => {
      let x = 3;
      x.toFixed();

      expect(typeof x).to.eql('number');
    });
  });

  describe('Best Common Type', () => {
    it('should behave...', () => {
      let x/*: Array<number>*/ = [0, 1, null];
    });


    it('should find common denominator', () => {
      abstract class Animal {
        abstract talk(): string;
      }
      class Rhino extends Animal {
        talk(): string {
          return 'squeek';
        }
      }
      class Cat extends Animal {
        talk(): string {
          return 'meow';
        }
      }

      let zoo: [Animal] = [new Rhino(), new Cat()];
      expect(zoo[0].talk()).to.eql('squeek');
      expect(zoo[1].talk()).to.eql('meow');
    });
  });

  describe('Contextual Type', () => {

    it('should work with any property when "any" is provided', () => {
      window.onmousedown = function (mouseEvent: any) {
        console.log(mouseEvent.buton);  // No error is given, used with "any"
      };
    });

    it('should fail when default type is inferred', () => {
      window.onmousedown = function (mouseEvent) {
        // console.log(mouseEvent.buton);  // Error, mouseEvent is inverred
      };
    });
  });
});
import { expect } from 'chai';

describe('Iterators and Generators', () => {
  describe('for..of', () => {
    it('should declare iterable', () => {
      let someArray = [1, "string", false];
      let result = '';
      for (let entry of someArray) {
        result += entry;
      }

      expect(result).to.eql('1stringfalse');
    });


    it('should show difference between for..in and for..of', () => {
      let list = [4, 5, 6];

      for (let i in list) {
        // console.log(i); // "0", "1", "2",
      }

      for (let i of list) {
        // console.log(i); // "4", "5", "6"
      }
    });

  });
});
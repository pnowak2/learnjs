import { expect } from 'chai';

describe('Iterators and Generators', () => {
  describe('Iterables', () => {
    it('should declare iterable', () => {
      let someArray = [1, "string", false];
      let result = '';
      for (let entry of someArray) {
        result += entry;
      }

      expect(result).to.eql('1stringfalse');
    });
    
    it('should work with built in types as Set, Map', () => {
      // does not compile, because es6 features not visible for some reason here..
      // let pets = new Set(["Cat", "Dog", "Hamster"]);
    });
      
  });
});

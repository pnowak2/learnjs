import { expect } from 'chai';

describe('Variable Declarations', () => {
  describe('Var declarations', () => {
    it('should use traditional declaration', () => {
      var a = 10;
    });
    
    it('should declare var inside a function', () => {
      function f() {
        var message = 'hello world';

        return message;
      }

      expect(f()).to.eql('hello world');
    });
      
  });
});

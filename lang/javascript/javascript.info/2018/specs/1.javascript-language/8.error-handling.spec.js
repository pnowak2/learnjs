var expect = require('chai').expect;
var sinon = require('sinon');

describe('8. Error Handling', () => {
  describe('8.1 Try, Catch', function () {
    it('should catch error in catch block', () => {
      try {
        throw 'boo';
      } catch (e) {
        expect(e).to.eql('boo');
        return;
      }

      fail();
    });

    it('should have error object', () => {
      try {
        throw new Error('problem');
      } catch (e) {
        expect(e.name).to.eql('Error');
        expect(e.message).to.eql('problem');
        expect(e.stack).to.be.a('string');
        return;
      }

      fail();
    });

    it('should use throw operator', () => {
      try {
        throw { name: 'Error', age: 38 };
      } catch (error) {
        expect(error.name).to.eql('Error');
        expect(error.age).to.eql(38);
        return;
      }

      fail();
    });

    it('should use built-in errors', () => {
      let message = 'problem has just occured';

      let error1 = new Error(message);
      let error2 = new SyntaxError(message);
      let error3 = new ReferenceError(message);
    });

    it('should use try-catch-finally', (done) => {
      try {
        throw { name: 'Error', age: 38 };
      } catch (error) {
        expect(error.name).to.eql('Error');
        expect(error.age).to.eql(38);
        return;
      } finally {
        done();
      }

      fail();
    });

    it('should window.onerror', () => {
      window.onerror = function(message, url, line, col, error) {
        // handle error here..
      };
    });
  });

  describe('8.2 Custom errors', () => {
    it('should make custom error class', () => {
      class ValidationError extends Error {
        constructor(message) {
          super(message);
          this.name = 'ValidationError';
        }
      }

      function test() {
        throw new ValidationError("Whoops!");
      }
      
      try {
        test();
      } catch(err) {
        expect(err.message).to.eql('Whoops!');
        expect(err.name).to.eql('ValidationError');
        return;
      }
    });
  });
});
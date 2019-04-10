describe('10 Error Handling', () => {
  describe('10.1 Error handling, "try..catch"', () => {
    describe('try..catch flow', () => {
      it('should run try, skipping catch', () => {
        const spy = jasmine.createSpy();

        try {
          spy('try');
        } catch (e) {
          spy('error');
        }

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('try');
      });

      it('should try, then enter catch', () => {
        const spy = jasmine.createSpy();

        try {
          spy('try');
          err();
        } catch (e) {
          spy('error');
        }

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith('try');
        expect(spy).toHaveBeenCalledWith('error');
      });
    });

    describe('Error object', () => {
      it('should have name, message and stack properties', () => {
        try {
          lalala;
        } catch (err) {
          expect(err.name).toEqual('ReferenceError');
          expect(err.message).toEqual('lalala is not defined');
          expect(err.stack).toEqual(jasmine.any(String));
        }
      });
    });

    describe('Using try..catch', () => {
      it('should make JSON.parse example', (done) => {
        let badJson = '{ bad json }';

        try {
          const user = JSON.parse(badJson);
        } catch (e) {
          expect(e.name).toEqual('SyntaxError');
          expect(e.message).toEqual('Unexpected token b in JSON at position 2');
          done();
          return;
        }

        fail();
      });
    });

    describe('Throwing our own errors', () => {
      it('should throw any object or primitive or built in Error structures', () => {
        const error = new Error('boo');
        const serror = new SyntaxError('boo');
        const rerror = new ReferenceError('boo');

        expect(error.name).toEqual('Error');
        expect(error.message).toEqual('boo');
        expect(serror.name).toEqual('SyntaxError');
        expect(serror.message).toEqual('boo');
        expect(rerror.name).toEqual('ReferenceError');
        expect(rerror.message).toEqual('boo');
      });

      it('should make JSON example', (done) => {
        let badJson = '{ "age": 30 }';

        try {
          const user = JSON.parse(badJson);

          if (!user.name) {
            throw new SyntaxError('missing name');
          }
        } catch (e) {
          expect(e.name).toEqual('SyntaxError');
          expect(e.message).toEqual('missing name');
          done();
          return;
        }

        fail();
      });
    });

    describe('Rethrowing', () => {
      it('should handle known error and rethrow others', (done) => {
        let badJson = '{ "age": 30 }';

        try {
          const user = JSON.parse(badJson);

          if (!user.name) {
            throw new SyntaxError('missing name');
          }

          lalala;
          
        } catch (e) {
          if (e.name === 'SyntaxError') {
            expect(e.name).toEqual('SyntaxError');
            expect(e.message).toEqual('missing name');
            done();
          } else {
            throw e;
          }
          return;
        }

        fail();
      });
    });

    describe('try..catch..finally', () => {
      it('should run try, finally', () => {
        const spy = jasmine.createSpy();

        try {
          spy('try');
        } catch (e) {
          spy('catch');
        } finally {
          spy('finally');
        }

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith('try');
        expect(spy).toHaveBeenCalledWith('finally');
      });

      it('should run try, catch, finally', () => {
        const spy = jasmine.createSpy();

        try {
          spy('try');
          lalala();
        } catch (e) {
          spy('catch');
        } finally {
          spy('finally');
        }

        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenCalledWith('try');
        expect(spy).toHaveBeenCalledWith('catch');
        expect(spy).toHaveBeenCalledWith('finally');
      });
    });

    describe('Global catch', () => {
      it('should behave...', () => {
        window.onerror = function(msg, url, line, col, error) {
          // this runs if no one catches the error anywhere
        };
      });
    });
  });

  describe('10.2 Custom errors, extending Error', () => {
    describe('Extending Error', () => {
      it('should behave...', (done) => {
        class ValidationError extends Error {
          constructor(message) {
            super(message);
            this.name = 'ValidationError';
          }
        }

        try {
          throw new ValidationError('Field is missing');
        } catch (e) {
          expect(e.name).toEqual('ValidationError');
          expect(e.message).toEqual('Field is missing');
          done();
        }
      });
    });
  });
});
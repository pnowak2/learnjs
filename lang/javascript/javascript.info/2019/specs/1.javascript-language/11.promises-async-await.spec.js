describe('11 Promises, Async/Await', () => {
  describe('11.1 Introduction: callbacks', () => {
    it('should read the section', () => { });
  });

  describe('11.2 Promise', () => {
    describe('Basics', () => {
      it('should create a promise which resolves', () => {
        const promise = new Promise((resolve, reject) => {
          resolve('yeah!');
        });

        return promise;
      });

      it('should create a promise which rejects', (done) => {
        const promise = new Promise((resolve, reject) => {
          reject('boo!');
        });

        promise.then(
          (val) => { },
          (err) => {
            expect(err).toEqual('boo!');
            done();
          }
        );
      });
    });

    describe('then', () => {
      it('should call then with resolve', (done) => {
        const promiseResolve = new Promise((resolve, reject) => {
          resolve('yay!');
        });

        promiseResolve.then(
          (val) => {
            expect(val).toEqual('yay!');
            done();
          },
          (err) => { }
        );
      });

      it('should call then wit hreject', (done) => {
        const promiseReject = new Promise((resolve, reject) => {
          reject('boo!');
        });

        promiseReject.then(
          (val) => { },
          (err) => {
            expect(err).toEqual('boo!');
            done();
          }
        );
      });
    });

    describe('catch', () => {
      it('should catch the rejection', (done) => {
        const promiseReject = new Promise((resolve, reject) => {
          reject('boo!');
        });

        promiseReject.catch(err => {
          expect(err).toEqual('boo!');
          done();
        });
      });

      it('should catch the error', (done) => {
        const promiseReject = new Promise((resolve, reject) => {
          throw new Error('oh my!');
        });

        promiseReject.catch(err => {
          expect(err.message).toEqual('oh my!');
          done();
        });
      });
    });

    describe('finally', () => {
      it('should run after resolution', (done) => {
        const promiseReject = new Promise((resolve, reject) => {
          resolve('yes!');
        });

        promiseReject.finally(() => {
          done();
        });
      });

      it('should run after error too', (done) => {
        const promiseReject = new Promise((resolve, reject) => {
          reject('boo!');
        });

        promiseReject.finally(() => {
          done();
        });
      });
    });
  });

  describe('11.3 Promises chaining', () => {
    describe('Simple chain without returning promises inside', () => {
      it('should chain promises', (done) => {
        new Promise((resolve, reject) => {
          setTimeout(() => {
           resolve(1);
          });
        })
        .then(val => val * 2)
        .then(val => val * 2)
        .then(val => val * 2)
        .then(val => {
          expect(val).toEqual(8);
          done();
        });
      });
    });

    describe('Returning promises', () => {
      it('should chain promises', (done) => {
        new Promise((resolve, reject) => {
          setTimeout(() => {
           resolve(1);
          });
        })
        .then(val => new Promise((resolve, reject) => resolve(val * 2)))
        .then(val => val * 2) // rest waits until previous nested promise resolves and result is passed to next then
        .then(val => val * 2)
        .then(val => {
          expect(val).toEqual(8);
          done();
        });
      });

      it('should make load script example', (done) => {
        const spy = jasmine.createSpy();

        function loadScript(url) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(`|response from ${url}|`); 
              spy(url);
            });
          });
        }

        loadScript('google.com')
          .then(response => loadScript('bing.com'))
          .then(response => loadScript('yahoo.com'))
          .then(result => {
            expect(spy).toHaveBeenCalledTimes(3);
            expect(spy).toHaveBeenCalledWith('google.com');
            expect(spy).toHaveBeenCalledWith('bing.com');
            expect(spy).toHaveBeenCalledWith('yahoo.com');
            done();
          });
      });
    });

    describe('Thenables', () => {
      it('should run Thenable in promises chain', (done) => {
        class Thenable {
          constructor(num) {
            this.num = num;
          }

          then(resolve, reject) {
            setTimeout(() => {
              resolve(this.num * 2);
            });
          }
        }

        new Promise((resolve, reject) => {
          resolve(new Thenable(25));
        })
        .then(value => {
          expect(value).toEqual(50);
          done();
        });
      });
    });
  });

  describe('11.4 Error handling with promises', () => {
    it('should behave...', () => {
      
    });
  });
});
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
        }).then(value => {
          expect(value).toEqual(50);
          done();
        });
      });
    });
  });

  describe('11.4 Error handling with promises', () => {
    describe('Catching with catch', () => {
      function fetchReject(url) {
        return new Promise((resolve, reject) => {
          reject(new Error('404'));
        });
      };

      function fetchError(url) {
        return new Promise((resolve, reject) => {
          throw new Error('boo');
        });
      };

      it('should catch error', (done) => {
        fetchError('/url')
          .then(data => { })
          .catch(err => {
            expect(err.message).toEqual('boo');
            done();
          });
      });

      it('should catch reject', (done) => {
        fetchReject('/url')
          .then(data => { })
          .catch(err => {
            expect(err.message).toEqual('404');
            done();
          });
      });
    });

    describe('Rethrowing', () => {
      it('should catch and next then should continue', (done) => {
        const spy = jasmine.createSpy();

        new Promise((resolve, reject) => {
          spy('1');
          throw new Error("Whoops!");
        }).catch(function (error) {
          spy(error.message);
          return 'recovered';
        }).then((v) => {
          spy(v);
        }).finally(() => {
          expect(spy).toHaveBeenCalledWith('1');
          expect(spy).toHaveBeenCalledWith('Whoops!');
          expect(spy).toHaveBeenCalledWith('recovered');
          expect(spy).toHaveBeenCalledTimes(3);
          done();
        });
      });
    });

    describe('Unhandled rejections', () => {
      it('should be caught by unhandledrejection on global object', (done) => {
        window.addEventListener('unhandledrejection', function (event) {
          done();
        });

        new Promise(function () {
          throw new Error("Whoops!");
        });
      });
    });
  });

  describe('11.5 Promise API', () => {
    describe('Promise.resolve(value)', () => {
      it('should return immediately resolved promise with value', (done) => {
        Promise.resolve('yay')
          .then(v => {
            expect(v).toEqual('yay');
          })
          .finally(done);
      });
    });

    describe('Promise.reject(error)', () => {
      it('should return immediately rejected promise with error', (done) => {
        Promise.reject('oops')
          .catch(v => {
            expect(v).toEqual('oops');
          })
          .finally(done);
      });
    });

    describe('Promise.all([...promises])', () => {
      it('should run promises in parallel and wait until all of them are ready', (done) => {
        const p1 = Promise.resolve(1);
        const p2 = Promise.resolve(2);
        const p3 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(5);
          });
        });

        Promise.all(p1, p2, p3)
          .then(([one, two, three]) => {
            expect(one).toEqual(1);
            expect(two).toEqual(2);
            expect(three).toEqual(5);
          })
          .finally(done);
      });

      it('should also accept values without promise, those will be wrapped', (done) => {
        Promise.all(1, 2, 5)
          .then(([one, two, three]) => {
            expect(one).toEqual(1);
            expect(two).toEqual(2);
            expect(three).toEqual(5);
          })
          .finally(done);
      });
    });

    describe('Promise.race([...promises])', () => {
      it('should run promises in parallel and wait until all of them are ready', (done) => {
        const p1 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(1);
          }, 3);
        });
        const p2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(5);
          }, 1);
        });
        const p3 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(3);
          }, 2);
        });

        Promise.race([p1, p2, p3])
          .then(value => {
            expect(value).toEqual(5);
            done();
          });
      });
    });
  });

  describe('11.6 Promisification', () => {
    it('should wrap function with callback (last arg) with promise', (done) => {
      function promisify(f) {
        return function (...args) { // return a wrapper-function
          return new Promise((resolve, reject) => {
            function callback(err, result) { // our custom callback for f
              if (err) {
                return reject(err);
              } else {
                resolve(result);
              }
            }

            args.push(callback); // append our custom callback to the end of arguments

            f.call(this, ...args); // call the original function
          });
        };
      };

      function fn(arg, cb) {
        setTimeout(() => {
          cb(null, 'result: ' + arg);
        });
      }

      const p = promisify(fn);
      p(5).then(v => {
        expect(v).toEqual('result: 5');
        done();
      });
    });
  });

  describe('11.7 Microtasks and event loop', () => {
    function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          break;
        }
      }
    }

    it('should be micro (for promises only) and macrotask (settimeout and others) queues ', () => { });

    it('should code below promise execute first', (done) => {
      let date1 = Date.now();

      sleep(1);

      new Promise((resolve, reject) => {
        resolve(5);
      }).then((v) => {
        let date2 = Date.now();
        expect((date2 > date1)).toBe(true);
        done();
      });
    });
  });

  describe('11.8 async/await', () => {
    describe('async', () => {
      it('should put before function, meaning function returns a promise', (done) => {
        async function fn() {
          return 1;
        }

        fn().then(val => {
          expect(val).toEqual(1);
          done();
        });
      });
    });

    describe('await', () => {
      it('should make wait until async function (promise) settles and returns result', async () => {
        async function fn() {
          return 1;
        }

        const result = await fn();
        expect(result).toEqual(1);
      });
    });

    describe('Making it work in top level code', () => {
      it('should behave...', () => {
        async function fn() {
          return 1;
        }

        (async function () {
          const result = await fn();

          expect(result).toEqual(1);
        })();
      });
    });

    describe('await and thenable', () => {
      it('should accept thenable', async () => {
        class Thenable {
          then(resolve, reject) {
            setTimeout(() => {
              resolve(2);
            });
          }
        }

        const result = await new Thenable();

        expect(result).toEqual(2);
      });
    });

    describe('Error handling', () => {
      it('should catch with try..catch syntax', async (done) => {
        async function fn() {
          throw new Error('boo');
        }

        try {
          let result = await fn();
        } catch (e) {
          expect(e.message).toEqual('boo');
          done();
        }
      });
    });
  });
});
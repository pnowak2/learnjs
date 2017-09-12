import { expect } from 'chai';
import * as sinon from 'sinon';
import EventEmitter from 'events';
import * as Rx from 'rxjs';

describe('2 Reacting with RxJs', () => {
  describe('2.1 FP as pillar of Reactive Programming', () => {
    describe('2.1.1 Functional Programming', () => {
      it('should use high order functions to work with arrays', () => {
        const isEven = (n) => n % 2 === 0;
        const square = n => n * n;
        const add = (a, b) => a + b;

        const arr = [1, 2, 3, 4, 5];

        const result = arr
          .filter(isEven)
          .map(square)
          .reduce(add);

        expect(result).to.eql(20);
      });


      it('should build simple Stream', () => {
        class Stream {
          constructor(fn) {
            this.subscribe = fn;
          }

          map(mapfn) {
            return new Stream((observer) => {
              return this.subscribe({
                next(item) { observer.next(mapfn(item)) }
              })
            });
          }

          static fromArray(arr) {
            return new Stream((observer) => {
              arr.forEach(item => {
                observer.next(item);
              })
            });
          }
        }

        let result = '';

        Stream
          .fromArray([1, 2, 3])
          .map(val => val * val)
          .subscribe({
            next(item) {
              result += '' + item;
            }
          });

        expect(result).to.eql('149');
      });
    });

    describe('2.1.2 Iterator Pattern', () => {
      it('should create iterator / default iterator - using generator pattern and classical', () => {
        const obj = {
          arr: [1, 2, 3],
          makeIterator(arr) {
            let i = 0;
            return {
              next() {
                const it = arr[i];
                i = i + 1;
                return it;
              },
              hasNext() {
                return i < arr.length;
              }
            }
          },
          *createIterator() {
            for (let item of this.arr) {
              yield item;
            }
          },
          *[Symbol.iterator]() {
            for (let item of this.arr) {
              yield item;
            }
          }
        }

        const it = obj.makeIterator([1, 2, 3]);

        while (it.hasNext()) {
          console.log(it.next());
        }

        for (let o of obj.createIterator()) {
          console.log(o);
        }

        for (let o of obj) {
          console.log(o);
        }
      });
    });
  });

  describe('2.3 Wrapping Data Sources with Rx.Observable', () => {
    describe('2.3.2 Creating RxJS observables', () => {
      it('should make an analogy with strings', () => {
        const result = String('RxJS')
          .toUpperCase()
          .substring(0, 2)
          .concat(' ')
          .repeat(3)
          .trim()
          .concat('!')

        expect(result).to.eql('RX RX RX!');
      });

      it('should understand typical flow with RxJS', () => {
        // With pattern as below

        // Rx.Observable.from(<data-source>)
        //   .operator1(...)
        //   .operator2(...)
        //   .operator3(...)
        //   .subscribe(<process-output>);
      });
    });

    describe('2.3.3 When and Where To Use RxJS', () => {
      it('should use Single Value, Synchronous', (done) => {
        const stream = Rx.Observable.of(42);

        stream.subscribe(val => {
          expect(val).to.eql(42);
        }, null, done)
      });

      it('should use Multi Value, Synchronous', (done) => {
        let result = '';

        const stream = Rx.Observable.from([1, 2, 3]);
        stream.subscribe(val => {
          result += val;
        }, null, () => {
          expect(result).to.eql('123');
          done();
        })
      });

      it('should use Single Value, Asynchronous', (done) => {
        const ajaxPromise = fetch('http://jsonplaceholder.typicode.com/posts/');

        const fortyTwo = new Promise((resolve, reject) => {
          setTimeout(function () {
            resolve(42);
          }, 40);
        });

        const promised$ = Rx.Observable
          .fromPromise(fortyTwo)
          .map(val => val + 1);

        promised$.subscribe(val => {
          expect(val).to.eql(43);
          done();
        });
      });

      it('should use Multi Value, Asynchronous', () => {
        const click$ = Rx.Observable
          .fromEvent(document, 'click')
          .map(event => event.target.textContent)
          .subscribe(val => {
            console.log(val);
          })
      });
    });
  });

  describe('2.4 Consuming data with observers', () => {

    describe('2.4.1 The Observer API', () => {
      it('should review observer structure', () => {
        const observer = {
          next() { },
          error() { },
          complete() { }
        }
      });
    });

    describe('2.4.2 Creating Bar Observables', () => {
      it('should create manually just for learning process', () => {
        const observable = events => {
          const INTERVAL = 1 * 10;
          let schedulerId;

          return {
            subscribe: observer => {
              schedulerId = setInterval(() => {
                if (events.length === 0) {
                  observer.complete();
                  clearInterval(schedulerId);
                  schedulerId = undefined;
                }
                else {
                  observer.next(events.shift());
                }
              }, INTERVAL);
              return {
                unsubscribe: () => {
                  if (schedulerId) {
                    clearInterval(schedulerId);
                  }
                }
              };
            }
          }
        };

        const subscription = observable([1, 2, 3]).subscribe({
          next(val) { console.log('manual observer:' + val) },
          complete() { console.log('completed') }
        });

        // subscription.unsubscribe();
      });

      it('should use Rx.Observer.create() to make own observables', (done) => {
        const source$ = Rx.Observable.create(observer => {
          observer.next('4');
          observer.next('5');
          observer.next('6');
          observer.complete();
        });

        let result = '';

        source$.subscribe(val => {
          result += val;
        }, null, () => {
          expect(result).to.eql('456');
          done();
        });
      });
    });

    describe('2.4.3 Observable modules', () => {
      it('should create simple percentage counter', () => {
        const progressBar$ = Rx.Observable.create(observer => {
          const OFFSET = 5;
          const SPEED = 5;
          let i = 1;

          const progress = () => {
            if (i > 100) {
              observer.complete();
            } else {
              observer.next(i);
              i = i + 1;
              setTimeout(progress, SPEED);
            }
          }

          setTimeout(progress, OFFSET);
        });

        progressBar$.subscribe(progress => {
          console.log(progress);
        })
      });

      it('should handle also errors', (done) => {
        const computeFutureValue = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('boo!'));
          }, 0);
        });

        Rx.Observable.fromPromise(computeFutureValue)
          .subscribe(
          val => {
          },
          err => {
            expect(err.message).to.eql('boo!');
            done();
          },
          () => {
          });
      });

    });
  });
});
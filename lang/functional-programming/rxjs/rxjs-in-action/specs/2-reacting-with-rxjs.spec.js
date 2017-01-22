import { expect } from 'chai';
import EventEmitter from 'events'
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import { myobservable, myobserver } from '../src/observable';

describe('2 Reacting with RxJS', () => {
  describe('2.1 Functional Programming As The Pillar of Reactive', () => {
    describe('2.1.2 The Iterator Pattern', () => {
      it('should use Symbol.iterator to make buffered array iterator', () => {
        let BufferIterator = function (arr, bufSize = 2) {
          this[Symbol.iterator] = function () {
            let nextIndex = 0;

            return {
              next() {
                if (nextIndex > arr.length) {
                  return {
                    done: true
                  }
                } else {
                  let buffer = new Array(bufSize);
                  for (let i = 0; i < bufSize; i++) {
                    buffer[i] = arr[nextIndex++]
                  }
                  return {
                    value: buffer,
                    done: false
                  }
                }
              }
            }
          }
        }

        let result = [];
        for (let buf of new BufferIterator([1, 2, 3, 4, 5, 6], 2)) {
          result.push(buf);
        }

        expect(result[0]).to.eql([1, 2]);
        expect(result[1]).to.eql([3, 4]);
        expect(result[2]).to.eql([5, 6]);
      });
    });
  });

  describe('2.3 Wrapping data sources with Rx.Observable', () => {
    describe('2.3.2 Creating RxJS Observables', () => {
      it('should notice similarity with string method chaining', () => {
        let result = String('RxJS')
          .toUpperCase()
          .substring(0, 2)
          .concat(' ')
          .repeat(3)
          .trim()
          .concat('!') //-> "RX RX RX!"

        expect(result).to.eql('RX RX RX!');
      });
    });

    describe('2.3.3 When and where to use RxJS', () => {
      it('should use Single-Value, Synchronous', (done) => {
        Rx.Observable
          .of(42).subscribe((val) => {
            expect(val).to.eql(42);
          }, null, done);
      });

      it('should use Multi-Value, Synchronous', (done) => {
        let result = '';
        let spy = sinon.spy();

        Rx.Observable
          .from([1, 2, 3]).subscribe((val) => {
            spy(val);
            result += '' + val;
          }, null, function (v) {
            expect(result).to.eql('123');

            expect(spy.calledWith(1)).to.be.true;
            expect(spy.calledWith(2)).to.be.true;
            expect(spy.calledWith(3)).to.be.true;

            done();
          });
      });

      it('should use Single-Value, Asynchronous', (done) => {
        const fortyTwo = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(42);
          }, 50);
        });

        Rx.Observable.fromPromise(fortyTwo)
          .map(R.inc)
          .subscribe((val) => {
            expect(val).to.eql(43);
            done();
          })
      });

      it('should use Multi-Value, Asynchronous', (done) => {
        class Calculator extends EventEmitter { }

        const calc = new Calculator();

        Rx.Observable.fromEvent(calc, 'add')
          .subscribe((val) => {
            expect(val).to.eql([2, 3]);
            done();
          });

        calc.emit('add', [2, 3]);
      });
    });

    describe('2.3.4 To push or not to push', () => {
      it('should make pull with fibonacci', () => {
        function* fibonacci() {
          let first = 1, second = 1;
          for (; ;) {
            let sum = first + second;
            yield sum;

            first = second;
            second = sum
          }
        }

        let iter = fibonacci();

        expect(iter.next().value).to.eql(2)
        expect(iter.next().value).to.eql(3)
        expect(iter.next().value).to.eql(5)
        expect(iter.next().value).to.eql(8)
      });
    });
  });

  describe('2.4 Consuming data with observers', () => {
    describe('2.4.1 The Observer API', () => {
      it('should review observer API', () => {
        const observer = {
          next: function () {

          },
          error: function () {

          },
          complete: function () {

          }
        }
      });
    });

    describe('2.4.2 Creating bare observables', () => {
      it('should create simplistic version of observable', (done) => {
        let spy = sinon.spy();
        myobservable([1, 2, 3]).subscribe({
          next: (val) => {
            spy(val)
          },
          error: (err) => {

          },
          complete: () => {
            expect(spy.calledThrice).to.be.true;
            expect(spy.calledWith(1)).to.be.true;
            expect(spy.calledWith(2)).to.be.true;
            expect(spy.calledWith(3)).to.be.true;
            done();
          }
        });
      });

      it('should use Rx.Observable.create()', (done) => {
        const source$ = Rx.Observable.create(observer => {
          observer.next(1);
          observer.next(2);
          observer.next(3);
          observer.complete();
        });

        let spy = sinon.spy();

        source$.subscribe(spy, null, () => {
          expect(spy.calledThrice).to.be.true;
          expect(spy.calledWith(1)).to.be.true;
          expect(spy.calledWith(2)).to.be.true;
          expect(spy.calledWith(3)).to.be.true;
          done();
        });
      });
    });

    describe('2.4.3 Observable modules', () => {
      it('should build own observable for progress bar', (done) => {
        const progressBar$ = Rx.Observable.create(observer => {
          const OFFSET = 0;
          const SPEED = 0;

          let val = 0;
          function progress() {
            if (val < 100) {
              observer.next(++val)
              setTimeout(progress, SPEED)
            } else {
              observer.complete()
            }
          }

          setTimeout(progress, OFFSET);
        });

        let spy = sinon.spy();

        progressBar$.subscribe(
          spy,
          spy,
          () => {
            expect(spy.callCount).to.eql(100);
            done();
          }
        )
      });

      it('should handle resolved Promise', (done) => {
        let myPromise = Promise.resolve(42);
        let myStream$ = Rx.Observable.fromPromise(myPromise);

        let spy = sinon.spy();

        myStream$.subscribe(spy, null, () => {
          expect(spy.calledWith(42)).to.be.true;
          done();
        })
      });
    });
  });
});
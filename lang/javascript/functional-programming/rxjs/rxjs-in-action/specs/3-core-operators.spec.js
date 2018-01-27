import { expect } from 'chai';
import * as sinon from 'sinon';
import EventEmitter from 'events';
import * as Rx from 'rxjs';

describe('3 Core Operators', () => {
  describe('3.1 Evaluating and Cancelling Streams', () => {
    describe('3.1.3 Disposing of subscriptions: explicit cancellation', () => {
      it('should manually unsubscribe from event', () => {
        const mouseClicks = Rx.Observable.fromEvent(document, 'mouseup');
        const subscription = mouseClicks.subscribe(() => { });

        subscription.unsubscribe();
      });
    });
  });

  describe('3.2 Popular RxJS Observable Operators', () => {
    describe('3.2.1 Introducing the Core Operators', () => {
      describe('map', () => {
        it('should map consecutive values from stream', (done) => {
          const spy = sinon.spy();

          const addSixPercent = x => x = x + (x * 0.06);
          Rx.Observable.of(10, 20, 30)
            .map(addSixPercent)
            .subscribe(spy, null, () => {
              expect(spy.callCount).to.eql(3);
              expect(spy.calledWith(10.6)).to.be.true;
              expect(spy.calledWith(21.2)).to.be.true;
              expect(spy.calledWith(31.8)).to.be.true;

              done();
            });
        });

        it('should count words', (done) => {
          Rx.Observable.from(['The quick brown fox', 'jumps over the lazy dog'])
            .map(str => str.split(' '))
            .do(console.log)
            .subscribe(val => {
            }, null, done);
        });
      });

      describe('.filter()', () => {
        it('should filter only numerical codes', () => {
          Rx.Observable
            .fromEvent(document, 'keyup')
            .pluck('keyCode')
            .filter(code => code >= 48 && code <= 57)
            .do(console.log)
            .subscribe();
        });
      });

      describe('.reduce()', () => {
        it('should reduce to single value', (done) => {
          const add = (a, b) => a + b;

          Rx.Observable.from([
            {
              name: 'piotr',
              rate: 850
            },
            {
              name: 'ben',
              rate: 465
            }
          ])
            .pluck('rate')
            .reduce(add, 0)
            .subscribe(val => {
              expect(val).to.eql(1315);
              done();
            })
        });
      });

      describe('.scan()', () => {
        it('should scan to single value with intermediary results', (done) => {
          const spy = sinon.spy();
          const add = (a, b) => a + b;

          Rx.Observable.from([
            {
              name: 'piotr',
              rate: 850
            },
            {
              name: 'ben',
              rate: 465
            }
          ])
            .pluck('rate')
            .scan(add, 0)
            .subscribe(spy, null, () => {
              expect(spy.calledTwice).to.be.true;
              expect(spy.calledWith(850)).to.be.true;
              expect(spy.calledWith(1315)).to.be.true;

              done();
            });
        });
      });
    });
  });

  describe('3.3 Sequencing Operator Pipelines with Aggregates', () => {
    describe('3.3.1 Self-Contained Pipelines and Referential Transparency', () => {
      it('should build own operator', (done) => {
        function exclude(predicate) {
          return Rx.Observable.create(subscriber => {
            let source = this;
            return source.subscribe(value => {
              try {
                if (!predicate(value)) {
                  subscriber.next(value);
                }
              }
              catch (err) {
                subscriber.error(err);
              }
            },
              err => subscriber.error(err),
              () => subscriber.complete());
          });
        }

        Rx.Observable.prototype.exclude = exclude;

        const spy = sinon.spy();

        Rx.Observable.of(10, 20, 30)
          .exclude(val => val < 30)
          .subscribe(spy, null, () => {
            expect(spy.callCount).to.eql(1);
            expect(spy.calledWith(30)).to.be.true;

            done();
          });
      });
    });

    describe('3.3.2 Performance Advantages of Sequencing with RxJS', () => {
      describe('.take()', () => {
        it('should process only n number of items', (done) => {
          let result = '';

          const stream$ = Rx.Observable
            .from([1, 2, 3, 4, 5])
            .take(2)
            .subscribe(val => {
              result += val;
            }, null, () => {
              expect(result).to.eql('12');
              done();
            });
        });
      });

      describe('.first()', () => {
        it('should process only first item', (done) => {
          let result = '';

          const stream$ = Rx.Observable
            .from([1, 2, 3, 4, 5])
            .first()
            .subscribe(val => {
              result += val;
            }, null, () => {
              expect(result).to.eql('1');
              done();
            });
        });
      });

      describe('.last()', () => {
        it('should process only last item', (done) => {
          let result = '';

          const stream$ = Rx.Observable
            .from([1, 2, 3, 4, 5])
            .last()
            .subscribe(val => {
              result += val;
            }, null, () => {
              expect(result).to.eql('5');
              done();
            });
        });
      });

      describe('.min()', () => {
        it('should process only smallest item', (done) => {
          let result = '';

          const stream$ = Rx.Observable
            .from([1, 2, 3, 4, 5])
            .min()
            .subscribe(val => {
              result += val;
            }, null, () => {
              expect(result).to.eql('1');
              done();
            });
        });
      });

      describe('.max()', () => {
        it('should process only biggest item', (done) => {
          let result = '';

          const stream$ = Rx.Observable
            .from([1, 2, 3, 4, 5])
            .max()
            .subscribe(val => {
              result += val;
            }, null, () => {
              expect(result).to.eql('5');
              done();
            });
        });
      });
    });
  });
});
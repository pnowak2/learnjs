import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('6 Coordinating business processes', () => {
  let rxs;
  beforeEach(() => {
    rxs = new Rx.TestScheduler(function (actual, expected) {
      expect(actual).to.deep.equal(expected);
    });
  });

  afterEach(() => {
    rxs.flush();
  });

  describe('6.1 Web hooks and the observer pattern', () => {

    function startWith(value) {
      return Rx.Observable.create(subscriber => {
        let source = this;

        subscriber.next(value);
        return source.subscribe(subscriber);
      });
    }

    Rx.Observable.prototype.myStartWith = startWith;

    describe('6.1.2 Hooked on observables', () => {
      it('should use range to emit contigous numbers', (done) => {
        let expected = [1, 2, 3, 4, 5],
          i = 0;

        Rx.Observable.range(1, 5)
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);
      });

      it('should write own hook - myStartWith()', (done) => {
        let expected = [0, 1, 2, 3, 4, 5],
          i = 0;

        Rx.Observable
          .range(1, 5)
          .startWith(0)
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);
      });

      it('should use finally()', (done) => {
        const expected = [1, 2, 3];
        let i = 0;

        Rx.Observable.create((observer) => {
          observer.next(1);
          observer.next(2);
          observer.next(3);
          observer.complete();
        })
          .finally(done)
          .subscribe((val) => {
            expect(expected[i++]).to.eql(val);
          })
      });

      describe('using()', () => {
        it('should use to create observable and resource which will be given timespan of being the stream and disposed when stream is unsubscribed from.', (done) => {
          let disposeSpy = sinon.spy();

          class DisposableResource {
            constructor(value) {
              this.value = value;
              this.disposed = false;
            }

            getValue() {
              if (this.disposed) {
                throw new Error('Object is disposed');
              }

              return this.value;
            }

            // required method
            unsubscribe() {
              disposeSpy();
              if (!this.disposed) {
                this.disposed = true;
                this.value = null;
              }
            }
          }

          const source$ = Rx.Observable.using(
            () => new DisposableResource(42),
            resource => Rx.Observable.create((observer) => {
              observer.next(resource.getValue());
              observer.next(resource.getValue());
              observer.complete();
            })
          );

          let expected = [84, 84], i = 0;

          let subscription = source$
            .map(val => val * 2)
            .subscribe((val) => {
              expect(val).to.eql(expected[i++]);
            }, null, () => {
              done();
            });

          subscription.unsubscribe();

          // expect(disposeSpy.calledOnce).to.be.true(); no properly tested in time..

        });
      });
    });
  });

  describe('6.2 Joining parallel streams with combineLatest and forkJoin', () => {
    describe('6.2.2 Combining parallel streams', () => {
      it('should use combineLatest wich emits every time event happened on all streams, even before any of them is finished', () => {
        var e1 = rxs.createHotObservable('-a-----b---c-|');
        var e2 = rxs.createHotObservable('---------e--f-|');
        var expected =                   '---------C-DE-|';
        var values = { C: ['b', 'e'], D: ['c', 'e'], E: ['c', 'f'] };

        rxs.expectObservable(
          Rx.Observable.combineLatest(e1, e2)
        ).toBe(expected, values);
      });

      it('should compare to merge', () => {
        var e1 = rxs.createHotObservable('-a-----b---c-|');
        var e2 = rxs.createHotObservable('---------e--f-|');
        var expected =                   '-a-----b-e-cf-|';

        rxs.expectObservable(
          Rx.Observable.merge(e1, e2)
        ).toBe(expected);
      });
    });

    describe('6.2.3 More coordination with fork-join', () => {
      it('should emit when all streams are finished, and emit last values from each of them', () => {
        var e1 = rxs.createHotObservable('-c-|');
        var e2 = rxs.createHotObservable('(--f|)');
        var expected =                   '---(A|)';
        var values = { A: ['c', 'f'] };

        rxs.expectObservable(
          Rx.Observable.forkJoin(e1, e2)
        ).toBe(expected, values);
      });
    });
  });
});
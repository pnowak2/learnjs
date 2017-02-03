import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('5 Applied Reactive Streams', () => {
  let rxs;
  beforeEach(() => {
    rxs = new Rx.TestScheduler(function (actual, expected) {
      console.log('act..', actual);
      console.log('exp..', actual);
      expect(actual).to.deep.equal(expected);
    });
  });

  afterEach(() => {
    rxs.flush();
  });

  describe('5.1 One for all, and all for one! ', () => {
    describe('5.1.1 Interleave events by merging streams', () => {
      it('should merge two streams to one stream using static form Rx.Observable.merge(e1, e2)', () => {
        var e1 = rxs.createHotObservable('-a--b--c-|');
        var e2 = rxs.createHotObservable('--d--e--f-|');
        var expected = '-ad-be-cf-|';

        rxs.expectObservable(
          Rx.Observable.merge(e1, e2)
        ).toBe(expected);
      });

      it('should merge two streams to one stream using instance form e1.merge(e2)', () => {
        var e1 = rxs.createHotObservable('-a-b--|');
        var e2 = rxs.createHotObservable('-----c|');
        var expected = '-a-b-c|';

        rxs.expectObservable(
          e1.merge(e2)
        ).toBe(expected);
      });

      it('should merge in order when synchronous data sources are used', (done) => {
        let expected = [1, 2, 3, 'a', 'b', 'c'],
          i = 0;

        let source1$ = Rx.Observable.of(1, 2, 3);
        let source2$ = Rx.Observable.of('a', 'b', 'c');

        Rx.Observable.merge(source1$, source2$)
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);
      });
    });

    describe('5.1.2 Preserve order of events by concatenating streams', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should preserve order of streams while merging them', (done) => {
        let expected = [[1, 2, 3], 'a', 'b', 'c'],
          i = 0;

        const source1$ = Rx.Observable.create((observer) => {
          setTimeout(function () {
            observer.next([1, 2, 3]);
            observer.complete();
          }, 3000);
        });
        const source2$ = Rx.Observable.of('a', 'b', 'c');

        Rx.Observable
          .concat(source1$, source2$)
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);

        clock.tick(3000);

      });
    });
  });
});
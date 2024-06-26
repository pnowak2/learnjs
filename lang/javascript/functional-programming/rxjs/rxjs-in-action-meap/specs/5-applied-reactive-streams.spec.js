import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('5 Applied Reactive Streams', () => {
  let rxs;
  beforeEach(() => {
    rxs = new Rx.TestScheduler(function (actual, expected) {
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
        let expected = ['a', 'b', 'c', [1, 2, 3]],
          i = 0;

        const source1$ = Rx.Observable.create((observer) => {
          setTimeout(function () {
            observer.next([1, 2, 3]);
            observer.complete();
          }, 3000);
        });
        const source2$ = Rx.Observable.of('a', 'b', 'c');

        Rx.Observable
          .concat(source2$, source1$)
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);

        clock.tick(3000);

      });
    });

    describe('5.1.3 Switch to the latest observable data', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should switch to another stream, given by previous operation (mapTo in this case)', (done) => {
        let expected = [0, 1, 2, 3, 4, 5/*, ... */],
          i = 0;

        Rx.Observable
          .from(['a', 'b', 'c'])
          .mapTo(Rx.Observable.timer(100))
          .switch()
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);

        clock.tick(200);
      });
    });
  });

  describe('5.2 Unwinding nested observables: .mergeMap()', () => {
    describe('5.2.1 Flattening nested observables', () => {
      it('should flatten nested observables to provider, subscriber gets final result without further processing', (done) => {
        let expected = ['a ajax call', 'b ajax call', 'c ajax call'],
          i = 0;

        Rx.Observable
          .of('a', 'b', 'c')
          .mergeMap((x) => {
            return Rx.Observable.of(x + ' ajax call')
          })
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);
      });

      it('should first map and then merge (flat) map', (done) => {
        let expected = ['a ajax call', 'b ajax call', 'c ajax call'],
          i = 0;

        // equivalent (i think so)

        Rx.Observable
          .of('a', 'b', 'c')
          .map(x => Rx.Observable.of(x + ' ajax call'))
          .mergeMap(R.identity) // same as x => x
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);
      });

      it('should be same as subscribing in nested call (not recommended), thats why mergeMap (flatMap - alias) is used', (done) => {
        let expected = ['a ajax call', 'b ajax call', 'c ajax call'],
          i = 0;

        // equivalent (i think so)

        Rx.Observable
          .of('a', 'b', 'c')
          .map(x => Rx.Observable.of(x + ' ajax call'))
          .subscribe((x) => {
            x.subscribe((y) => {
              expect(expected[i++]).to.eql(y)
            })
          }, () => { }, done);
      });
    });
  });

  describe('5.3 Mastering asynchronous streams', () => {
    describe('5.3.1 distinctUntilChanged()', () => {
      it('should emit value only if sequencial values are distinct', (done) => {
        let expected = ['a', 'b', 'c'],
          i = 0;

        Rx.Observable
          .of('a', 'a', 'a', 'b', 'b', 'c')
          .distinctUntilChanged()
          .subscribe((x) => {
            expect(expected[i++]).to.eql(x)
          }, () => { }, done);
      });
    });
  });

  describe('5.4 Drag and drop with concatMap', () => {
    describe('5.4.1 Different ways for same thing', () => {
      it('Using mergeMap()', () => {
        var down = rxs.createHotObservable('-d-----|');
        var up =   rxs.createHotObservable('-----u-|');
        var move = rxs.createHotObservable('--mmmmmmmmmmm|');
        var expected =                     '--mmm--|';

        rxs.expectObservable(
          down.mergeMap(() => move.takeUntil(up))
        ).toBe(expected);
      });

      it('Using concatMap()', () => {
        var down = rxs.createHotObservable('-d-----|');
        var up =   rxs.createHotObservable('-----u-|');
        var move = rxs.createHotObservable('--mmmmmmmmmmm|');
        var expected =                     '--mmm--|';

        rxs.expectObservable(
          down.concatMap(() => move.takeUntil(up))
        ).toBe(expected);
      });

      it('Using map and mergeMap()', () => {
        var down = rxs.createHotObservable('-d-----|');
        var up =   rxs.createHotObservable('-----u-|');
        var move = rxs.createHotObservable('--mmmmmmmmmmm|');
        var expected =                     '--mmm--|';

        rxs.expectObservable(
          down
            .mapTo(move.takeUntil(up))
            .mergeMap(x => x)
        ).toBe(expected);
      });

      it('Using switch()', () => {
        var down = rxs.createHotObservable('-d-----|');
        var up =   rxs.createHotObservable('-----u-|');
        var move = rxs.createHotObservable('--mmmmmmmmmmm|');
        var expected =                     '--mmm--|';

        rxs.expectObservable(
          down
            .mapTo(move.takeUntil(up))
            .switch()
        ).toBe(expected);
      });
    });
  });
});
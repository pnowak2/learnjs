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
    });
  });
});
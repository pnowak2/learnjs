import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('6 Coordinating business processes', () => {
  let rxs;
  beforeEach(() => {
    rxs = new Rx.TestScheduler(function (actual, expected) {
      // console.log('act..', actual);
      // console.log('exp..', actual);
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
    });
  });
});
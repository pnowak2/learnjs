import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';

describe('3 Core Operators', () => {
  describe('3.2 Popular RxJS observable operators', () => {
    describe('3.2.1 Introducing the core operators', () => {
      describe('.map()', () => {
        it('should map one set of values to another set, same size', (done) => {

          const addSixPercent = x => x + (x * .06);

          let expected = [10.6, 21.2, 31.8, 42.4],
            i = 0;

          Rx.Observable.of(10.0, 20.0, 30.0, 40.0)
            .map(addSixPercent)
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);
        });

        it('should play with marble2', () => {
          const addSixPercent = x => x + (x * .06);

          const rxs = new Rx.TestScheduler(function (actual, expected) {
            expect(actual).to.deep.equal(expected);
          });

          var e1 = rxs.createHotObservable('-a|', { a: 10.0 });
          var expected = '-a|';

          rxs.expectObservable(e1.map(addSixPercent)).toBe(expected, { a: 10.6 });
          rxs.flush();
        });
      });
    });
  });
});
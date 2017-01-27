import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import { rxs, hot, cold, expectObservable, expectSubscriptions } from '../src/rx-test';

describe('3 Core Operators', () => {
  // afterEach(() => rxs.flush());

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

        it('should also test with marble diagrams', () => {
          var e1 =   hot('-x-|', { x: 10.0 });
          var expected = '-y-|';

          const addSixPercent = x => x + (x * .06);

          expectObservable(e1.map(addSixPercent)).toBe(expected, { y: 10.6 });
          rxs.flush()
        });

        it('should map string', () => {
          const a =   cold('--1--2--3--|');
          const expected = '--x--y--z--|';

          const r = a.map(x => x + '!');

          expectObservable(r).toBe(expected, { x: '1!', y: '2!', z: '3!' });
          rxs.flush()
        });
      });
    });
  });
});
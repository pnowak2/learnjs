import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('4 It’s About Time You Used RxJS', () => {
  describe('4.2 Understanding async timing with JavaScript', () => {
    describe('4.2.3 The JavaScript timing interfaces ', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should user timer() to delay events', (done) => {
        let spy = sinon.spy();

        Rx.Observable.timer(1000)
          .subscribe(() => {
            spy();
          },
          () => { },
          () => {
            expect(spy.calledOnce).to.be.true;
            done();
          });

        clock.tick(1000);

      });
    });

    describe('4.3 Back to the future with RxJS', () => {
      describe('4.3.x', () => {
        it('should', () => {
          
        });
      });
    });
  });
});
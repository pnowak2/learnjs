import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Rx from 'rxjs';

describe('5 Applied Reactive Streams', () => {
  describe('5.1 One for all, and all for one!', () => {
    describe('5.1.1 Interleave events by merging streams', () => {
      it('should merge events to one stream', (done) => {
        const spy = sinon.spy();
        const src1$ = Rx.Observable.interval(20).map(x => `Source 1 ${x}`).take(2);
        const src2$ = Rx.Observable.interval(20).map(y => `Source 2 ${y}`).take(2);

        const src$ = Rx.Observable.merge(src1$, src2$);

        src$.subscribe(val => {
          spy(val);
        }, null, () => {
          expect(spy.callCount).to.eql(4);

          expect(spy.getCall(0).calledWith('Source 1 0')).to.be.true;
          expect(spy.getCall(1).calledWith('Source 2 0')).to.be.true;
          expect(spy.getCall(2).calledWith('Source 1 1')).to.be.true;
          expect(spy.getCall(3).calledWith('Source 2 1')).to.be.true;
          done();
        });
      });
    });
  });
});
import { expect } from 'chai';
import * as sinon from 'sinon';
import EventEmitter from 'events';
import * as Rx from 'rxjs';
import { Money } from '../src/stock-ticker/money';

describe('4 Its Time to Use RxJS', () => {
  describe('4.2 Understanding Asynchronous Timing With JavaScript', () => {
    describe('4.2.3 The JavaScript timing interfaces ', () => {
      it('should use .setTimeout() ', (done) => {
        setTimeout(done, 50);
      });

      it('should wrap setTimeout with Observable', (done) => {
        const unsub = sinon.spy();

        const source$ = Rx.Observable.create((observer) => {
          const id = setTimeout(function () {
            observer.next(1);
            observer.complete();
          }, 50);

          return () => { unsub(); clearTimeout(id); }
        });

        const cb = sinon.spy();
        const subscription = source$.subscribe(cb, null, () => {
          expect(cb.calledOnce).to.be.true;
          expect(cb.calledWith(1)).to.be.true;

          subscription.unsubscribe();

          expect(unsub.calledOnce).to.be.true;
          done();
        });
      });

      it('should use Observable.timer() to achieve same effect as above', (done) => {
        const cb = sinon.spy();
        const subscription = Rx.Observable.timer(50).subscribe(cb, null, () => {
          expect(cb.calledOnce).to.be.true;
          expect(cb.calledWith(0)).to.eql(true);

          subscription.unsubscribe();
          done();
        });
      });

      it('should wrap setInterval with Observable', (done) => {
        const unsub = sinon.spy();

        const source$ = Rx.Observable.create((observer) => {
          let i = 0;
          const id = setInterval(function () {
            observer.next(++i);
          }, 5);

          return () => { unsub(); clearInterval(id); }
        });

        const cb = sinon.spy();
        const subscription = source$
          .take(3)
          .subscribe(cb, null, () => {
            expect(cb.calledThrice).to.be.true;
            expect(cb.calledWith(1)).to.be.true;
            expect(cb.calledWith(2)).to.be.true;
            expect(cb.calledWith(3)).to.be.true;

            subscription.unsubscribe();

            expect(unsub.calledOnce).to.be.true;
            done();
          });
      });

      it('should use Observable.interval() to achieve same effect as above', (done) => {
        const cb = sinon.spy();
        const subscription = Rx.Observable
          .interval(5)
          .take(3)
          .subscribe(cb, null, () => {
            expect(cb.calledThrice).to.be.true;
            expect(cb.calledWith(0)).to.eql(true);
            expect(cb.calledWith(1)).to.eql(true);
            expect(cb.calledWith(2)).to.eql(true);

            subscription.unsubscribe();

            done();
          });
      });
    });
  });

  describe('4.3 Back to the Future with RxJS', () => {
    it('should build simple currency generator', () => {
      const source$ = Rx.Observable
        .interval(20)
        .delay(50)
        .timeInterval()
        .do((int) => console.log('time interval: ' + int.interval))
        .skip(1)
        .map(() => {
          return Money('PLN', Math.random() * 100);
        })
        .take(5);

      source$.subscribe(money => {
        console.log(money.toString());
      });
    });

    describe('4.3.1', () => {
      it('should behave...', () => {

      });
    });
  });
});
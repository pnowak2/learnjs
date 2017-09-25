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

    describe('4.3.1 Propagation', () => {
      it('should spit all array values at once', () => {
        const source$ = Rx.Observable.of([1, 2, 3, 4, 5])

        source$.subscribe(val => {
          expect(val).to.eql([1, 2, 3, 4, 5]);
        });
      });

      it('should check what happens with delay then (all will be delivered at once after delay, because theyre buffered', () => {
        const source$ = Rx.Observable.from([1, 2, 3, 4, 5])
          .delay(1500);

        source$.subscribe(val => {
          console.log(val)
        });
      });
    });

    describe('4.3.2 Sequential Time', () => {
      it('should spit all at once after 6 seconds', () => {
        Rx.Observable.from([1, 2])
          .delay(2000)
          .concat(Rx.Observable.from([3, 4]))
          .delay(2000)
          .concat(Rx.Observable.from([5, 6]))
          .delay(2000)
          .subscribe(console.log);
      });
    });
  });
  
  describe('4.4 Handling User Input', () => {
    describe('4.4.1 Debouncing', () => {
      it('should call handler only after certain time passed since last event', () => {
        Rx.Observable.fromEvent(document, 'click')
          .debounceTime(1000)
          .subscribe(e => {
            console.log('Clicked at: ' + e.clientY);
          });
      });
    });

    describe('4.4.1 Throttling', () => {
      it('should call handler at most once every period (one second here), ignoring all events which are inside time window. This is just limit number of request being made for server i.e.', () => {
        Rx.Observable.fromEvent(document, 'click')
          .throttleTime(1000)
          .subscribe(e => {
            console.log('Clicked at: ' + e.clientY);
          });
      });
    });
  });
  
  describe('4.5 Buffering in RxJS', () => {
    describe('Buffer', () => {
      it('should buffer until buffer observable emits a value', (done) => {
        const src$ = Rx.Observable.timer(0, 40)
          .buffer(Rx.Observable.timer(400))
          .subscribe(val => {
            expect(val).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          }, null, done);
      });
    });

    describe('BufferCount', () => {
      it('should buffer until buffer count is achieved, then start again', (done) => {
        const spy = sinon.spy();

        const src$ = Rx.Observable.of(1, 2, 3, 4, 5)
          .bufferCount(3)
          .subscribe(val => {
            spy(val)
          }, null, () => {
            expect(spy.calledWith([1, 2, 3])).to.be.true;
            expect(spy.calledWith([4, 5])).to.be.true;
            done();
          });
      });
    });
  });
});
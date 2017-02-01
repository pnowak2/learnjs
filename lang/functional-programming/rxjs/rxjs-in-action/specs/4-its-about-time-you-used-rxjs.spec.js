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

        clock.tick(3000);

      });

      it('should user interval() to send events periodically', (done) => {
        let spy = sinon.spy();

        Rx.Observable.interval(1000)
          .skip(1)
          .take(3)
          .subscribe((x) => {
            spy(x);
          },
          () => { },
          () => {
            expect(spy.calledThrice).to.be.true;

            expect(spy.calledWith(1)).to.be.true;
            expect(spy.calledWith(2)).to.be.true;
            expect(spy.calledWith(3)).to.be.true;
            done();
          });

        clock.tick(4000);

      });
    });

    describe('4.4 Handling user input', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      describe('4.4.1 Debouncing', () => {
        it('should emit event after fast burst is done, emmiting last value', (done) => {
          let spy = sinon.spy();

          Rx.Observable
            .create((subscriber) => {
              subscriber.next('one');
              clock.tick(1001);

              subscriber.next('two');
              subscriber.next('three');
              subscriber.next('four');
              subscriber.next('five');

              subscriber.complete();
            })
            .debounceTime(1000)
            .map(x => x.toUpperCase())
            .subscribe((x) => {
              spy(x);
            },
            () => { },
            () => {
              expect(spy.calledTwice).to.be.true;
              expect(spy.calledWith('ONE')).to.be.true;
              expect(spy.calledWith('FIVE')).to.be.true;
              done();
            });
        });
      });

      describe('4.4.2 Throttling', () => {
        it('should throttle events', (done) => {
          let spy = sinon.spy();

          Rx.Observable
            .create((subscriber) => {
              subscriber.next('one');
              subscriber.next('two');
              subscriber.next('three');

              clock.tick(1001);

              subscriber.next('four');
              subscriber.next('five');

              clock.tick(1001);

              subscriber.complete();
            })
            .throttleTime(1000)
            .map(x => x.toUpperCase())
            .subscribe((x) => {
              spy(x);
            },
            () => { },
            () => {
              expect(spy.calledTwice).to.be.true;
              expect(spy.calledWith('ONE')).to.be.true;
              expect(spy.calledWith('FOUR')).to.be.true;
              done();
            });
        });
      });
    });

    describe('4.5 Buffering in RxJS', () => {
      describe('.buffer(observable)', () => {
        it('should emit at once, when buffer observable emits an event', (done) => {
          let spy = sinon.spy();

          Rx.Observable
            .timer(0, 50)
            .buffer(Rx.Observable.timer(500))
            .subscribe((x) => {
              spy(x);
            },
            () => { },
            () => {
              expect(spy.calledOnce).to.be.true;
              expect(spy.calledWith([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).to.be.true;
              done();
            });
        });
      });

      describe('.bufferCount(number)', () => {
        it('should emit at once, when specified numbers of events takes place', (done) => {
          let spy = sinon.spy();

          Rx.Observable
            .timer(0, 5)
            .take(10) // 10 events triggered
            .bufferCount(5) // will send only 2 events
            .subscribe((x) => {
              spy(x);
            },
            () => { },
            () => {
              expect(spy.calledTwice).to.be.true;
              expect(spy.calledWith([0, 1, 2, 3, 4])).to.be.true;
              expect(spy.calledWith([5, 6, 7, 8, 9])).to.be.true;
              done();
            });
        });
      });

      describe('.bufferWhen(selector)', () => {
        let clock;

        beforeEach(() => {
          clock = sinon.useFakeTimers();
        });

        afterEach(() => {
          clock.restore();
        });

        it('should open the buffer immediately, then closes when observable returned by selector returns value', (done) => {
          let spy = sinon.spy();

          Rx.Observable
            .create((subscriber) => {
              subscriber.next('one');
              subscriber.next('two');
              subscriber.next('three');

              clock.tick(60)

              subscriber.next('four');
              subscriber.next('five');

              subscriber.complete();
            })
            .bufferWhen(() => Rx.Observer.timer(50))
            .subscribe((x) => {
              spy(x);
            },
            () => { },
            () => {
              expect(spy.calledTwice).to.be.true;
              // expect(spy.calledWith([0, 1, 2, 3, 4])).to.be.true;
              // expect(spy.calledWith([5, 6, 7, 8, 9])).to.be.true;
              done();
            });
        });
      });
    });
  });
});
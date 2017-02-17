import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('7 Error Handling with RxJS', () => {
  let rxs;
  beforeEach(() => {
    rxs = new Rx.TestScheduler(function (actual, expected) {
      expect(actual).to.deep.equal(expected);
    });
  });

  afterEach(() => {
    rxs.flush();
  });

  class Try {
    constructor(val) {
      this._val = val;
    }

    static of(val) {
      if (val === null || val.constructor === Error || val instanceof Error) {
        return new Failure(val);
      }

      return new Success(val);
    }

    map(fn) {
      try {
        return Try.of(fn(this._val));
      } catch (e) {
        return Try.of(e);
      }
    }
  }

  class Success extends Try {
    getOrElse(anotherVal) {
      return this._val;
    }

    getOrElseThrow(anotherVal) {
      return this._val;
    }
  }

  class Failure extends Try {
    map(fn) {
      return this;
    }

    getOrElse(anotherVal) {
      return anotherVal;
    }

    getOrElseThrow(anotherVal) {
      if (this._val !== null) {
        throw this._val;
      };
    }
  }

  describe('7.3 Understanding the functional error-hanling approach', () => {
    describe('7.3.1 Try Monad', () => {
      it('should use Try in happy scenario', () => {
        const text = Try.of('hello');
        const result = text.map(v => v.toUpperCase());

        expect(result.getOrElse('help !')).to.eql('HELLO');
      });

      it('should use Try in sad scenario', () => {
        const text = Try.of('hello');
        const result = text
          .map((v) => { throw new Error('boom !') })
          .map(v => v.toUpperCase());

        expect(result.getOrElse('help !')).to.eql('help !');
      });
    });
  });

  describe('7.4 The RxJS way of dealing with failure', () => {
    describe('7.4.1 Errors propagated downstream to observers', () => {
      it('should call error handler', (done) => {
        const computeHalf = x => Math.floor(x / 2);

        let i = 0;
        let expected = [1, 2];

        Rx.Observable.of(2, 4, 5, 8, 10)
          .map(num => {
            if (num % 2 !== 0) {
              throw new Error(`Unexpected odd number: ${num}`);
            }
            return num;
          })
          .map(computeHalf)
          .subscribe(
          function next(val) {
            expect(expected[i++]).to.eql(val);
          },
          function (error) {
            expect(error.message).to.eql('Unexpected odd number: 5');
            done();
          },
          function (complete) {
            done();
          });
      });
    });



    describe('7.4.2 Catching and reacting to Errors', () => {
      it('should use catch() which prevents to go further and provides own last value to the stream', (done) => {
        const computeHalf = x => Math.floor(x / 2);

        let i = 0;
        let expected = [1, 2, 3];

        let spy = sinon.spy();

        Rx.Observable.of(2, 4, 5, 8, 10)
          .map(num => {
            if (num % 2 !== 0) {
              throw new Error(`Unexpected odd number: ${num}`);
            }
            return num;
          })
          .catch(err => Rx.Observable.of(6))
          .map(computeHalf)
          .subscribe(
          function next(val) {
            expect(expected[i++]).to.eql(val);
            spy(val);
          },
          function (error) {
            expect(spy.callCount).to.eql(0);
            done();
          },
          function (complete) {
            expect(spy.callCount).to.eql(3);
            done();
          });
      });
    });

    describe('7.4.3 Retrying failed streams for a fixed number of times', () => {
      it('should receive in catch error but also source stream (to retry)', (done) => {
        let i = 0;
        let expected = [2, 4, 6];

        let spy = sinon.spy();
        let obs$ = Rx.Observable.of(2, 4, 5, 8, 10);

        obs$
          .map(num => {
            if (num % 2 !== 0) {
              throw new Error(`Unexpected odd number: ${num}`);
            }
            return num;
          })
          .catch((err, source) => {
            // console.log(source);
            return Rx.Observable.of(6);
          })
          .subscribe(
          function next(val) {
            expect(expected[i++]).to.eql(val);
            spy(val);
          },
          function (error) {
            expect(spy.callCount).to.eql(0);
            done();
          },
          function (complete) {
            expect(spy.callCount).to.eql(3);
            done();
          });
      });

      it('should use retry(n). tries first time and then repeats additional 3 times', (done) => {
        let i = 0;
        let expected = [2, 4, 2, 4, 2, 4, 2, 4];

        Rx.Observable.of(2, 4, 5, 8, 10)
          .map(num => {
            if (num % 2 !== 0) {
              throw new Error(`Unexpected odd number: ${num}`);
            }
            return num;
          })
          .retry(3)
          .subscribe(
          function next(val) {
            expect(expected[i++]).to.eql(val);
          },
          function (error) {
            expect(error.message).to.eql('Unexpected odd number: 5')
            done();
          },
          function (complete) {
            done();
          });
      });

      it('should use retry(n) with catch() to provide default fallback and complete the sequence', (done) => {
        let i = 0;
        let expected = [2, 4, 2, 4, 2, 4, 2, 4, 6];

        Rx.Observable.of(2, 4, 5, 8, 10)
          .map(num => {
            if (num % 2 !== 0) {
              throw new Error(`Unexpected odd number: ${num}`);
            }
            return num;
          })
          .retry(3)
          .catch(err => Rx.Observable.of(6))
          .subscribe(
          function next(val) {
            expect(expected[i++]).to.eql(val);
          },
          function (error) {
            fail();
            done();
          },
          function (complete) {
            done();
          });
      });
    });
  });
});
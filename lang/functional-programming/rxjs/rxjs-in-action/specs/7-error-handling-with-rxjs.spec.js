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
      it('should', () => {
        
      });
    });
  });
});
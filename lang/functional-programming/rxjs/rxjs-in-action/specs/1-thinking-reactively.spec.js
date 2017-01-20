import { expect } from 'chai';
import EventEmitter from 'events'

describe('1 Thinking Reactively', () => {
  describe('1.1 Synchronous versus asynchronous computing', () => {
    describe('1.1.5 Event Emitters', () => {
      it('should use node EventEmitter', (done) => {
        class Calculator extends EventEmitter { }

        const calc = new Calculator();

        calc.addListener('add', (a, b) => {
          expect(a).to.eql(2);
          expect(b).to.eql(3);
          done();
        });

        calc.emit('add', 2, 3);
      });
    });
  });

  describe("1.2 Better Callback With Promises", () => {
    it('should use promise to do async operations without callback hell (but cannot abort, retry, etc..)', () => {
      let promiseA = new Promise((resolve, fail) => {
        resolve('a');
      }).then((val) => {
        return Promise.resolve(val + 'b');
      }).then((val) => {
        expect(val).to.eql('ab');
      });

      return promiseA;
    });
  });

});
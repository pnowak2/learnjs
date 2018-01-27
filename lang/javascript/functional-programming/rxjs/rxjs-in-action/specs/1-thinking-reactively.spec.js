import { expect } from 'chai';
import * as sinon from 'sinon';
import EventEmitter from 'events'

describe('1 Thinking Reactively', () => {
  describe('1.1 Synchronous versus asynchronous computing', () => {
    describe('1.1.5 Event Emitters', () => {
      it('should use node EventEmitter', (done) => {
        class Calculator extends EventEmitter { }
        const calc = new Calculator();

        calc.addListener('add', (a, b) => {
          expect(a).to.eql(3);
          expect(b).to.eql(5);
          done();
        })

        calc.emit('add', 3, 5);

      });
    });
  });

  describe('1.2 Better callbacks with Promises', () => {
    it('should understand promises chaining', () => {
      const ajax1 = () => {
        return Promise.resolve('users/');
      }

      const ajax2 = (users) => {
        return new Promise((res, rej) => res(users + 'professions/'));
      }

      const ajax3 = (professions) => {
        return new Promise((res, rej) => res(professions + 'items'));
      }

      return ajax1()
        .then(users => ajax2(users))
        .then(professions => ajax3(professions))
        .then((val) => {
          expect(val).to.eql('users/professions/items');
        });
    });
  });
  
  describe('1.4 The Reactive Extensions for JavaScript', () => {
    describe('1.4.1 Thinking in streams', () => {
      it('should give idea how streams might work', () => {
        const A$ = [20];
        const B$ = [22];

        const C$ = A$.concat(B$).reduce((a, b) => a + b, 0);

        expect(C$).to.eql(42);

        A$.push(100);

        expect(C$).to.eql(42); // its only idea given in the book..
      });
    });
  });
});
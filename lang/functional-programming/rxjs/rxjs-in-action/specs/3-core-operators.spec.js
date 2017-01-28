import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

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

        it('should map array of strings', (done) => {
          let expected = [['hello', 'world'], ['its', 'me']],
            i = 0;

          Rx.Observable.from([
            'hello world',
            'its me'
          ]).map((str => str.split(' ')))
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);
        });
      });

      describe('.filter()', () => {
        it('should remove unwanted elements', (done) => {
          let expected = [2, 3, 4],
            i = 0;

          Rx.Observable.from([
            'a', 2, 'hello', 3, Object, 4
          ]).filter(x => !isNaN(x))
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);
        });

        it('should remove unwanted elements using Rx.Observable.fromEvent', (done) => {
          let expected = [2, 3, 4],
            i = 0;

          const emitter = new EventEmitter();

          Rx.Observable.fromEvent(emitter, 'items')
            .take(6)
            .filter(x => !isNaN(x))
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);

          emitter.emit('items', 'a');
          emitter.emit('items', 2);
          emitter.emit('items', 'hello');
          emitter.emit('items', 3);
          emitter.emit('items', Object);
          emitter.emit('items', 4);
        });

        it('should filter job candidates', (done) => {
          let expected = [{ name: 'Brendan Eich', experience: 'JavaScript Inventor' }],
            i = 0;

          let candidates = [
            { name: 'Brendan Eich', experience: 'JavaScript Inventor' },
            { name: 'Emmet Brown', experience: 'Historian' },
            { name: 'George Lucas', experience: 'Sci-fi writer' },
            { name: 'Alberto Perez', experience: 'Zumba Instructor' },
            { name: 'Bjarne Stroustrup', experience: 'C++ Developer' }
          ];

          const hasJsExperience = exp => exp.toLowerCase().includes('javascript');

          Rx.Observable.from(candidates)
            .take(5)
            .filter(c => hasJsExperience(c.experience))
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);
        });
      });

      describe('.reduce(). Accumulates everything then emits event.', () => {
        it('should sum all spendings', (done) => {
          let expected = [725],
            i = 0;

          Rx.Observable.from([
            { date: '2014', amount: -320.0 },
            { date: '2015', amount: 1000.0 },
            { date: '2016', amount: 45.0 },
          ]).take(3)
            .pluck('amount')
            .reduce((acc, amount) => acc + amount, 0)
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);
        });
      });

      describe('.scan()', () => {
        it('should..', (done) => {
          let expected = [725],
            i = 0;

          Rx.Observable.from([
            { date: '2014', amount: -320.0 },
            { date: '2015', amount: 1000.0 },
            { date: '2016', amount: 45.0 },
          ]).take(3)
            .pluck('amount')
            .reduce((acc, amount) => acc + amount, 0)
            .subscribe((x) => {
              expect(expected[i++]).to.eql(x)
            }, () => { }, done);
        });
      });
    });
  });
});
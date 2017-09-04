import { expect } from 'chai';
import Rx from 'rxjs';
import R from 'ramda';
import sinon from 'sinon';
import EventEmitter from 'events';

describe('9 Toward testable, reactive programs', () => {
  let rxs;
  beforeEach(() => {
    rxs = new Rx.TestScheduler(function (actual, expected) {
      expect(actual).to.deep.equal(expected);
    });
  });

  afterEach(() => {
    rxs.flush();
  });

  const ajax = (url, success, error) => {
    setTimeout(function () {
      success({
        url: url,
        data: 'fake response'
      })
    }, 20);
  };

  const ajaxPromise = (url) => {
    return new Promise((resolve, reject) => {
      ajax(url, response => {
        resolve(response);
      });
    });
  }

  describe('9.1 Testing is inherently built into functional programs', () => {
    describe('9.1.0 Testing first function', () => {
      const notEmpty = input => !!input && input.trim().length > 0;

      it('should validate that string is not empty', () => {
        expect(notEmpty(' ')).to.be.false;
      });

      it('should validate that null is not empty', () => {
        expect(notEmpty(null)).to.be.false;
      });

      it('should validate that undefined is not empty', () => {
        expect(notEmpty(undefined)).to.be.false;
      });
    });
  });

  describe('9.2 Testing asynchronous code and promises', () => {
    describe('9.2.1 Testing AJAX Requests', () => {
      it('should use mochas async testing capabilities with done', (done) => {
        const success = (response) => {
          expect(response).to.eql({
            url: '/myurl',
            data: 'fake response'
          });
          done();
        }

        ajax('/myurl', success, null);
      });
    });

    describe('9.2.2 Working with promises', () => {
      it('should use mochas async testing capabilities for testing promises', (done) => {
        ajaxPromise('/mypromiseurl')
          .then((response) => {
            expect(response).to.eql({
              url: '/mypromiseurl',
              data: 'fake response'
            });
            done();
          })
          .catch(error => {
            expect(error).to.eql('test')
          });
      });

      it('should use mochas async testing capabilities for testing promises', () => {
        return ajaxPromise('/mypromiseurl').then(response => {
          expect(response).to.eql({
            url: '/mypromiseurl',
            data: 'fake response'
          });
        })
      });
    });
  });

  describe('9.3 Testing reactive stream', () => {
    const adder = (a, b) => a + b;

    it('should reduce numbers in array', () => {
      Rx.Observable.from([1, 2, 3, 4])
        .reduce(adder)
        .subscribe(result => {
          expect(result).to.eql(10);
        });
    });

    it('should reduce numbers using generator', () => {
      function* numbers() {
        let start = 0;
        while (true) {
          yield start++;
        }
      }

      // let gen = numbers();
      // expect(gen.next().value).to.eql(0);
      // expect(gen.next().value).to.eql(1);

      Rx.Observable.from(numbers)
        .take(5)
        .reduce(adder)
        .subscribe(result => {
          expect(result).to.eql(10);
        });
    });

    it('should reduce numbers with delay', (done) => {
      Rx.Observable.from([1, 2, 3, 4])
        .reduce(adder)
        .delay(60)
        .subscribe(result => {
          expect(result).to.eql(10);
        }, null, done);
    });

    it('should make ajax query, bad practice, should not recreate stream in tests..', (done) => {
      const searchTerm = 'reactive';
      const url = `http://search.com/search/${searchTerm}`;
      const testFn = query => Rx.Observable.fromPromise(ajaxPromise(query))
        .subscribe(response => {
          expect(response).to.have.property('url').and.eql('http://search.com/search/reactive');
        }, null, done);

      testFn(url);
    });
  });

  describe('9.4 Making streams testable. Separating Observer from Pipeline and from Subscription', () => {
    describe('Non testable, coupled version', () => {
      it('should have non testable version to consider and unlearn bad practices', (done) => {

        // Stream making business logic, very coupled, non testable
        Rx.Observable.interval(10) // Producer coupled with pipeline
          .take(10)
          .filter(num => num % 2 === 0) // business logic coupled with pipeline
          .map(num => num * num) // business logic coupled with pipeline
          .reduce((total, delta) => total + delta) // business logic coupled with pipeline
          .subscribe({ // Potentially Consumer coupled with source and pipeline..
            next: total => expect(total).to.eql(120),
            err: err => assert.fail(err.message),
            complete: done
          })
      });
    });

    describe('Testable, decomposed version, split business logic from pipeline, decouple consumer and pipeline, wrap stream into function which can be called', () => {
      // Business logic decoupled, separated and testable
      const isEven = num => num % 2 === 0;
      const square = num => num * num;
      const add = (a, b) => a + b;

      // Decoupled pipeline from producer and business logic
      const runInterval = (source$) => source$
        .take(10)
        .filter(isEven)
        .map(square)
        .reduce(add);

      // Testing everything separately in isolation
      describe('.isEven()', () => {
        it('should check if number is even', () => {
          expect(isEven(4)).to.be.true;
          expect(isEven(1)).to.be.false;
        });
      });

      describe('.square()', () => {
        it('should check if number is squared', () => {
          expect(square(4)).to.eql(16);
        });
      });

      describe('.add()', () => {
        it('should check if given numbers are added', () => {
          expect(add(4, 8)).to.eql(12);
        });
      });

      describe('Testing just the Pipeline with arbitrary producer', () => {
        it('should square and add even numbers', (done) => {
          runInterval(Rx.Observable.interval(10))
            .subscribe({
              next: total => expect(total).to.eql(120),
              err: err => assert.fail(err.message),
              complete: done
            })
        });
      });
    });
  });

  describe('9.5 Scheduling values in rxjs', () => {
    describe('Rx.Scheduler', () => {
      xit('should schedule set of actions', () => {
        let stored = [];
        const store = state => stored.push(state);

        let scheduler = Rx.Scheduler.queue;

        scheduler.schedule(store(1));
        scheduler.schedule(store(2));
        scheduler.schedule(store(3));

        expect(stored).to.deep.equal([1, 2, 3]);
      });

      it('should emit values synchronousely on default scheduler', () => {
        let temp = [];

        Rx.Observable.range(1, 5)
          .do([].push.bind(temp))
          .subscribe(value => {
            expect(temp).to.have.length(value);
            expect(temp).to.contain(value);
          })
      });

      it('should emit values on an asynchronous scheduler', (done) => {
        let temp = [];
        Rx.Observable.range(1, 5, Rx.Scheduler.async)
          .do([].push.bind(temp))
          .subscribe(value => {
            expect(temp).to.have.length(value);
            expect(temp).to.contain(value);
          }, done, done);
      });
    });
  });

  describe('9.6 Augmenting virtual reality', () => {
    it('should create test scheduler', () => {
      let scheduler = new Rx.TestScheduler();
      let time = scheduler.createTime('-----|');
      expect(time).to.equal(50);
    });

    describe('9.6.1 Playing with marbles', () => {
      it('should parse a marble string into a series of notifications', () => {
        let result = Rx.TestScheduler.parseMarbles(
          '--a---b---|',
          { a: 'A', b: 'B' }
        );

        expect(result).to.eql([
          { frame: 20, notification: Rx.Notification.createNext('A') },
          { frame: 60, notification: Rx.Notification.createNext('B') },
          { frame: 100, notification: Rx.Notification.createComplete() }
        ])
      });

      it('should write and pass marble test', () => {
        let scheduler = new Rx.TestScheduler(function (actual, expected) {
          expect(actual).to.deep.equal(expected);
        });

        let source = scheduler.createColdObservable(
          '--1--2--3--4'
        );

        let expected = (
          '--a--b--c--d'
        );

        let r = source.map(x => x * x);

        scheduler.expectObservable(r).toBe(expected,
          { a: 1, b: 4, c: 9, d: 16 }
        );

        scheduler.flush();
      });

      it('should test debounceTime with marble test', () => {
        let scheduler = new Rx.TestScheduler(function (actual, expected) {
          expect(actual).to.deep.equal(expected);
        });

        let source = scheduler.createHotObservable(
          '-a--------b------c----|'
        );

        let expected = '------a--------b------(c|)';

        let r = source.debounceTime(50, scheduler);
        scheduler.expectObservable(r).toBe(expected);
        scheduler.flush();
      });
    });

    describe('9.6.2 Fake it til you make it', () => {
      const isEven = num => num % 2 === 0;
      const square = num => num * num;
      const add = (a, b) => a + b;

      // Decoupled pipeline from producer and business logic
      const runInterval = (source$) => source$
        .take(10)
        .filter(isEven)
        .map(square)
        .reduce(add);

      it('should square and add even numbers', () => {
        let scheduler = new Rx.TestScheduler(function (actual, expected) {
          expect(actual).to.deep.equal(expected);
        });

        let source = scheduler.createColdObservable(
          '-1-2-3-4-5-6-7-8-9-|'
        );

        let expected = '-------------------(s-|)';

        // because decoupled source from pipeline, now it pays off !
        let r = runInterval(source);

        scheduler.expectObservable(r).toBe(expected, { s: 120 });
        scheduler.flush();
      });
    });

    xdescribe('9.6.3 Refactoring our search stream for testability', () => {
      it('should separate source from pipeline and subscriber', () => {

        // Before, all coupled as hell.
        const search$ = Rx.Observable.fromEvent(inputText, 'keyup')
          .pluck('target', 'value')
          .debounceTime(500)
          .filter(notEmpty)
          .do(term => console.log(`Searching with term ${term}`))
          .map(query => URL + query)
          .switchMap(query =>
            Rx.Observable.fromPromise(ajax(query)).pluck('query',
              'search').defaultIfEmpty([]))
          .subscribe(arr => {
            count.innerHTML = `${result.length} results`;
            if (arr.length === 0) {
              clearResults(results);
            }
            else {
              appendResults(results, arr);
            }
          });

        // Separated pipeline from the source and nested observables 
        // const search$ = (source$, fetchResult$, url = '', scheduler = null) =>
        //   source$
        //     .debounceTime(500, scheduler)
        //     .filter(notEmpty)
        //     .do(term => console.log(`Searching with term ${term}`)).map(query => url + query)
        //     .switchMap(fetchResult$)
      });
    });
  });
});
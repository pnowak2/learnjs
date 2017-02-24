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
    const ajax = (url, success, error) => {
      setTimeout(function () {
        success('fake response')
      }, 20);
    };

    const ajaxPromise = (url) => {
      return new Promise((resolve, reject) => {
        ajax(url, response => {
          resolve(response);
        });
      });
    }

    describe('9.2.1 Testing AJAX Requests', () => {
      it('should use mochas async testing capabilities with done', (done) => {
        const success = (response) => {
          expect(response).to.eql('fake response');
          done();
        }

        ajax('/myurl', success, null);
      });
    });

    describe('9.2.2 Working with promises', () => {
      it('should use mochas async testing capabilities for testing promises', (done) => {
        ajaxPromise('/mypromiseurl')
          .then((response) => {
            expect(response).to.eql('fake response');
            done();
          })
          .catch(error => {
            expect(error).to.eql('test')
          });
      });

      it('should use mochas async testing capabilities for testing promises', () => {
        return ajaxPromise('/mypromiseurl').then(response => {
          expect(response).to.eql('fake response');
        })
      });
    });
  });
});
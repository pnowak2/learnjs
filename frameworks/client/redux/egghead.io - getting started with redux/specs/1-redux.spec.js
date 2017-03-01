import { expect } from 'chai';
import { createStore } from 'redux';
import { counter } from '../src/1-redux';

describe('Redux Introduction', () => {
  let store;

  beforeEach(() => {
    store = createStore(counter);
  });

  describe('Counter Reducer', () => {
    it('should be a function', () => {
      expect(counter).to.be.a('function');
    });

    it('should properly handle undefined initial state', () => {
      expect(counter()).to.eql(0);
    });

    it('should properly handle increment action', () => {
      expect(counter(0, { type: 'INCREMENT' })).to.eql(1);
      expect(counter(1, { type: 'INCREMENT' })).to.eql(2);
    });

    it('should properly handle decrement action', () => {
      expect(counter(10, { type: 'DECREMENT' })).to.eql(9);
      expect(counter(6, { type: 'DECREMENT' })).to.eql(5);
    });

    it('should properly handle unknown actions', () => {
      expect(counter(10, { type: 'UNKNOWN' })).to.eql(10);
    });
  });

  describe('Store', () => {
    describe('.getState()', () => {
      it('should be set to initial value', () => {
        expect(store.getState()).to.eql(0);
      });
    });

    describe('.dispatch()', () => {
      it('should dispatch action and get state updated', () => {
        store.dispatch({ type: 'INCREMENT' });
        expect(store.getState()).to.eql(1);
      });
    });

    describe('.subscribe()', () => {
      it('should allow to subscribe each time store changes', (done) => {
        store.subscribe(() => {
          expect(store.getState()).to.eql(-1);
          done();
        });

        store.dispatch({ type: 'DECREMENT' })
      });
    });
  });
});
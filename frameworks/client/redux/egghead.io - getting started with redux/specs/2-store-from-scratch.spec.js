import { expect } from 'chai';
import * as sinon from 'sinon';
import { createStore } from '../src/2-redux-from-scratch';

describe('Redux from Scratch', () => {
  describe('.createStore()', () => {
    it('should be a function', () => {
      expect(createStore).to.be.a('function');
    });

    it('should return object', () => {
      expect(createStore()).to.be.an('object');
    });
  });

  describe('Store', () => {
    describe('.getState()', () => {
      let store;
      let fakeReducer;
      let initialStore;

      beforeEach(() => {
        fakeReducer = sinon.spy();
        initialStore = {};
        store = createStore(fakeReducer, initialStore);
      });

      it('should be defined', () => {
        expect(store.getState).to.be.a('function');
      });

      it('should return passed state', () => {
        expect(store.getState()).to.eql(initialStore);
      });
    });

    describe('.dispatch()', () => {
      let store;
      let fakeReducer;
      let initialStore;
      let modifiedStore;

      beforeEach(() => {
        initialStore = {};
        modifiedStore = { modified: true }
        fakeReducer = sinon.mock().returns(modifiedStore);
        store = createStore(fakeReducer, initialStore);
      });

      it('should be defined', () => {
        expect(store.dispatch).to.be.a('function');
      });

      it('should call reducer', () => {
        const fakeAction = {};
        store.dispatch(fakeAction);

        expect(fakeReducer.callCount).to.eql(1);
      });

      it('should call reducer with initial state and action', () => {
        const fakeAction = {};
        store.dispatch(fakeAction);

        expect(fakeReducer.calledWith(initialStore, fakeAction)).to.be.true;
      });

      it('should modify state', () => {
        const fakeAction = {};
        store.dispatch(fakeAction);

        expect(store.getState()).to.eql(modifiedStore);
      });
    });

    describe('.subscribe()', () => {
      let store;
      let fakeReducer = sinon.spy();

      beforeEach(() => {
        store = createStore(fakeReducer);
      });

      it('should be defined', () => {
        expect(store.subscribe).to.be.a('function');
      });

      it('should register listeners', () => {
        const spy = sinon.spy();
        store.subscribe(spy);

        store.dispatch();

        expect(spy.calledOnce).to.be.true;
      });

      it('should return function which unsubscribes', () => {
        const spy = sinon.spy();
        const unsubscribe = store.subscribe(spy);

        unsubscribe();
        store.dispatch();

        expect(spy.notCalled).to.be.true;
      });
    });
  });
});
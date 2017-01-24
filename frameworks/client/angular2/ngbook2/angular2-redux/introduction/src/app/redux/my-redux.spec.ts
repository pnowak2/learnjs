import { Reducer, Action } from './my-redux';
import { Store } from './my-store';

describe('My Redux', () => {
  describe('Identity reducer', () => {
    let reducer: Reducer<number> = (state: number, action: Action) => state;

    it('should by default return original state', () => {
      const result = reducer(0, null);
      expect(result).toBe(0);
    });
  });

  describe('Adjusting the Counter With actions', () => {
    const incrementAction: Action = {
      type: 'INCREMENT'
    }

    const decrementAction: Action = {
      type: 'DECREMENT'
    }

    const plusSeven: Action = {
      type: 'PLUS',
      payload: 7
    }

    const unknownAction: Action = {
      type: 'UNKNOWN'
    }

    let reducer: Reducer<number> = (state: number, action: Action) => {
      switch(action.type) {
        case 'INCREMENT': 
          return state + 1;
        case 'DECREMENT': 
          return state - 1;
        case 'PLUS': 
          return state + action.payload;
        default:
          return state;
      }
    }

    it('should increment', () => {
      expect(reducer(0, incrementAction)).toBe(1);
      expect(reducer(5, incrementAction)).toBe(6);
    });

    it('should decrement', () => {
      expect(reducer(0, decrementAction)).toBe(-1);
      expect(reducer(6, decrementAction)).toBe(5);
    });

    it('should ignore if action is unknown', () => {
      expect(reducer(0, unknownAction)).toBe(0);
      expect(reducer(6, unknownAction)).toBe(6);
    });

    it('should respect plus action', () => {
      expect(reducer(0, plusSeven)).toBe(7);
      expect(reducer(6, plusSeven)).toBe(13);
      expect(reducer(6, { type: 'PLUS', payload: -2 })).toBe(4);
    });
  });

  describe('Using the Store', () => {
    let reducer: Reducer<number> = (state: number, action: Action) => {
      switch(action.type) {
        case 'INCREMENT': 
          return state + 1;
        case 'DECREMENT': 
          return state - 1;
        case 'PLUS': 
          return state + action.payload;
        default:
          return state;
      }
    }

    it('should dispatch actions', () => {
      let store: Store<number> = new Store(reducer, 0);

      store.dispatch({ type: 'INCREMENT' });
      expect(store.getState()).toBe(1);

      store.dispatch({ type: 'PLUS', payload: 24 });
      expect(store.getState()).toBe(25);
    });
  });
});
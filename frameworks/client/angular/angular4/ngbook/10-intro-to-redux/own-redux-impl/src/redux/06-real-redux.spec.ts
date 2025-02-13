import { AppState, store, MessageActions } from './06-real-redux';
import {
  Action,
  Reducer,
  Store,
  createStore
} from 'redux';

describe('Real Redux', () => {
  it('should use real redux', () => {
    const action = MessageActions.addMessage('Hello world');
    store.dispatch(action);

    expect(store.getState().messages[0]).toEqual('Hello world');
  });
});

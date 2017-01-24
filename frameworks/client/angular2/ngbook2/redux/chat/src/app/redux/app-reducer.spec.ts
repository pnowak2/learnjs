import { Reducer, Action, Store } from './mini-redux';
import { AddMessageAction, DeleteMessageAction, AppState, reducer } from './app-reducer';
import { MessageActions } from './message-actions';

describe('App Reducer', () => {
  it('should add messages to the store', () => {
    let store: Store<AppState> = new Store<AppState>(reducer, { messages: [] });

    store.dispatch(
      MessageActions.addMessage('Would you say the fringe was made of silk?'));
    store.dispatch(
      MessageActions.addMessage('Wouldnt have no other kind but silk'));
    store.dispatch(
      MessageActions.addMessage('Has it really got a team of snow white horses ?'));

    expect(store.getState()).toEqual({
      messages: [
        'Would you say the fringe was made of silk?',
        'Wouldnt have no other kind but silk',
        'Has it really got a team of snow white horses ?'
      ]
    })
  });
});
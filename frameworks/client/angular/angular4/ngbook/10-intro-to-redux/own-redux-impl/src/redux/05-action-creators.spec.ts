import { MessageActions } from './05-action-creators';
import { AppState, reducer, AddMessageAction } from './04-messages-reducer';
import { Store } from './lib/mini-redux';

describe('Action creators', () => {
  it('should have 1 message in the store', () => {
    const store: Store<AppState> = new Store<AppState>(reducer, { messages: [] });
    const action = MessageActions.addMessage('Hello world');

    store.dispatch(action);

    expect(store.getState().messages[0]).toEqual('Hello world');
  });
});

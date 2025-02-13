import { AppState, reducer, AddMessageAction } from './04-messages-reducer';
import { Store } from './lib/mini-redux';

describe('Messages Reducer', () => {
  it('should have 3 messages in store', () => {
    const store: Store<AppState> = new Store<AppState>(reducer, { messages: [] });

    store.dispatch({
      type: 'ADD_MESSAGE',
      message: 'Would you say the fringe was made of silk ?'
    } as AddMessageAction);

    store.dispatch({
      type: 'ADD_MESSAGE',
      message: 'Wouldnt have no other kind but silk'
    } as AddMessageAction);

    store.dispatch({
      type: 'ADD_MESSAGE',
      message: 'Has it really got a team of snow white horses?'
    } as AddMessageAction);

    expect(store.getState().messages.length).toBe(3);
    expect(store.getState().messages[1]).toEqual('Wouldnt have no other kind but silk');
  });
});

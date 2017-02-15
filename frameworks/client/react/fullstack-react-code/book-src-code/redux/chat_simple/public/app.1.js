function createStore(reducer, initialState) {
  let listeners = [];

  let state = initialState;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener.call())
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message)
    }
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index + 1, state.messages.length),
      ]
    }
  } else {
    return state;
  }
}

const initialState = { messages: [] }
const store = createStore(reducer, initialState);

const listener = () => {
  console.log('listener notified', store.getState());
}

store.subscribe(listener);

const addMessageAction1 = {
  type: 'ADD_MESSAGE',
  message: 'How does it look, Neil?'
}

store.dispatch(addMessageAction1);
const stateV1 = store.getState();

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'Looking good.'
}

store.dispatch(addMessageAction2);
const stateV2 = store.getState();

console.log('state v1', stateV1);
console.log('state v2', stateV2);

const deleteMessageAction = {
  type: 'DELETE_MESSAGE',
  index: 1
}

store.dispatch(deleteMessageAction);

const stateV3 = store.getState();

console.log('state v3', stateV3);


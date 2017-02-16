function createStore(reducer) {
  let state = 0;

  const getState = () => {
    return state
  };

  const dispatch = (action) => {
    state = reducer(state, action)
  };

  return {
    dispatch,
    getState
  }
}

function reducer(state, action) {
  if(action.type === 'INCREMENT') {
    return state + action.amount
  } else if(action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}

const store = createStore(reducer);

const incrementAction = { type: 'INCREMENT', amount: 5 };
const decrementAction = { type: 'DECREMENT', amount: 11 };

store.dispatch(incrementAction);

console.log(store.getState());

store.dispatch(incrementAction);

console.log(store.getState());

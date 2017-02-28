import { createStore } from 'redux';

export const counter = (state = 0, action = 'unknown') => {
  if(action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

export const store = createStore(counter);
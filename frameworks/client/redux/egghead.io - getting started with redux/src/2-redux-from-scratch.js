export const createStore = (reducer, state) => {
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  }

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}
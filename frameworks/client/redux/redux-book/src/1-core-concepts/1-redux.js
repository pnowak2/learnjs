let state = {
  counter: 3
}

const listeners = [];

function subscribe(callback) {
  listeners.push(callback);
}

function dispatch(action) {
  const newState = reducer(state, action);

  if(newState !== state) {
    state = newState;

    listeners.forEach(listener => listener());
  }
}

function reducer(state, action) {
  switch(action) {
    case 'INC':
      return { ...state, counter: state.counter + 1 }
    case 'DEC':
      return { ...state, counter: state.counter -1 }
    default:
      return state;
  }
}

function updateView() {
  document.querySelector('#counter').innerText  = state.counter;
}

document.querySelector('#inc').onclick = () => { dispatch('INC') };
document.querySelector('#dec').onclick = () => { dispatch('DEC') };

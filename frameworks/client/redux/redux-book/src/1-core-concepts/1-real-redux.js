import {Redux} from 'redux';

function reducer(state, action) {
  switch(action.type) {
    case 'INC':
      return { ...state, counter: state.counter + 1 }
    case 'DEC':
      return { ...state, counter: state.counter -1 }
    default:
      return state;
  }
}

let initialState = {
  counter: 3
}

const store = Redux.createStore(reducer, initialState);

function updateView() {
  document.querySelector('#counter').innerText  = state.counter;
}

store.subscribe(updateView);

updateView();

document.querySelector('#inc').onclick = () => { store.dispatch('INC') };
document.querySelector('#dec').onclick = () => { store.dispatch('DEC') };

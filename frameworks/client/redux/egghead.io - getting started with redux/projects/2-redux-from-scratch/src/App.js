import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

const store = createStore((state = 0, action) => {
  if(action.type === 'INCREMENT') {
    return state + 1;
  } else if(action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
});

export const Counter = ({ value, onInc, onDec }) => (
  <div>
    {value}
    <button onClick={onInc}>Increment</button>
    <button onClick={onDec}>Decrement</button>
  </div>
);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <div className="App">
        <Counter value={store.getState()} 
          onInc={() =>
            store.dispatch({
              type: 'INCREMENT'
            }
          )}
          
          onDec={() =>
            store.dispatch({
              type: 'DECREMENT'
            }
          )} />
      </div>
    );
  }
}



export default App;

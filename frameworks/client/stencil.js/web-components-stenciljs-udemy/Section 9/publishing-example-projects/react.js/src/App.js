import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    showStockFinder: false
  }

  render() {
    let stockFinder = null;

    if (this.state.showStockFinder) {
      stockFinder = <uc-stock-finder></uc-stock-finder>;
    }

    return (
      <span>
        <div className="App">
          <uc-stock-price stock-symbol="AAPL"></uc-stock-price>
        </div>
        { stockFinder}

        <button onClick={() => this.setState({ showStockFinder: true })}>Show Finder</button>
      </span>
    );
  }
}

export default App;

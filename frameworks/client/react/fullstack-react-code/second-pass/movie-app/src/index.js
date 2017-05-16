import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const MOUNT = document.getElementById('root');
const renderApp = Comp => ReactDOM.render(Comp, MOUNT);

if(module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(<NextApp />);
  });
}

renderApp(<App />);

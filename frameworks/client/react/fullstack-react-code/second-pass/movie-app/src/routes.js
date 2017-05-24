import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './views/Home/Home';
import About from './views/About/About';

export const Routes = props => (
  <Router>
    <div className="app">
      <Route 
        path='/' exact
        component={Home}
      />
      <Route 
        path='/about'
        render={(renderProps) => (
          <About {...props} {...renderProps} />
        )}
      />
    </div>
  </Router>
);

export default Routes;
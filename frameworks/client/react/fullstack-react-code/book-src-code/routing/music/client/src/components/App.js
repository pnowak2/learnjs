import React from 'react';

import { Redirect } from 'react-router';
import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer';
import Match from 'react-router/Match';

import Login from './Login';
import Logout from './Logout';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Match pattern='/albums' component={AlbumsContainer} />

      <Match pattern='/login' component={Login} />
      <Match pattern='/logout' component={Logout} />

      <Match exactly pattern='/' render={() => (
        <Redirect to='/albums' />
      )} />
    </div>
  </div>
);

export default App;

import React from 'react';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer';
import Match from 'react-router/Match';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Match pattern='/albums' component={AlbumsContainer} />
    </div>
  </div>
);

export default App;

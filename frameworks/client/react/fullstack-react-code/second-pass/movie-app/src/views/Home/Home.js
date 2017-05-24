import React from 'react';
import { Link } from 'react-router-dom';
import { pageWithLayout } from '../../containers/page';

export const Home = props => (
  <div className='home'>
    <h2>Welcome home</h2>
    <Link to="/about">About us</Link>
  </div>
)

export default pageWithLayout(Home);
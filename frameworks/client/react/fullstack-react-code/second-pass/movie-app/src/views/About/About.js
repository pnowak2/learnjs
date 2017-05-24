import React from 'react';
import { Link } from 'react-router-dom';
import { pageWithLayout } from '../../containers/page';

export const About = props => (
  <div className='about'>
    <h2>About us</h2>
    <Link to="/">Go back home</Link>
  </div>
)

export default pageWithLayout(About);
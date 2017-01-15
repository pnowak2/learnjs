/* eslint-disable no-shadow */
import React from 'react';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

import { client } from '../Client';

const MatchWhenLoggedIn = ({ component: Component, ...rest }) => (
  <Match {...rest} render={(props) => (
    client.isLoggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        // leanpub-start-insert
        state: { from: props.location },
        // leanpub-end-insert
      }} />
    )
  )} />
);

export default MatchWhenLoggedIn;

import PropTypes from 'prop-types';
import React from 'react';

class Container extends React.Component {
  static propTypes = {
    children: PropTypes.oneOf([
      PropTypes.element,
      PropTypes.array
    ])
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

export default Container

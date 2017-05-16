import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = React.createClass({
  displayName: __filename.split('/').slice(-1)[0],

  getInitialState() {
    return { names: [] }
  },

  onFormSubmit(evt) {
    evt.preventDefault();
    let name = this.refs.name.value;
    let names = [...this.state.names, name];
    this.setState({ names })
    this.refs.name.value = '';
  },

  render() {
    return (
      <div>
        <div>
          <h1>Sign Up Sheet</h1>
        </div>

        <form onSubmit={this.onFormSubmit}>
          <input placeholder="Name" ref="name" />
          <input type="submit" />
        </form>

        <h2>Names</h2>
        <ul>
          {this.state.names.map((name, i) => <li key={i}>{name}</li>)}
        </ul>
      </div>
    );
  },
});

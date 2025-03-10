import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = React.createClass({
  displayName: __filename.split('/').slice(-1)[0],

  getInitialState() {
    return { 
      name: '',
      names: [] 
    };
  },

  onNameChange(evt) {
    this.setState({
      name: evt.target.value
    })
  },

  onFormSubmit(evt) {
    const names = [ ...this.state.names, this.state.name ];
    this.setState({ names: names, name: '' });
    evt.preventDefault();
  },

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            value={this.state.name}
            onChange={this.onNameChange}
          />

          <input type='submit' />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
          </ul>
        </div>
      </div>
    );
  },
});

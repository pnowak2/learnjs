import React from 'react';
import isEmail from 'validator/lib/isEmail';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = React.createClass({
  displayName: __filename.split('/').slice(-1)[0],

  getInitialState() {
    return {
      fields: { name: '', email: ''},
      fieldErrors: { },
      people: [],
    };
  },

  onFormSubmit(evt) {
    const people = [
      ...this.state.people
    ];
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    
    this.setState({fieldErrors})
    evt.preventDefault();

    if(Object.keys(fieldErrors).length) return;

    people.push(person);
    this.setState({ people, fields: { name: '', email: ''} });
  },

  onInputChange(evt) {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  },

  validate(person) {
    const errors = {};
    if(!person.name) errors.name = 'Name required';
    if(!person.email) errors.email = 'Email required';
    if(person.email && !isEmail(person.email)) {
      errors.email = 'Invalid Email';
    }

    return errors;
  },

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />

          <span style={{ color: 'red' }}> {this.state.fieldErrors.name} </span>

          <input
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />

          <span style={{ color: 'red' }}> {this.state.fieldErrors.email} </span>

          <input type='submit' />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email }, i) =>
              <li key={i}>{name} ({ email })</li>
            ) }
          </ul>
        </div>
      </div>
    );
  },
});

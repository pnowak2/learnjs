import React, { Component } from 'react';
import { UserInput } from './UserInput/UserInput';
import { UserOutput } from './UserOutput/UserOutput';
import './App.css';

class App extends Component {
  state = {
    username: 'Piotrek'
  }

  changeHandler = (event) => {
    const value = event.target.value;

    this.setState({
      username: value
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput username={this.state.username} changeName={this.changeHandler} />

        <UserOutput username={this.state.username} />
        <UserOutput username="Tom" />
        <UserOutput username="Barbara" />

        <hr />

        <ol>
          <li>Create TWO new components: UserInput and UserOutput</li>
          <li>UserInput should hold an input element, UserOutput two paragraphs</li>
          <li>Output multiple UserOutput components in the App component (any paragraph texts of your choice)</li>
          <li>Pass a username (of your choice) to UserOutput via props and display it there</li>
          <li>Add state to the App component (=> the username) and pass the username to the UserOutput component</li>
          <li>Add a method to manipulate the state (=> an event-handler method)</li>
          <li>Pass the event-handler method reference to the UserInput component and bind it to the input-change event</li>
          <li>Ensure that the new input entered by the user overwrites the old username passed to UserOutput</li>
          <li>Add two-way-binding to your input (in UserInput) to also display the starting username</li>
          <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
        </ol>
      </div>
    );
  }
}

export default App;

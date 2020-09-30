import React, { useState } from 'react';
import Person from './Person/Person';
import './App.css';

const app = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Piotr', age: 40 },
      { name: 'Chris', age: 2 },
      { name: 'Alicja', age: 6 },
    ],
  })

  const [otherState, setOtherState] = useState('some other value');

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Piotrek', age: 41 },
        { name: 'Krzys', age: 3 },
        { name: 'Alicja', age: 7 },
      ],
    });
  }

  return (
    <div className="App" >
      <h1>Hi, I'm a react App</h1>
      <p>This is really working!</p>

      <button onClick={switchNameHandler}>Switch Name</button>

      <Person onSwitch={switchNameHandler} name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
        My Hobbies: Autka
        </Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div >
  );
}

export default app;

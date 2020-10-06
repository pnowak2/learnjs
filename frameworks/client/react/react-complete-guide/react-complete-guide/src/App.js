import React, { useState } from 'react';
import Person from './Person/Person';
import './App.css';

const app = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 'pn', name: 'Piotr', age: 40 },
      { id: 'fd', name: 'Chris', age: 2 },
      { id: 'ed', name: 'Alicja', age: 6 },
    ],
    showPersons: false
  })

  // const [otherState, setOtherState] = useState('some other value');

  const deletePersonHandler = (personIndex) => {
    // const persons = personsState.persons.slice();
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);

    setPersonsState({
      persons: persons,
      showPersons: true
    });
  }

  const nameChangedHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex(p => {
      return id === p.id
    });

    const person = {
      ...personsState.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    setPersonsState({
      persons: persons,
      showPersons: true
    });
  }

  const getPersons = () => {
    if (personsState.showPersons) {
      return (
        <div>
          {personsState.persons.map((person, index) => (
            <Person
              key={person.id}
              click={() => deletePersonHandler(index)}
              changed={(event) => nameChangedHandler(event, person.id)}
              name={person.name}
              age={person.age} />
          ))}
        </div>
      )
    }
  }

  const togglePersonsHandler = () => {
    const doesShow = personsState.showPersons;

    setPersonsState({
      ...personsState,
      showPersons: !doesShow
    })
  }

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  }

  const persons = getPersons();

  return (
    <div className="App" >
      <h1>Hi, I'm a react App</h1>
      <p>This is really working!</p>

      <button
        style={style}
        onClick={togglePersonsHandler}>Switch Name</button>
      {persons}
    </div >
  );
}

export default app;

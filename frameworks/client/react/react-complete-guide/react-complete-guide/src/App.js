import React, { useState } from 'react';
import Person from './Person/Person';
import classes from './App.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }

      return (
        <div>
          {personsState.persons.map((person, index) => (
            <ErrorBoundary key={person.id}>
              <Person
                click={() => deletePersonHandler(index)}
                changed={(event) => nameChangedHandler(event, person.id)}
                name={person.name}
                age={person.age} />
            </ErrorBoundary>
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

  let btnClass = [classes.Button];

  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  }

  const persons = getPersons();

  const assignedClasses = [];
  if (personsState.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }

  if (personsState.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.App}>
      <h1>Hi, I'm a react App</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>

      <button className={btnClass.join(' ')}
        alt={personsState.showPersons}
        onClick={togglePersonsHandler}>Switch Name
      </button>
      {persons}
    </div >
  );
}

export default app;

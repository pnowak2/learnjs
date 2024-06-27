import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] get derived state from props');
    //     return state;
    // }

    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] will receive props', props);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] should component update');
    //     return this.props.persons !== nextProps.persons;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] get snap before update');
        return { message: 'Snapshot'};
    }

    // componentWillUpdate() {

    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] component did update');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] component will unmount');
    }

    render() {
        return this.props.persons.map((person, index) => {
            return <Person
                key={person.id}
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.props.changed(event, person.id)} />
        })
    }
}


export default Persons;
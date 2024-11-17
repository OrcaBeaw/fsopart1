import phoneService from "../services/phone.js";
import { useState } from 'react';
import PropTypes from 'prop-types';

const Booking = (props) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const newPersonChange = (event) => {
        setNewName(event.target.value);
    };

    const newNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();

        if (props.persons.some(person => person.name === newName || person.number === newNumber)) {
            props.setErrorMessage(`${newName} and/or ${newNumber} already added to phonebook`);
            setTimeout(() => props.setErrorMessage(null), 5000);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
            phoneService.create(newPerson)
                .then(response => {
                    props.setPersons(props.persons.concat(response.data));
                    setNewName('');
                    setNewNumber('');
                    props.setErrorMessage('Person added successfully!');
                    setTimeout(() => props.setErrorMessage(null), 5000);
                })
                .catch(error => {
                    props.setErrorMessage(`Error: ${error.response?.data?.error || 'Unknown error'}`);
                    setTimeout(() => props.setErrorMessage(null), 5000);
                });
        }
    };

    const personDisplay = Array.isArray(props.persons) ? props.persons.map(person => (
        <div key={person.id}>
            {person.name} | {person.number} |
            <button type="button" onClick={() => {
                phoneService.deletePerson(person.id)
                    .then(() => {
                        props.setPersons(props.persons.filter(p => p.id !== person.id));
                        props.setErrorMessage('Person deleted successfully!');
                        setTimeout(() => props.setErrorMessage(null), 5000);
                    })
                    .catch(error => {
                        props.setErrorMessage(`Error: ${error.response?.data?.error || 'Unknown error'}`);
                        setTimeout(() => props.setErrorMessage(null), 5000);
                    });
            }}>
                delete
            </button>
        </div>
    )) : null;

    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={newPersonChange} /></div>
                <div>number: <input value={newNumber} onChange={newNumberChange} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personDisplay}
        </div>
    );
};

Booking.propTypes = {
    persons: PropTypes.array.isRequired,
    setPersons: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
};

export default Booking;
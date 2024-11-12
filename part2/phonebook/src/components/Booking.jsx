import {useState} from "react";

const Booking = (props) => {
    const [persons, setPersons] = useState(props.persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    //some is used to check if elements meet condition and returns boolean.
    //some is NOT used to render, use when you want to know if something matches a condition, like an if statement
    // map is used to render, returns array, use when you want to render something aka display
    //this is CORRECT use of map
    const personDisplay = persons.map(person => <div key={person.id}>{person.name}</div>)
    const numberDisplay = persons.map(person => <div key={person.id}>{person.number}</div>)

    const newPersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const newNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        console.log({newName})
        //this is CORRECT use of some
        if (persons.some(person => person.name === newName || person.number === newNumber)) {
            alert(`${newName} and/or ${newNumber} already added to phonebook`)
        } else {
            console.log('these values are NEW', newName, newNumber)
            setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
            setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))

        }
    }
    return (
        <div>
        <h2>add a new</h2>
            <div>debug: {newName} {newNumber}</div>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={newPersonChange}/></div>
                <div>number: <input value={newNumber} onChange={newNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <table>
                <tbody>
                <tr>
                    <td>{personDisplay}</td>
                    <td>{numberDisplay}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Booking;
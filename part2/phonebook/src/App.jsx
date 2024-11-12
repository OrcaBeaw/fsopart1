import { useState } from 'react'
import Search from "./components/Search.jsx";
import Booking from "./components/Booking.jsx";
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    return (
        <div>
            <h2>Phonebook</h2>
            <Search persons={persons}/>
            <Booking persons={persons} setPersons={setPersons}/>
        </div>
    )
}

export default App
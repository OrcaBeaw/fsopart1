import {useState} from "react";

const Search = (props) => {
    const [newSearch, setSearch] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([]);
    const filteredDisplay = filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)

    const makeSearch = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const Search = (event) => {
        event.preventDefault()
        console.log('searching', newSearch)
        //gets person with some, (kinda like map or for loop), converts to uppercase, and checks if the name includes the search
        if (props.persons.some(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))) {
            console.log('found')
            //found persons, filters out the ones that don't include the search. converts both the search and array to uppercase for it to be equal
            setFilteredPersons(props.persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase())))
            console.log('search', newSearch)
        }
        else {
            console.log('not found')
            setFilteredPersons([])
        }
    }

    return (
        <div>
            <form onSubmit={Search}>
                <div>filter shown with <input value={newSearch} onChange={makeSearch}/></div>
                <div>
                    <button type="submit">search</button>
                </div>
                {filteredDisplay}
            </form>
        </div>
    )

}

export default Search
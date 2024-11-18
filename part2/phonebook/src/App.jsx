import { useState, useEffect } from 'react';
import Search from "./components/Search.jsx";
import Booking from "./components/Booking.jsx";
import Notification from "./components/Notification.jsx";
import phoneService from "./services/phone.js";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetching initial data from the server
    useEffect(() => {
        phoneService
            .getAll()
            .then(response => {
                setPersons(response.data);
            })
            .catch(() => {
                setErrorMessage('Failed to fetch persons.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    }, []);

    return (
        <div>
            <Notification message={errorMessage} />
            <h2>Phonebook</h2>
            <Search persons={persons} />
            <Booking
                persons={persons}
                setPersons={setPersons}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
};

export default App;
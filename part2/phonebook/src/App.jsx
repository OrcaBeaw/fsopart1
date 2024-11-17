import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from "./components/Search.jsx";
import Booking from "./components/Booking.jsx";
import phoneService from "./services/phone.js";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Notification component to display messages
    const Notification = ({ message }) => {
        if (message === null) {
            return null;
        }
        return (
            <div className="error">
                {message}
            </div>
        );
    };

    Notification.propTypes = {
        message: PropTypes.string
    };

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
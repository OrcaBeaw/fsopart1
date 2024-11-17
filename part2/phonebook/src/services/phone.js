import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons'; // Ensure this URL is correct and the server is running

// Fetch all persons
const getAll = () => {
    return axios.get(baseUrl);
};

// Create a new person
const create = (newPerson) => {
    return axios.post(baseUrl, newPerson);
};

// Update an existing person's details
const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

// Delete a person by ID
const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deletePerson };
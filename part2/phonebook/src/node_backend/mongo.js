/* global process */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({path: './process.env'});

const url = process.env.MONGODB_URI;
if (!url) {
    throw new Error('The MONGODB_URI environment variable is not set.');
}

if (process.argv.length < 3) {
    console.error('Usage: node script.js <password> [name phoneNumber]');
    process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

const phonebookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

const Number = mongoose.model('Number', phonebookSchema);

if (process.argv.length === 3) {
    console.log('Displaying all entries');
    Number.find({})
        .then(result => {
            result.forEach(pNumber => console.log(pNumber));
        })
        .catch(err => console.error(err))
        .finally(() => mongoose.connection.close());
} else if (process.argv.length === 5) {
    const pNumber = Number({
        name: process.argv[3],
        phoneNumber: process.argv[4]
    });

    pNumber.save()
        .then(() => {
            console.log(`Added ${pNumber.name} number ${pNumber.phoneNumber} to phonebook`);
        })
        .catch(err => console.error(err))
        .finally(() => mongoose.connection.close());
}

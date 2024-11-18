import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: './process.env'});

const url = process.env.MONGODB_URI;

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

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Phonebook API');
});

app.get('/api/persons', (req, res) => {
  Number.find({})
      .then(result => {
        res.json(result.map(number => ({
          id: number._id,
          name: number.name,
          number: number.phoneNumber
        })));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch persons' });
      });
});

app.get('/api/persons/:id', (req, res) => {
  Number.findById(req.params.id)
      .then(person => {
        if (person) {
          res.json({
            id: person._id,
            name: person.name,
            number: person.phoneNumber
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch person' });
      });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Number.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end();
      })
      .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  }

  const pNumber = Number({
    name: body.name,
    phoneNumber: body.number
  });

  pNumber.save()
      .then(() => {
        console.log(`Added ${pNumber.name} number ${pNumber.phoneNumber} to phonebook`);
        res.json(pNumber);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to save the number' });
      });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
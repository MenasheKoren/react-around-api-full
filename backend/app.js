require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const users = require('./routes/users');

const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { createCard } = require('./controllers/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.post('/cards', auth, createCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use((err, req, res, next) => {
  // if an error has no status, give it status 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

module.exports = app;

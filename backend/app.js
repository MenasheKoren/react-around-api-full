require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const users = require('./routes/users');

const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { createCard } = require('./controllers/cards');
const {
  celebrateCreateUser,
  celebrateLogin,
} = require('./middleware/celebrate');

const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(requestLogger());

app.get('/test', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.post('/signin', celebrateLogin, login);
app.post('/signup', celebrateCreateUser, createUser);

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.post('/cards', auth, createCard);
app.use(errorLogger);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

module.exports = app;

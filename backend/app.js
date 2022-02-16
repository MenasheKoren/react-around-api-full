require('dotenv').config();

const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./routes/users');

const cards = require('./routes/cards');
const { pageNotFoundErrorHandler } = require('./errors/not-found-error');

const { createUser, login } = require('./controllers/users');

const {
  celebrateCreateUser,
  celebrateLogin,
} = require('./middleware/celebrate');

const { defaultErrorHandler } = require('./errors/default-error');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 10);
});

app.post('/signin', celebrateLogin, login);
app.post('/signup', celebrateCreateUser, createUser);

app.use('/users', users);

app.use('/cards/api', cards);

app.use(errorLogger);
app.use('*', pageNotFoundErrorHandler);
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;

require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const users = require('./routes/users');

const cards = require('./routes/cards');

const {
  createUser,
  login,
} = require('./controllers/users');
// const auth = require('./middleware/auth');
// const {
//   createCard,
//   deleteCardById,
//   likeCard,
//   dislikeCard,
//   getCards,
// } = require('./controllers/cards');
const {
  celebrateCreateUser,
  celebrateLogin,
} = require('./middleware/celebrate');

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
// app.get('/users', auth, getUsers);
// app.get('/me', auth, getCurrentUser);
// app.patch('/me', auth, updateUserProfile);
// app.patch('/me/avatar', auth, updateUserAvatar);
// app.get('/:userId', auth, getUserById);

app.use('/cards/api', cards);
// app.get('/', auth, getCards);
// app.post('/', auth, createCard);
// app.delete('/:cardId', auth, deleteCardById);
// app.put('/:cardId/likes', auth, likeCard);
// app.delete('/:cardId/likes', auth, dislikeCard);

app.use(errorLogger);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

// app.use(errors());

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'An error occurred on the server' : message,
//   });
// });

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, (err, res) => {
    if (err) {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;

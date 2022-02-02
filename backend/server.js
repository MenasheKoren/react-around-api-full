require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = require('./app');

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, (err, res) => {
    if (err) {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

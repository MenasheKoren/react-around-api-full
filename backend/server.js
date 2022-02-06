// require('dotenv').config();
//
// const { PORT = 3000 } = process.env;
// const cors = require('cors');
// const app = require('./app');
//
// app.use(cors());
// app.options('*', cors());
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, (err, res) => {
//     if (err) {
//       res.status(500).send({ message: 'An error has occurred on the server' });
//     }
//     // eslint-disable-next-line no-console
//     console.log(`App listening on port ${PORT}`);
//   });
// }

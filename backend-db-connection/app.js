const express = require('express');
const errorHandler = require('errorhandler');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userController = require('./controllers/auth.js');

app.post('/api/v1/login', userController.login);
app.post('/api/v1/register', userController.register);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // httpsServer.listen(443, () => {
  //   console.log('HTTPS Server running on port 443');
  // });
} else {
  app.listen(process.env.PORT || 443);
  console.log('Server started ...');
}

module.exports = app;

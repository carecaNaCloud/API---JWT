const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authenticator = require('./src/usuarios/passport-strategy');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;

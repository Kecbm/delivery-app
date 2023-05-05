require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error.middleware');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(express.static('public'));

app.use(errorMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

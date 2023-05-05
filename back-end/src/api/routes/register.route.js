const express = require('express');

const registerController = require('../controllers/register.controller');

const routes = express.Router();

routes.post('/register', registerController);

module.exports = routes;

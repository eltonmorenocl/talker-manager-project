const express = require('express');
const generateToken = require('../controllers/login');
const { authEmail, authPassword } = require('../middlewares/authLogin');

const route = express.Router();

route.post('/', authEmail, authPassword, generateToken);

module.exports = route;
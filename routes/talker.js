const express = require('express');
const { getAll, getById, createTalker, updateTalker, 
  deleteTalker, searchTalker } = require('../controllers/talker');
const { foundToken, validTalker } = require('../middlewares/authNewTalker');

const route = express.Router();

route.get('/', getAll);
route.get('/search', foundToken, searchTalker);
route.get('/:id', getById);
route.post('/', foundToken, validTalker, createTalker);
route.put('/:id', foundToken, validTalker, updateTalker);
route.delete('/:id', foundToken, deleteTalker);

module.exports = route;
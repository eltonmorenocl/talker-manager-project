const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const generateToken = require('./generatetoken');
const { authEmail, authPassword } = require('./authLogin');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const readTalker = await fs.readFile('./talker.json');
  const talkers = JSON.parse(readTalker);

  if (talkers.length === 0) return res.status(200).json([]);
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const readTalker = await fs.readFile('./talker.json');
  const talkers = JSON.parse(readTalker);
  const talkerId = talkers.find((talk) => talk.id === +id);

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talkerId);
});

app.post('/login', authEmail, authPassword, (req, res) => {
  const token = generateToken();
  console.log(token);
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});

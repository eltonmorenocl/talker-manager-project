const fs = require('fs').promises;

const globalTalker = ('./talker.json');

const getAll = async () => {
  const readTalker = await fs.readFile(globalTalker);
  const talkers = JSON.parse(readTalker);

  if (talkers.length === 0) return [];
  return talkers;
};

const getById = async ({ id }) => {
  const readTalker = await fs.readFile(globalTalker);
  const talkers = JSON.parse(readTalker);

  const talkerId = talkers.find((talk) => talk.id === Number(id));
  if (!talkerId) return null;

  return talkerId;
};

const createTalker = async (body) => {
  const readTalker = await fs.readFile(globalTalker);
  const talkers = JSON.parse(readTalker);
    
  const newTalker = body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  await fs.writeFile(globalTalker, JSON.stringify(talkers));
  return newTalker;
};

const updateTalker = async ({ name, age, talk }, { id }) => {
  const readTalker = await fs.readFile(globalTalker);
  const talkers = JSON.parse(readTalker);
  
  const foundTalker = talkers.findIndex((talker) => talker.id === +id);
  talkers[foundTalker] = { ...talkers[foundTalker], name, age, talk };
  
  await fs.writeFile(globalTalker, JSON.stringify(talkers));
  
  return talkers[foundTalker];
};

const deleteTalker = async ({ id }) => {
  const readTalker = await fs.readFile(globalTalker);
  const talkers = JSON.parse(readTalker);

  const talkIndex = talkers.findIndex((r) => r.id === +id);

  talkers.splice(talkIndex, 1);
  
  await fs.writeFile(globalTalker, JSON.stringify(talkers));
};

const searchTalker = async ({ q }) => {
  const readTalker = await fs.readFile(globalTalker);
  const talkers = JSON.parse(readTalker);
  
  const filter = talkers.filter((t) => t.name.includes(q));
 
  if (!filter) return '[]';
  
  return filter;
};

module.exports = { getAll, getById, createTalker, updateTalker, deleteTalker, searchTalker };
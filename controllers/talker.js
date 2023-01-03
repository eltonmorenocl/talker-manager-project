const talkerService = require('../services/talker');

const getAll = async (req, res) => {
  try {
      const result = await talkerService.getAll();
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
      const result = await talkerService.getById(req.params);
      if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

const createTalker = async (req, res) => {
  try {
      const result = await talkerService.createTalker(req.body);
      return res.status(201).json(result);
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

const updateTalker = async (req, res) => {
  try {
      const result = await talkerService.updateTalker(req.body, req.params);
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

const deleteTalker = async (req, res) => {
  try {
      await talkerService.deleteTalker(req.params);
      return res.status(204).end();
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

const searchTalker = async (req, res) => {
  try {
    const result = await talkerService.searchTalker(req.query);
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json(error.message);
  }
};

module.exports = { getAll, getById, createTalker, updateTalker, deleteTalker, searchTalker };
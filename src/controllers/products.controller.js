const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  
  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateById(id, name);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteById(id);

  if (type) return res.status(type).json({ message });

  return res.status(204).json('');
};

const findByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.findByQuery(q);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insert(name);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  updateById,
  deleteById,
  findByQuery,
  insert,
};
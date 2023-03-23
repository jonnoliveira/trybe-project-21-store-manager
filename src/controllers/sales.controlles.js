const { salesService } = require('../services');

// const insertSale = async (req, res) => {
//   const { body } = req;
//   const { type, message } = await salesService.insertSale(body);
  
//   if (type) return res.status(type).json({ message });

//   return res.status(201).json(message);
// };

const findAll = async (_req, res) => {
  const { type, message } = await salesService.findAll();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.findById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteById(id);

  if (type) return res.status(type).json({ message });

  return res.status(204).json('');
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await salesService.updateById(id, body);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  // insertSale,
  findAll,
  findById,
  deleteById,
  updateById,
};
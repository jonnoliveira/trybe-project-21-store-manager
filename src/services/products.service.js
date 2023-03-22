const productsModel = require('../models/products.model');
const { validateId } = require('../middlewares/validateId');
const { validateName } = require('../middlewares/validateName');

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products) return { type: 500, message: 'Erro na requisição' };

  return { type: null, message: products };
};

const findById = async (id) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const product = await productsModel.findById(id);
  if (!product) return { type: 404, message: 'Product not found' };

  return { type: null, message: product };
};

const updateById = async (id, name) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const isValidName = validateName(name);
  if (isValidName.type) return isValidName;

  const affectedRows = await productsModel.updateById(id, name);
  if (affectedRows === 0) return { type: 404, message: 'Product not found' };

  const product = await productsModel.findById(id);

  return { type: null, message: product };
};

const deleteById = async (id) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const affectedRows = await productsModel.deleteById(id);
  if (affectedRows === 0) return { type: 404, message: 'Product not found' };
  
  return { type: null };
};

const findByQuery = async (q) => {
  const products = await productsModel.findByQuery(q);
  
  return { type: null, message: products };
};

const insert = async (name) => {
  const isValidName = validateName(name);
  if (isValidName.type) return isValidName;

  const newProductId = await productsModel.insert(name);
  if (!newProductId) return { type: 404, message: 'Product not found' };

  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = { 
  findAll,
  findById,
  updateById,
  deleteById,
  findByQuery,
  insert,
};
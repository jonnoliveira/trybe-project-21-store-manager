const productsModel = require('../models/products.model');
const { validateId } = require('../middlewares/validateId');

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products) {
    return { type: 500, message: 'Erro na requisição' };
  }

  return { type: null, message: products };
};

const findById = async (id) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const product = await productsModel.findById(id);
  if (!product) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: product };
};

module.exports = { 
  findAll,
  findById,
};
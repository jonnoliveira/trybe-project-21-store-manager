const productsModel = require('../models/products.model');

const httpErrorGenerator = (status, message) => ({ status, message });

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products) {
    throw httpErrorGenerator(404, 'Products not found');
  }
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    throw httpErrorGenerator(404, 'Product not found');
  }
  return product;
};

module.exports = { 
  findAll,
  findById,
};
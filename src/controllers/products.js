const { productsService } = require('../services');

const findAll = async (_req, res, next) => {
  try {
    const products = await productsService.findAll();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findAll,
  findById,
};
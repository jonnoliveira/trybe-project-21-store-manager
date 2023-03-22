const salesModel = require('../models/sales.model');
const { validateId } = require('../middlewares/validateId');

// const { validateSales } = require('../middlewares/validateSales');

// const insertSale = async (body) => {
//   const isValidSales = validateSales(body);
//   if (isValidSales.type) return isValidSales;
//   console.log('aqui1');

//   const newProductId = await salesModel.insertDate();
//   const promises = body.map(({ productId, quantity }) => (
//     salesModel.insertSale(newProductId, productId, quantity)
//   ));

//   await Promise.all(promises);
//   const itemsSold = {
//     id: newProductId,
//     itemsSold: body.map(({ productId, quantity }) => ({ productId, quantity })),
//   };

//   // if (!newProductId) return { type: 404, message: 'Product not found' };

//   return { type: null, message: itemsSold };
// };

const findAll = async () => {
  const sales = await salesModel.findAll();

  if (!sales) return { type: 404, message: 'Sale not found' };

  return { type: null, message: sales };
};

const findById = async (id) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const sale = await salesModel.findById(id);
  if (sale.length === 0) return { type: 404, message: 'Sale not found' };

  return { type: null, message: sale };
};

const deleteById = async (id) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const affectedRows = await salesModel.deleteById(id);
  if (affectedRows === 0) return { type: 404, message: 'Sale not found' };
  
  return { type: null };
};

module.exports = { 
  // insertSale,
  findAll,
  findById,
  deleteById,
};
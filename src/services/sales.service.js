const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const { validateId } = require('../middlewares/validateId');

const { validateSales } = require('../middlewares/validateSales');

const validationProductId = async (body) => {
  if (body) {
    const products = await Promise.all(
      body.map(async ({ productId }) => productsModel.findById(productId)),
    );

    const isUndefined = products.some((p) => p === undefined);
    if (isUndefined) return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const insertSale = async (body) => {
  const isValidSales = validateSales(body);
  if (isValidSales.type) return isValidSales;

  const exist = await validationProductId(body);
  if (exist.type) return exist;

  const newProductId = await salesModel.insertDate();
  if (!newProductId) return { type: 404, message: 'Product not found' };
  
  const promises = body.map(({ productId, quantity }) => (
    salesModel.insertSale(newProductId, productId, quantity)
  ));

  await Promise.all(promises);

  const itemsSold = {
    id: newProductId,
    itemsSold: body,
  };

  return { type: null, message: itemsSold };
};

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

const updateById = async (id, body) => {
  const isValidId = validateId(id);
  if (isValidId.type) return isValidId;

  const isValidSales = validateSales(body);
  if (isValidSales.type) return isValidSales;

  const exist = await validationProductId(body);
  if (exist.type) return exist;
  
  const idExists = await salesModel.findById(id);
  if (idExists.length === 0) return { type: 404, message: 'Sale not found' };
  
  const promises = body.map((sale) => (
    salesModel.updateById(sale.quantity, id, sale.productId)
  ));

  await Promise.all(promises);

  const product = await salesModel.findById(id);
  const itemsUpdated = product;

  return { type: null, message: { saleId: id, itemsUpdated } };
};

module.exports = { 
  insertSale,
  findAll,
  findById,
  deleteById,
  updateById,
};
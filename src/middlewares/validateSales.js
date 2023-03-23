const { salesSchema } = require('../Joi/schema');

const validateSales = (sales) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    if (error.message.includes('required')) return { type: 400, message: error.message };
    if (error.message.includes('greater')) return { type: 422, message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateSales,
};
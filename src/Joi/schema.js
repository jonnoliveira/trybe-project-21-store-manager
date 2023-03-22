const Joi = require('joi');

const sale = Joi.object().keys({
  productId: Joi.number().integer().min(1).required()
.label('productId'),
  quantity: Joi.number().integer().min(1).required()
.label('quantity'),
});

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).max(30).required();
const salesSchema = Joi.array().items(sale).required().messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
});
  
module.exports = {
  idSchema,
  nameSchema,
  salesSchema,
};
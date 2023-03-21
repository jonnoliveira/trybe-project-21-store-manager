const { nameSchema } = require('../Joi/schema');

const validateName = (name) => {
  const { error } = nameSchema.validate(name);

  if (error) return { type: 422, message: '"name" length must be at least 5 characters long' };

  return { type: null, message: '' };
};

module.exports = {
  validateName,
};
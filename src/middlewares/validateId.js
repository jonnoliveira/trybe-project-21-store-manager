const { idSchema } = require('../Joi/schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 400, message: '"id" must be a number' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
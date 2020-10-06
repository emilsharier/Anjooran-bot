const Joi = require("joi");

const Message = Joi.object({
  link: Joi.link().required(),
  message: Joi.string().required(),
});

module.exports = { Message };

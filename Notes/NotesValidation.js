const Joi = require('joi');

exports.noteSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

// validation/taskValidation.js
const Joi = require('joi');

const taskSchema = Joi.object({
  text: Joi.string().min(3).required(),
  completed: Joi.boolean(),
});

module.exports = taskSchema;

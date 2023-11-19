import * as Joi from 'joi';

export const validationSchema = Joi.object().keys({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(20).required(),
  authors: Joi.string().min(3).max(20).required(),
  favorite: Joi.boolean().default(false).optional(),
  fileCover: Joi.string().max(10).required(),
  fileName: Joi.string().min(3).max(100).required(),
  fileBook: Joi.string().required(),
});

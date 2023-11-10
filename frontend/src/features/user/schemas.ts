import Joi from 'joi';

export const loginForm = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
});

export const registerForm = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  password2: Joi.string().min(8).required(),
});

export const emailChangeForm = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});

export const passwordChangeForm = Joi.object({
  password: Joi.string().min(8).required(),
  password2: Joi.string().min(8).required(),
});

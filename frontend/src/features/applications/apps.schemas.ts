import Joi from 'joi';

export const commonStepForm = Joi.object({
  date: Joi.string().required(),
  type: Joi.string().required(),
});

export const answerStepForm = Joi.object({
  date: Joi.string().required(),
  outcome: Joi.string().required(),
});

export const addAppForm = Joi.object({
  jobTitle: Joi.string().required(),
  companyName: Joi.string().required(),
  contractType: Joi.string().required(),
  jobLink: Joi.string().optional().allow(''),
  companyLink: Joi.string().optional().allow(''),
  appType: Joi.string().required(),
  location: Joi.string().required(),
  contactName: Joi.string().optional().allow(''),
  coverLetter: Joi.boolean().required(),
  status: Joi.number().required(),
  tags: Joi.array().items(Joi.string()),
});

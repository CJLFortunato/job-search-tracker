import { Request, Response } from 'express';

import Joi from 'joi';

import { userPayload, appPayload, tagPayload } from './payloadSchemas.js';

const validatePayload = async (req: Request, res: Response, next) => {
  const {
    body,
  } = req;

  const route = req.originalUrl.split('/')[3];
  try {
    switch (route) {
      case ('apps'):
        Joi.assert(body, appPayload);
        break;
      case ('users'):
        Joi.assert(body, userPayload);
        break;
      case ('tags'):
        Joi.assert(body, tagPayload);
        break;
      default:
        await next();
    }
    await next();
  } catch (e) {
    next(e.details[0].message);
  }
};

export default validatePayload;

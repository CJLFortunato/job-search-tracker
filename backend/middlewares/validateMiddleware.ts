import { Request, Response } from 'express';

import Joi from 'joi';

import {
  userPayload,
  appPayload,
  tagPayload,
  userEditPayload,
} from './payloadSchemas.js';

const validatePayload = async (req: Request, res: Response, next) => {
  const {
    body,
  } = req;

  const route = req.originalUrl.split('/')[3];
  const endpoint = req.originalUrl.split('/')[4];
  try {
    switch (route) {
      case ('apps'):
        Joi.assert(body, appPayload);
        break;
      case ('users'):
        if (!['login', 'logout', 'register'].includes(endpoint)) {
          Joi.assert(body, userEditPayload);
        } else {
          Joi.assert(body, userPayload);
        }
        break;
      case ('tags'):
        Joi.assert(body, tagPayload);
        break;
      default:
        await next();
    }
    await next();
  } catch (e) {
    res.status(400).json({
      message: `Payload validation error: ${e.details[0].message}`,
    });
  }
};

export default validatePayload;

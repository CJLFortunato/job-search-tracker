import Joi from 'joi';
import { userPayload, appPayload, tagPayload } from './payloadSchemas';
const validatePayload = (req, res, next) => {
    const { body, } = req;
    try {
        switch (req.originalUrl) {
            case ('/v1/api/apps'):
                Joi.assert(body, appPayload);
                break;
            case ('/v1/api/users'):
                Joi.assert(body, userPayload);
                break;
            case ('/v1/api/tags'):
                Joi.assert(body, tagPayload);
                break;
            default:
                next();
        }
        next();
    }
    catch (e) {
        next(e.details[0].message);
    }
};
export default validatePayload;
//# sourceMappingURL=validateMiddleware.js.map
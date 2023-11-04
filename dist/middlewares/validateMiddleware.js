var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from 'joi';
import { userPayload, appPayload, tagPayload, userEditPayload, } from './payloadSchemas.js';
const validatePayload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, } = req;
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
                }
                else {
                    Joi.assert(body, userPayload);
                }
                break;
            case ('tags'):
                Joi.assert(body, tagPayload);
                break;
            default:
                yield next();
        }
        yield next();
    }
    catch (e) {
        console.log(e.details[0].message);
        next(e.details[0].message);
    }
});
export default validatePayload;
//# sourceMappingURL=validateMiddleware.js.map
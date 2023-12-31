var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import User from '../users/user.schema.js';
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookies } = req;
        const token = cookies.cleanup;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from token
                req.user = yield User.findById(decoded.id).select('-password');
                next();
            }
            catch (error) {
                res.status(401);
                throw new Error('User not authorized');
            }
        }
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }
    }
    catch (error) {
        next(error);
    }
});
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
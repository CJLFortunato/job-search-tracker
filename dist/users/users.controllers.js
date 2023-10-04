var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.schema';
// Generate jwt token
const generateJWT = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
});
export default class UserControllers {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { name, email, password, } = body;
            if (!name || !email || !password) {
                res.status(400);
                throw new Error('Please add all fields');
            }
            // check if user exists
            const userExists = yield User.findOne({
                email,
            });
            if (userExists) {
                res.status(400);
                throw new Error('User already exists');
            }
            // Hash password
            const salt = yield bcrypt.genSalt(24);
            const hashedPassword = yield bcrypt.hash(password, salt);
            // Create user
            const user = yield User.create({
                email,
                password: hashedPassword,
            });
            if (user) {
                res.status(201).json({
                    _id: user.id,
                    email: user.email,
                    token: generateJWT(user.id),
                });
            }
            else {
                res.status(400);
                throw new Error('Invalid user data');
            }
        });
    }
}
//# sourceMappingURL=users.controllers.js.map
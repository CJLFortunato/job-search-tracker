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
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import User from './user.schema.js';
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
                const tokenCookie = cookie.serialize('jwt_token', generateJWT(user.id), {
                    httpOnly: true,
                    secure: false,
                    maxAge: 21600,
                    path: '/', // le chemin depuis l'URL racine de votre app qui indique où est valide le token
                });
                res.setHeader('Set-Cookie', tokenCookie);
                res.status(201).json({
                    _id: user.id,
                    email: user.email,
                });
            }
            else {
                res.status(400);
                throw new Error('Invalid user data');
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { email, password, } = body;
            if (!email || !password) {
                res.status(400);
                throw new Error('Please add all fields');
            }
            const user = yield User.findOne({
                email,
            });
            if (!user) {
                res.status(400);
                throw new Error('Incorrect email address');
            }
            const isPasswordCorrect = yield bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                const tokenCookie = cookie.serialize('jwt_token', generateJWT(user.id), {
                    httpOnly: true,
                    secure: false,
                    maxAge: 21600,
                    path: '/', // le chemin depuis l'URL racine de votre app qui indique où est valide le token
                });
                res.setHeader('Set-Cookie', tokenCookie);
                res.status(200).json({
                    _id: user.id,
                    email: user.email,
                });
            }
            else {
                res.status(400);
                throw new Error('Incorrect password');
            }
        });
    }
    static modifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const { email, password, } = body;
            const { id } = params;
            if (!email || !password) {
                res.status(400);
                throw new Error('Please add all fields');
            }
            const user = yield User.findById(id);
            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }
            const updatedUser = yield User.findByIdAndUpdate(id, body);
            res.status(200).json(updatedUser);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const { id } = params;
            const user = yield User.findById(id);
            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }
            yield User.findByIdAndDelete(id);
            res.status(200);
        });
    }
    static findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const { id } = params;
            const user = yield User.findById(id);
            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }
            res.status(200).json(user);
        });
    }
}
//# sourceMappingURL=users.controllers.js.map
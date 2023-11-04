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
// import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import User from './user.schema.js';
// Generate jwt token
const generateJWT = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
});
export default class UserControllers {
    static registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { email, password, } = body;
            try {
                if (!email || !password) {
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
                const salt = yield bcrypt.genSalt(12);
                const hashedPassword = yield bcrypt.hash(password, salt);
                // Create user
                const user = yield User.create({
                    email,
                    password: hashedPassword,
                });
                if (user) {
                    res.cookie('cleanup', generateJWT(user.id), {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'prod',
                        path: '/',
                    });
                    res.status(200).json({
                        _id: user.id,
                        email: user.email,
                    }).send();
                }
                else {
                    res.status(400);
                    throw new Error('Invalid user data');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { email, password, } = body;
            try {
                if (!email || !password) {
                    res.status(400);
                    throw new Error('Please add all fields');
                }
                const user = yield User.findOne({
                    email,
                });
                // console.log(user);
                if (!user) {
                    res.status(400);
                    throw new Error('Incorrect email address');
                }
                const isPasswordCorrect = yield bcrypt.compare(password, user.password);
                if (isPasswordCorrect) {
                    res.cookie('cleanup', generateJWT(user.id), {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'prod',
                        path: '/',
                    });
                    res.status(200).json({
                        _id: user.id,
                        email: user.email,
                    }).send();
                }
                else {
                    res.status(400);
                    throw new Error('Incorrect password');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static modifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const { id } = params;
            try {
                const user = yield User.findById(id);
                if (!user) {
                    res.status(400);
                    throw new Error('User not found');
                }
                console.log(body);
                let updatedUser = {};
                if (body.password) {
                    // Hash password
                    const salt = yield bcrypt.genSalt(12);
                    const hashedPassword = yield bcrypt.hash(body.password, salt);
                    updatedUser = yield User.findByIdAndUpdate(id, Object.assign(Object.assign({}, body), { password: hashedPassword }), {
                        new: true,
                    });
                }
                else {
                    updatedUser = yield User.findByIdAndUpdate(id, body, {
                        new: true,
                    });
                }
                console.log(updatedUser);
                const updatedUserWithoutPassword = {
                    _id: updatedUser._id,
                    email: updatedUser.email,
                };
                res.status(200).json(updatedUserWithoutPassword);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const { id } = params;
            try {
                const user = yield User.findById(id);
                if (!user) {
                    res.status(400);
                    throw new Error('User not found');
                }
                yield User.findByIdAndDelete(id);
                res.clearCookie('cleanup', {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                }).send({});
            }
            catch (error) {
                next(error);
            }
        });
    }
    static findUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const { id } = params;
            try {
                const user = yield User.findById(id);
                if (!user) {
                    res.status(400);
                    throw new Error('User not found');
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('cleanup', {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                }).send({});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
//# sourceMappingURL=users.controllers.js.map
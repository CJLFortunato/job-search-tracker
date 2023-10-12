var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Tag from './tag.schema.js';
export default class TagsControllers {
    static getTags(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apps = yield Tag.find({ user: req.user.id });
                res.status(200).json(apps);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newApp = yield Tag.create(Object.assign(Object.assign({}, req.body), { user: req.user.id }));
                res.status(201).json(newApp);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const app = yield Tag.findById(req.params.id);
                if (!app) {
                    res.status(400);
                    throw new Error('Goal not found');
                }
                if (app.user.toString() !== req.user.id) {
                    res.status(401);
                    throw new Error('User not authorized');
                }
                const updatedApp = yield Tag.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json(updatedApp);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const app = yield Tag.findById(req.params.id);
                if (!app) {
                    res.status(400);
                    throw new Error('Goal not found');
                }
                if (app.user.toString() !== req.user.id) {
                    res.status(401);
                    throw new Error('User not authorized');
                }
                const deletedApp = yield Tag.findByIdAndDelete(req.params.id);
                res.status(200).json(deletedApp);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
//# sourceMappingURL=tags.controllers.js.map
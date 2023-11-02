var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import addTagToApp from '../tags/tag.crud.js';
import Application from './apps.schema.js';
export default class ApplicationsControllers {
    static getApps(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apps = yield Application.find({ user: req.user.id }).populate('tags').exec();
                res.status(200).json(apps);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createApp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newApp = yield Application.create(Object.assign(Object.assign({}, req.body), { user: req.user.id }));
                const tags = yield addTagToApp(req.body.tags, newApp, req.user.id);
                console.log(tags);
                const newAppWithTags = yield Application.findByIdAndUpdate(newApp._id, Object.assign(Object.assign({}, newApp), { tags: [...newApp.tags, tags] })).populate('tags');
                res.status(201).json(newAppWithTags);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateApp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const app = yield Application.findById(req.params.id);
                if (!app) {
                    res.status(400);
                    throw new Error('Application not found');
                }
                if (app.user.toString() !== req.user.id) {
                    res.status(401);
                    throw new Error('User not authorized');
                }
                const tags = addTagToApp(req.body.tags, app, req.user.id);
                const updatedApp = yield Application.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { tags: [...app.tags, tags] }), {
                    new: true,
                });
                res.status(200).json(updatedApp);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteApp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const app = yield Application.findById(req.params.id);
                if (!app) {
                    res.status(400);
                    throw new Error('Goal not found');
                }
                if (app.user.toString() !== req.user.id) {
                    res.status(401);
                    throw new Error('User not authorized');
                }
                const deletedApp = yield Application.findByIdAndDelete(req.params.id);
                res.status(200).json(deletedApp);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
//# sourceMappingURL=apps.controllers.js.map
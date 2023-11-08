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
const addTagToApp = (tags, app, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newTags = [];
    for (let i = 0; i < tags.length; i += 1) {
        const tagInDb = yield Tag.findById(tags[i]);
        if (tagInDb) {
            if (!tagInDb.applications.find((a) => a === app._id)) {
                const newObj = {
                    _id: tagInDb._id,
                    label: tagInDb.label,
                    user: tagInDb.user,
                    applications: [...tagInDb.applications, app._id],
                };
                const updatedTag = yield Tag.findByIdAndUpdate(tagInDb._id, newObj);
                newTags.push(updatedTag._id);
            }
            else {
                newTags.push(tagInDb._id);
            }
        }
        else {
            const newTag = yield Tag.create(Object.assign(Object.assign({}, tags[i]), { user: userId, applications: [app._id] }));
            newTags.push(newTag._id);
        }
    }
    return newTags;
});
export default addTagToApp;
//# sourceMappingURL=tag.crud.js.map
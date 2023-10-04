import mongoose from 'mongoose';
const tagSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    label: {
        type: String,
        required: [true, 'Please add a label'],
    },
    applications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }],
}, {
    timestamps: true,
});
export default mongoose.model('Tag', tagSchema);
//# sourceMappingURL=tag.schema.js.map
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
}, {
    timestamps: true,
});
export default mongoose.model('User', userSchema);
//# sourceMappingURL=user.schema.js.map

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    country: {
        type: String,
        default: 'India'
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;

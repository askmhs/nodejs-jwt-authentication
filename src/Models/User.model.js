import mongoose from 'mongoose';

/**
 * Defining user schema
 * @type {mongoose.Schema}
 */
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Creating user collection
 */
const User = mongoose.model('User', user);

/**
 * Exporting module
 */
export default User;
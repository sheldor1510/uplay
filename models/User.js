const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    umass_email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    verify_token: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        required: true
    },
    sports: {
        type: Array,
        required: false
    },
    online: {
        type: Boolean,
        default: false,
        required: false
    },
    location: {
        type: Array,
        required: false
    },
    socket_id: {
        type: String,
        required: false
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
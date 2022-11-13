const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    sender_name: {
        type: String,
        required: true
    },
    receiver_name: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    sender_phone_number: {
        type: String,
        required: true
    },
    receiver_phone_number: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
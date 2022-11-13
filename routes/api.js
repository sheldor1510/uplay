const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Activity = require('../models/Activity');

router.get('/user', (req, res) => {
    User.findById(req.query.token).then(user => {
        res.json(user);
    })
})

router.get('/user/verify', (req, res) => {
    User.findById(req.query.token).then(user => {
        if (user.verify_token === req.query.verify_token) {
            user.verified = true;
            user.save();
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    })
})

router.post('/user/sports', (req, res) => {
    User.findById(req.query.token).then(user => {
        user.sports = req.body.sports;
        user.save();
        res.json({ success: true })
    })
})

router.get('/user/dash', (req, res) => {
    User.find({ online: true }).then(users => {
        res.json(users);
    })
})

router.post('/user/update', (req, res) => {
    User.findById(req.query.token).then(user => {
        user.online = true;
        user.location = req.body.location;
        user.save();
        res.json({ success: true })
    })
}) 

router.post('/activity/add', async (req, res) => {
    let token = req.body.token;
    let sender = await User.findById(token);
    let receiver = await User.findById(req.body.receiver_id);
    const newActivity = new Activity({
        sender_id: token,
        receiver_id: req.body.receiver_id,
        sender_name: sender.name,
        receiver_name: receiver.name,
        sport: req.body.sport,
        sender_phone_number: sender.phone_number,
        receiver_phone_number: receiver.phone_number,
        status: 'Requested'
    });
    let activity = await newActivity.save();
    res.json({ success: true, activity: activity });
})

router.get('/activity/update/:activity', (req, res) => {
    let activity = req.params.activity;
    Activity.findById(activity).then(activity => {
        activity.status = req.query.status
        activity.save();
        res.json({ success: true })
    })
})

router.get('/activity', (req, res) => {
    Activity.find({ $or: [{ receiver_id: req.query.token }, { sender_id: req.query.token }] }).then(activities => {
        res.json(activities);
    })
})

router.get('/user/socket', (req, res) => {
    try {
        User.findById(req.query.token).then(user => {
            user.socket_id = req.query.socket_id;
            user.save();
            res.json({ success: true })
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
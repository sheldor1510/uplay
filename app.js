const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const socketIO = require('socket.io');
require('dotenv').config();

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const db = process.env.DB_URI;

const app = express();

const port = process.env.PORT || 3000;
const server = app.listen(port, (err) => {
    console.log(`Server started on ${port}!`);
    if (err) throw err;
});

const io = socketIO(server, { cors: true, origins: '*:*' });

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);

io.on('connection', socket => {
    console.log('a user connected: ' + socket.id);
    socket.on('notif', async(info) => {
        console.log(info)
        io.sockets.emit('notif', info);
        // Disconnect event
    })
});

module.exports = app;
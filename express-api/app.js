const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const carRouter = require('./routes/cars');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);

module.exports = app;

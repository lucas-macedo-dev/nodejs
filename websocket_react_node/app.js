const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3001' }));

app.use(helmet());
app.use(morgan('dev'));

app.post(`/login`, (req, res) => {
    res.json({ token: '123456' });
});

module.exports = app;
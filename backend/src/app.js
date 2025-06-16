const express = require('express');
const router = require('./Routes/userRouter')

const app = express();
app.use(router);

module.exports = app;
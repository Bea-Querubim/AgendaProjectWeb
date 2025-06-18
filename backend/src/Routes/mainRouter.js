const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');

router.use(userRouter,eventRouter);

module.exports = router;
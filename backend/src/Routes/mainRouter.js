const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');
const controllerEvents = require('../../controllers/EventoController')

router.use(userRouter,eventRouter);
router.get('/usuario/:email/eventos', controllerEvents.getAllEventsByOrganizerAsync);

module.exports = router;
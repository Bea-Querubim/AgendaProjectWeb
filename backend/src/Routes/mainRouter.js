const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const eventRouter = require('./eventsRouter');

const controllerEvents = require('../../controllers/EventoController');
const controllerParticipantEvent = require('../../controllers/EventoParticipanteController');
const controllerLogin = require('../../controllers/loginController');

router.use(userRouter,eventRouter);

router.post('/login', controllerLogin.loginUserAsync);

router.get('/usuario/:email/eventos', controllerEvents.getAllEventsByUserAsync);

router.put('/eventos/:id/convidar', controllerParticipantEvent.inviteUserAsync);

module.exports = router;
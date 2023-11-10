'use strict';

const express = require('express');
const router = express.Router();
const eventController = require('./controllers/controller.js');

router.use(express.json());
// router.get('/events', eventController.getEvents);
// router.post('/events', eventController.insertEvent);

module.exports = router;

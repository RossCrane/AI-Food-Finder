'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controllers/controller.js');

router.use(express.json());
// router.get('/events', eventController.getEvents);
router.post('/completions', Controller.getOptions);

module.exports = router;

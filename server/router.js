'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controllers/controller.js');

router.use(express.json());
router.post('/completions', Controller.getOptions);
router.post('/user/preferences', Controller.updateUserPreferences);

module.exports = router;

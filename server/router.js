'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer();

const Controller = require('./controllers/controller.js');

const router = express.Router();

router.use(express.json());

router.post('/completions', Controller.getOptions);
router.post('/details', Controller.getDetailsOfAiOption);
router.post('/user/preferences', Controller.updateUserPreferences);
router.get('/user/preferences', Controller.getUserPreferences);

router.post('/get-cooking-options', Controller.getCookingOptions);
router.post('/get-going-out-options', Controller.getGoingOutOptions);
router.post('/analyze-image', upload.single('image'), Controller.analyzeImage);

module.exports = router;

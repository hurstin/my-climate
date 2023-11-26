const express = require('express');
const weatherController = require('../controllers/weatherController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, weatherController.getCurrentLocation);

module.exports = router;

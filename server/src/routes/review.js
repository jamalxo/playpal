"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const ReviewController = require('../controllers/review');


router.get('/', middlewares.checkAuthentication, ReviewController.list); // List all reviews
router.post('/', middlewares.checkAuthentication, ReviewController.postReview);

module.exports = router;

"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const ReviewController = require('../controllers/review');


router.get('/', middlewares.checkAuthentication, ReviewController.getAllReviews); // List all reviews
router.post('/', middlewares.checkAuthentication, ReviewController.postReview);
router.put('/:id', middlewares.checkAuthentication, ReviewController.updateReview);
router.delete('/:id', middlewares.checkAuthentication, ReviewController.deleteReview);

module.exports = router;

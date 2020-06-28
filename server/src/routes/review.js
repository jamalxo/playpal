"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const ReviewController = require('../controllers/review');


router.get('/', middlewares.checkAuthentication, ReviewController.list); // List all reviews
router.post('/', middlewares.checkAuthentication, ReviewController.create); // Create a new review
//router.get('/:id', MovieController.read); // Read a movie by Id
//router.put('/:id', middlewares.checkAuthentication, MovieController.update); // Update a movie by Id
//router.delete('/:id', middlewares.checkAuthentication, MovieController.remove); // Delete a movie by Id


module.exports = router;

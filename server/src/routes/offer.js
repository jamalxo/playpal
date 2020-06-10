"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const OfferController = require('../controllers/offer');


router.get('/offer', OfferController.list); // List all movies
router.post('/offer', middlewares.checkAuthentication, OfferController.create); // Create a new movie
router.get('/offer/:id', OfferController.read); // Read a movie by Id
router.put('/offer/:id', middlewares.checkAuthentication, OfferController.update); // Update a movie by Id
router.delete('/offer/:id', middlewares.checkAuthentication, OfferController.remove); // Delete a movie by Id


module.exports = router;

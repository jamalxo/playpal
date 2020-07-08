"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const OfferController = require('../controllers/offer');


router.get('/', OfferController.list); // List all offers
router.post('/', middlewares.checkAuthentication, OfferController.create); // Create a new offer
router.get('/:id', OfferController.read); // Read a movie by Id
router.put('/:id', middlewares.checkAuthentication, OfferController.update); // Update a movie by Id
router.delete('/:id', middlewares.checkAuthentication, OfferController.remove); // Delete a movie by Id

module.exports = router;

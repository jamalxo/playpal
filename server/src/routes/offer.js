"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const OfferController = require('../controllers/offer');

router.get('/', OfferController.list);
router.post('/', middlewares.checkAuthentication, OfferController.create);
router.get('/:id', OfferController.read);
router.put('/:id', middlewares.checkAuthentication, OfferController.update);
router.delete('/:id', middlewares.checkAuthentication, OfferController.remove);

module.exports = router;

"use strict";

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request')

const middlewares = require('../middlewares');
router.get('/:id', requestController.read); // Answer Request

router.post('/create', middlewares.checkAuthentication, requestController.create ); // Create Request
router.put('/answer', middlewares.checkAuthentication, requestController.answer); // Answer Request
router.put('/finish', middlewares.checkAuthentication, requestController.finish); // Answer Request
router.put('/cancel', middlewares.checkAuthentication, requestController.cancel); // Answer Request

module.exports = router;

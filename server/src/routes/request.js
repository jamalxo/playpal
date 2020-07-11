"use strict";

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request')

const middlewares = require('../middlewares');
router.post('/create', middlewares.checkAuthentication, requestController.create ); // Create Request
router.put('/answer', middlewares.checkAuthentication, requestController.answer); // Answer Request

module.exports = router;

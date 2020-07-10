"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
router.post('/create', middlewares.checkAuthentication); // Create Request
router.put('/answer', middlewares.checkAuthentication); // Answer Request

module.exports = router;

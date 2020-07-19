"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const requestController = require('../controllers/request')

router.get('/:id', requestController.read);
router.post('/create', middlewares.checkAuthentication, requestController.create);
router.put('/answer', middlewares.checkAuthentication, requestController.answer);
router.put('/finish', middlewares.checkAuthentication, requestController.finish);
router.put('/cancel', middlewares.checkAuthentication, requestController.cancel);

module.exports = router;

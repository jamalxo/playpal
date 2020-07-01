"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AuthController = require('../controllers/auth');

router.get('/', middlewares.checkAuthentication, AuthController.getProfiles);
router.get('/:id', middlewares.checkAuthentication, AuthController.getProfile);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);


module.exports = router;

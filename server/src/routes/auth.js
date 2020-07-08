"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AuthController = require('../controllers/auth');

router.get('/', middlewares.checkAuthentication, AuthController.getProfiles);
router.get('/:id', middlewares.checkAuthentication, AuthController.getProfile);
router.post('/login', AuthController.login);
router.post('/register', middlewares.upload.single('profileImage'), AuthController.register);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);
router.post('/addPendingOffer/', middlewares.checkAuthentication, AuthController.addPendingOffer);
router.post('/removePendingOffer/',middlewares.checkAuthentication, AuthController.removePendingOffer);
router.post('/addRequestedOffer/', middlewares.checkAuthentication, AuthController.addRequestedOffer);
router.post('/removeRequestedOffer/', middlewares.checkAuthentication, AuthController.removeRequestedOffer);

module.exports = router;

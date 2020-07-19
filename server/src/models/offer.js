"use strict";

const mongoose = require('mongoose');

const Offer = new mongoose.Schema({
    price: {
        type: Number,
        required: false
    },
    game: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
});

Offer.set('versionKey', false);

module.exports = mongoose.model('Offer', Offer);

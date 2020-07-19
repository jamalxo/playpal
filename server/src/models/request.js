"use strict";

const mongoose = require('mongoose');

const Request = new mongoose.Schema({
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
    },
    requestingPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    offeringPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'cancelled'],
        default: 'pending'
    },
    game: {
        type: String
    },
    price: {
        type: Number,
    },
    message: {
        type: String
    },
    discordTag: {
        type: String,
    }
})

module.exports = mongoose.model('Request', Request);

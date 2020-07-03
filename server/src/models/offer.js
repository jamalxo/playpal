
"use strict";

const mongoose = require('mongoose');


// Define the user schema
const OfferSchema  = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    server: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    days: {
        type: [String],
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

OfferSchema.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('Offer', OfferSchema);

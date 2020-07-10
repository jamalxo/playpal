
"use strict";

const mongoose = require('mongoose');


// Define the user schema
const  Offer  = new mongoose.Schema({
    price: {
        type: Number,
        required: false
    },
    game: {
        type: String,
        required: true,
    },
    server: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    availability: [{
        startTime: {
            type: Date,
            required: false,
        },
        endTime: {
            type: Date,
            required: false,
        },
        day: {
            type: [String],
            required: false,
        },
    }]

});

Offer.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('Offer', Offer);

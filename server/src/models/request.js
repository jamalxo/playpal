"use strict";

const mongoose = require('mongoose');
const RequestSchema  = new mongoose.Schema({
    offer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
    },
    requestingPlayer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status:
        {
            type: String,
            enum: ['pending', 'accepted','rejected'],
            default: 'pending'
        },

})
module.exports = mongoose.model('Request', RequestSchema);

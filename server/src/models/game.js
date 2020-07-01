"use strict";

const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date:{
        type: mongoose.Schema.Date
    }
})
module.exports = mongoose.model('Game', GameSchema);

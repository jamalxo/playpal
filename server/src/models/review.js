"use strict";

const mongoose = require('mongoose');


// Define the user schema
const Review  = new mongoose.Schema({
    ratedUser:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    /*postedBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },*/
    rating:
        {
            type: Number,
            enum: [0,1,2,3,4,5],
            required: true
        },
    review:
        {
            type: String,
            required: true
        }
});

Review.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('Review', Review);

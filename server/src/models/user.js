"use strict";

const mongoose = require('mongoose');


// Define the user schema
const UserSchema = new mongoose.Schema({
    username:
        {
            type: String,
            required: true,
            unique: true
        },
    password:
        {
            type: String,
            required: true,
        },
    email:
        {
            type: String,
            required: true,
            unique: true
        },
    usertype:
        {
            type: String,
            enum: ['professional', 'casual'],
            required: true
        },
    firstname:
        {
            type: String,
            required: true,
        },
    lastname:
        {
            type: String,
            required: true,
        },
    creditCardInfo:
        {
            type: String,
            required: false,
        },
    description:
        {
            type: String,
            required: false,
        },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    profileImage: {
        type: String,
        required: false,
    },
    pendingRequests:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request'
    }],
    createdRequests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Request'
    }],
    upcomingGames:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Request'
    }],

});

UserSchema.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('User', UserSchema);

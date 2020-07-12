"use strict";

const RequestModel = require('../models/request');
const UserModel = require('../models/user');
const OfferModel = require('../models/offer')
const answer = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
        let request = UserModel.findByIdAndUpdate({_id: req.body.requestId},
            {status:req.body.status});
        let offer = OfferModel.findById(request.offer)

        UserModel.findByIdAndUpdate(
            {_id: req.userId},
            {$pull:{pendingOffers:request._id}},
            {safe: true, upsert: true},
            function(err, model) {
                console.log(err);
            }
        )
        UserModel.findByIdAndUpdate(
            {_id: offer.owner},
            {$pull:{createdRequests:request._id}},
            {safe: true, upsert: true},
            function(err, model) {
                console.log(err);
            }
        )

        return res.status(201).json(request)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
        console.log("got request")
        let offer = OfferModel.findById(req.body.offerId)

        let requestObj = {
            requestingPlayer: req.userId,
            offer: req.body.offer,
            status:'pending',
            game: offer.game,
        }
        let request = await RequestModel.create(requestObj);

        UserModel.findByIdAndUpdate(
            {_id: offer.owner},
            {$push:{"pendingRequests":request}},
            {safe: true, upsert: true},
            function(err, model) {
                console.log(err);
            }
        )
        UserModel.findByIdAndUpdate(
            {_id: req.userId},
            {$push:{"createdRequests":request}},
            {safe: true, upsert: true},
            function(err, model) {
                console.log(err);
            }
        )

        return res.status(201).json(request)
    } catch(err) {
        console.log(err)

        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }

}
module.exports = {
    create,
    answer
};

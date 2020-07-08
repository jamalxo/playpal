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
            {$pull:{pendingOffers:request._id}}
        )
        UserModel.findByIdAndUpdate(
            {_id: offer.owner},
            {$pull:{createdRequests:request._id}}
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
        let requestObj = {
            requestingPlayer: req.userId,
            offer: req.body.offerId,
            status:'pending'
        }
        let request = await RequestModel.create(requestObj);
        let offer = OfferModel.findById(req.body.offerId)

        UserModel.findByIdAndUpdate(
            {_id: offer.owner},
            {$push:{pendingOffers:request._id}}
        )
        UserModel.findByIdAndUpdate(
            {_id: req.userId},
            {$push:{createdRequests:request._id}}
        )

        return res.status(201).json(request)
    } catch(err) {
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

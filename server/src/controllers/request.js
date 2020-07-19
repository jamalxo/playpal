"use strict";

const RequestModel = require('../models/request');
const UserModel = require('../models/user');
const OfferModel = require('../models/offer');

const answer = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
        let request = await RequestModel.findByIdAndUpdate({_id: req.body.requestId},
            {status: req.body.status});
        await UserModel.findByIdAndUpdate(
            {_id: request.requestingPlayer},
            {$pull: {createdRequests: request._id}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )
        await UserModel.findByIdAndUpdate(
            {_id: request.offeringPlayer},
            {$pull: {pendingRequests: request._id}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )
        if (req.body.status === "accepted") {
            UserModel.findByIdAndUpdate(
                {_id: request.requestingPlayer},
                {$push: {upcomingGames: request._id}},
                {safe: true, upsert: true},
                function (err, model) {
                    console.log(err);
                }
            )
            UserModel.findByIdAndUpdate(
                {_id: request.offeringPlayer},
                {$push: {upcomingGames: request._id}},
                {safe: true, upsert: true},
                function (err, model) {
                    console.log(err);
                }
            )

        }

        return res.status(201).json(request)
    } catch (err) {
        console.log(err)
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
        let offer = await OfferModel.findById(req.body.offerId)

        let requestObj = {
            requestingPlayer: req.userId,
            offer: req.body.offerId,
            status: 'pending',
            game: offer.game,
            offeringPlayer: offer.owner,
            price: offer.price,
            message: req.body.message,
            discordTag: req.body.discordTag
        }
        let request = await RequestModel.create(requestObj);

        UserModel.findByIdAndUpdate(
            {_id: offer.owner},
            {$push: {"pendingRequests": request}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )
        UserModel.findByIdAndUpdate(
            {_id: req.userId},
            {$push: {"createdRequests": request}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )

        return res.status(201).json(request)
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }

}
const read = async (req, res) => {
    try {
        let request = await RequestModel.findById(req.params.id);
        if (!request) return res.status(404).json({
            error: 'Not Found',
            message: `Offer not found`
        });

        return res.status(200).json(request)
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};
const finish = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
        let request = RequestModel.findByIdAndUpdate({_id: req.body.requestId},
            {status: "finished"});

        UserModel.findByIdAndUpdate(
            {_id: req.userId},
            {$pull: {upcomingGames: req.body.requestId}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )
        return res.status(201).json(request)
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}
const cancel = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
        let request = await RequestModel.findByIdAndUpdate({_id: req.body.requestId},
            {status: "cancelled"});

        UserModel.findByIdAndUpdate(
            {_id: request.offeringPlayer},
            {$pull: {upcomingGames: req.body.requestId}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )
        UserModel.findByIdAndUpdate(
            {_id: request.requestingPlayer},
            {$pull: {upcomingGames: req.body.requestId}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        )

        return res.status(201).json(request)
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}


module.exports = {
    create,
    answer,
    read,
    finish,
    cancel
};

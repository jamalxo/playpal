"use strict";

const OfferModel = require('../models/offer');
const UserModel = require('../models/user');

const create = async (req, res) => {
    //req.body.owner = req.user.id;
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
        let offerObj = req.body
        offerObj.owner = req.userId
        let offer = await OfferModel.create(offerObj);

        UserModel.findById(req.userId, function(err, user) {
            if (err) return console.log("err");
            if (!user) return console.log("no user");

            user.offers.push(offer);
            user.save(function(err) {});
        });
        return res.status(201).json(offer)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let offer = await OfferModel.findById(req.params.id).exec();

        if (!offer) return res.status(404).json({
            error: 'Not Found',
            message: `Offer not found`
        });

        return res.status(200).json(offer)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let movie = await OfferModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(movie);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await OfferModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `Movie with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list  = async (req, res) => {
    try {
        let movies = await OfferModel.find({}).exec();
        return res.status(200).json(movies);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    create,
    read,
    update,
    remove,
    list,
};

"use strict";

const Review = require('../models/review');
const User = require('../models/user');

const postReview = function (req, res) {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    let review = new Review(req.body);

    User.findById(review.ratedUser, function (err, user) {
        if (err) return console.log("err");
        if (!user) return console.log("no user");

        user.reviews.push(review);
        user.save(function (err) {
            if (err) return console.log('err review');
            review.save(function (err, rev) {
                if (err) return console.log('err review ref');
                res.status(201).json(rev);
            });
        });
    });
};

const getAllReviews = async (req, res) => {
    try {
        let reviews = await Review.find({}).exec();
        return res.status(200).json(reviews);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const updateReview = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .select("rating")
            .select("text")
            .select("createdAt")
            .select("postedBy")
            .populate({
                path: 'postedBy',
                model: 'User',
                select: 'username profileImage'
            })
            .exec();

        return res.status(200).json(review);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        let review = await Review.findById(req.params.id).exec();
        User.findById(review.ratedUser, function (err, user) {
            if (err) return console.log("err");
            if (!user) return console.log("no user");

            const index = user.reviews.indexOf(req.params.id);
            if (index > -1) {
                user.reviews.splice(index, 1);
            }
            user.save(function (err) {
            });
        });
        await Review.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `Review with id${req.params.id} was deleted`});
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

module.exports = {
    getAllReviews,
    postReview,
    deleteReview,
    updateReview
};

"use strict";

const Review = require('../models/review');
const User = require('../models/user');

// const create = async (req, res) => {
//     if (Object.keys(req.body).length === 0) return res.status(400).json({
//         error: 'Bad Request',
//         message: 'The request body is empty'
//     });
//
//     try {
//         let review = await ReviewModel.create(req.body);
//
//         return res.status(201).json(review)
//     } catch(err) {
//         return res.status(500).json({
//             error: 'Internal server error',
//             message: err.message
//         });
//     }
// };

const postReview = function(req, res, next) {
    var review = new Review(req.body);

    //if (address.validateSync()) return next(commuteError.BadRequest(LOG_LABEL));

    // if (req.body.name && req.body.name == 'WORK') return next(commuteError.Forbidden(LOG_LABEL, 'User not allowed to create address of type WORK'));


    User.findById(review.ratedUser, function(err, user) {
        if (err) return console.log("err");
        if (!user) return console.log("no user");

        user.reviews.push(review);
        user.save(function(err) {
            if (err) return console.log('err review');

            review.save(function(err, xd) {
                if (err) return console.log('err review ref');
                res.status(201).json(xd);
            });
        });
    });
};


const list  = async (req, res) => {
    try {
        let reviews = await ReviewModel.find({}).exec();
        return res.status(200).json(reviews);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    list,
    postReview
};

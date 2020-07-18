"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config     = require('../config');
const UserModel  = require('../models/user');


const login = async (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    try {
        let user = await UserModel.findOne({username: req.body.username}).exec();

        // check if the password is valid
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send({token: null});

        // if user is found and password is valid
        // create a token
        const token = jwt.sign({id: user._id, username: user.username}, config.JwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return res.status(200).json({token: token});
    } catch(err) {
        return res.status(404).json({
            error: 'User Not Found',
            message: err.message
        });
    }
};


const register = async (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        usertype: req.body.usertype,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        description: req.body.description,
        profileImage: "http://localhost:3000/" + req.file.path,
        availability: JSON.parse(req.body.availability)
    };

    try {
        let retUser = await UserModel.create(user);

        // if user is registered without errors
        // create a token
        const token = jwt.sign({id: retUser._id, username: retUser.username}, config.JwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({token: token});
    } catch(err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: 'User exists',
                message: err.message
            });
        } else {
            return res.status(500).json({
                error: 'Internal server error',
                message: err.message
            });
        }
    }
};


const me = async (req, res) => {
    try {
        let user = await UserModel.findById(req.userId).select('username').exec();

        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};

const getProfiles = async (req, res) => {
    try {
        let users = await UserModel.find({ usertype: "professional" })
            .populate({
                path: 'reviews',
                select: 'rating text createdAt',
                populate: {
                    path: 'postedBy',
                    model: 'User',
                    select: 'username profileImage'
                }
            })
            .populate({
                path: 'offers',
                model: 'Offer',
                select: 'price game server availability'
            });
        // console.log(users);

        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
            .populate({
                path: 'reviews',
                select: 'rating text createdAt',
                populate: {
                    path: 'postedBy',
                    model: 'User',
                    select: 'username profileImage'
                }
            })
            .populate({
                path: 'offers',
                model: 'Offer',
                select: 'price game server availability'
            });
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `Profile not found`
        });

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


const updateAvailability = async (req, res) => {
    try{
        UserModel.findById(req.params.id, function(err, user) {
            if (err) return console.log("err");
            if (!user) return console.log("no user");

            user.availability = req.body;
            user.save(function(err) {
                if (err) return console.log('err availability');
            });
            return res.status(200).json(user.availability);
        });

    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}

const addPendingOffer = async (req, res) => {
    try{
        UserModel.findByIdAndUpdate(
            {_id: req.body.playerId},
            {$push:{pendingOffers:req.body.offerId}}
            )
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
}
}
const removePendingOffer = async (req, res) => {
    try{
        UserModel.findByIdAndUpdate(
            {_id: req.body.playerId},
            {$pull:{pendingOffers:req.body.offerId}}
        )
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}


const addRequestedOffer = async (req, res) => {
        try{
            UserModel.findByIdAndUpdate(
                {_id: req.body.playerId},
                {$push:{requestedOffers:req.body.offerId}}
            )
        } catch(err) {
            return res.status(500).json({
                error: 'Internal server error',
                message: err.message
            });
        }
}

const removeRequestedOffer = async (req, res) => {
    try{
        UserModel.findByIdAndUpdate(
            {_id: req.body.playerId},
            {$pull:{requestedOffers:req.body.offerId}}
        )
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}




module.exports = {
    login,
    register,
    logout,
    me,
    getProfile,
    getProfiles,
    addPendingOffer,
    addRequestedOffer,
    removeRequestedOffer,
    removePendingOffer,
    updateAvailability
};

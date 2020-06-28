"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config     = require('../config');
const UserModel  = require('../models/user');
const ReviewModel = require('../models/review');
const find = require('array.prototype.find');

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


    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

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
        let users = await UserModel.find({ usertype: "professional" }).select('username').select('firstname').select('lastname').select('description').exec();
        //let users = await UserModel.find({ usertype: "professional" }).select('username').exec();
        //let users = await UserModel.find({ }).exec();
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
        let user = await UserModel.findById(req.params.id).exec();

        let agg = await ReviewModel.aggregate([{
            $group: {
                _id: "$ratedUser",
                avgAmount: {
                    $avg: "$rating"
                }
            }
        }]);
        console.log(find(agg, function(x) { return x._id == req.params.id }).avgAmount);

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

module.exports = {
    login,
    register,
    logout,
    me,
    getProfile,
    getProfiles
};

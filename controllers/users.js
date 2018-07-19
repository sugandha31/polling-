var users = require('../models/users');
var uid = require('uuid');
var pwd_validator = require('password-validator');
var email_validator = require('email-validator');
var bcrypt = require('bcrypt');
var helper = require('./helper');

module.exports = {
    getUsers: getUsers,
    signup : signup
}

function signup(req,res){
    if(req.body.hasOwnProperty('email') && req.body.hasOwnProperty('user_name') && req.body.hasOwnProperty('password')){
        var email = req.body.email;
        var user_name = req.body.user_name;
        var password = req.body.password;
        
        var data = {
            email : '',
            user_name : '',
            password : '',
            user_id : ''
        }
        if(email_validator.validate(data.email)){
            data.user_id = helper.encryptData(email + "$$aa$$" + user_name);
            bcrypt.hash(password, 10, function(err, hash){
                if(!err){
                    data.password = hash;
                }else{
                    res.status(500).json({
                        status: false,
                        message: "Something seems to have failed. Try again.",
                        data: {}
                    })
                }
            })
            users.add(data, function(err, result){
                if(!err){
                    res.status(200).json({
                        status: true,
                        message: "User added",
                        data: {}
                    })
                }else{
                    console.log(err);
                    res.status(500).json({
                        status: false,
                        message: "Something seems to have failed. Try again.",
                        data: {}
                    })
                }
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Invalid email",
                data: {}
            });
        }        
    }else{
        res.status(400).json({
            status: false,
            message: "Data Missing",
            data: {}
        })
    }
}

function getUsers(req, res){
    users.getAll(function(err, result){
        console.log(result);
        if(!err){
            res.status(200).json({
                status: true,
                message: "All users fetched",
                data: result
            })
        }else{
            console.log(err);
            res.status(500).json({
                status: false,
                message: "Try again",
                data: {}
            })
        }
    })
}
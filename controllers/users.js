var users = require('../models/users');
var uid = require('uuid');
var pwd_validator = require('password-validator');
var email_validator = require('email-validator');
var helper = require('./helper');

module.exports = {
    getUsers: getUsers,
    signup : signup,
    login : login
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
        if(email_validator.validate(email)){
            users.getByField('email', email, function(err, response){
                if(!err && response.length==0){
                    users.getByField('user_name', user_name, function(err, resp){
                        if(!err && resp.length==0){
                            data.user_id = helper.encryptData(email + "$$aa$$" + user_name);
                            data.password = helper.encryptData(password);
                            data.email = email;
                            data.user_name = user_name;
                            users.add(data, function(err, result){
                                if(!err){
                                    res.status(200).json({
                                        status: true,
                                        message: "User added",
                                        data: {}
                                    })
                                }else{
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
                                message: "Username exists.",
                                data: {}    
                            })
                        }
                    })
                }else{
                    console.log(response);
                    res.status(400).json({
                        status: false,
                        message: "Duplicate registration.",
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

function login(req, res){
    if(req.query.hasOwnProperty('email') && req.query.hasOwnProperty('password')){
        var email = req.query.email;
        var password = req.query.password;
        users.getByField('email', email, function(err, result){
            console.log(result);
            if(!err && result.length>0){
                console.log(result);
                password = helper.encryptData(password);
                //var result_object = JSON.stringify(result);
                //result_object = JSON.parse(result_object);
                console.log(password);
                console.log("--------"+result);
                if(password===result.password){
                    res.status(200).json({
                        status: true,
                        message: "User Authentication Successfull.",
                        data: {}
                    })
                }else{
                    res.status(400).json({
                        status: false,
                        message: "Password does not match.",
                        data: {}
                    })
                }
            }else if(!err && result.length==0){
                res.status(404).json({
                    status: false,
                    message: "User not Found.",
                    data: {}
                })
            }else{
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
            message: "Data Missing",
            data: {}
        })
    }
}

function getUsers(req, res){
    users.getAll(function(err, result){
        if(!err){
            res.status(200).json({
                status: true,
                message: "All users fetched",
                data: result
            })
        }else{
            res.status(500).json({
                status: false,
                message: "Try again",
                data: {}
            })
        }
    })
}
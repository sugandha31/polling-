var commonDB = require('../models/commonDB');
var users = require('../models/users');
var email_validator = require('email-validator');
var helper = require('./helper');
var dbTables = require('../config/db_table');

module.exports = {
    getUsers: getUsers,
    signup: signup,
    login: login,
    logout: logout,
    changePassword: changePassword,
    getSession:getSession
}

function signup(req, res) {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('user_name') && req.body.hasOwnProperty('password') && req.body.hasOwnProperty('name')) {
        var email = req.body.email;
        var user_name = req.body.user_name;
        var password = req.body.password;
        var name = req.body.name;
        var data = {
            name: '',
            email: '',
            user_name: '',
            password: '',
            user_id: ''
        }
        if (email_validator.validate(email)) {
            commonDB.getByField(dbTables.users, 'email', email, function (err, response) {
                response = JSON.parse(response);

                if (!err && response.length == 0) {
                    commonDB.getByField(dbTables.users, 'user_name', user_name, function (err, resp) {
                        resp = JSON.parse(resp);
                        if (!err && resp.length == 0) {
                            data.name = name;
                            data.user_id = helper.encryptData(email + "$$aa$$" + user_name);
                            data.password = helper.encryptData(password);
                            data.email = email;
                            data.user_name = user_name;
                            commonDB.add(dbTables.users, data, function (err, result) {
                                if (!err) {
                                    users.updateSession(email, "false", function (err, data) {
                                        if (!err) {
                                            res.json({
                                                status: true,
                                                message: "User Added Successfully.",
                                                data: data
                                            });
                                        } else {
                                            res.json({
                                                status: false,
                                                message: "Unable to update session",
                                                data: {}
                                            });
                                        }
                                    });
                                } else {
                                    res.json({
                                        status: false,
                                        message: "Something seems to have failed. Try again.",
                                        data: {}
                                    })
                                }
                            })
                        } else {
                            res.json({
                                status: false,
                                message: "Username exists.",
                                data: {}
                            })
                        }
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Duplicate registration.",
                        data: {}
                    })
                }
            })
        } else {
            console.log(email);
            res.json({
                status: false,
                message: "Invalid email",
                data: {}
            });
        }
    } else {
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        })
    }
}

function login(req, res) {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
        var email = req.body.email;
        var password = req.body.password;
        commonDB.getByField(dbTables.users, 'email', email, function (err, result) {
            result = JSON.parse(result);
            console.log(result);
            if (!err && (result != undefined || result != null) && result.length > 0) {
                password = helper.encryptData(password);
                if (password == result[0].password) {
                    users.validateSession(email, function (err, resultData) {
                        if (!err) {
                            if (resultData[0].session == 'true') {
                                res.status(200).json({
                                    status: true,
                                    message: "User Already Logged In.",
                                    data: {}
                                });
                            } else if (resultData[0].session == 'false') {
                                users.updateSession(email, "true", function (err, data) {
                                    if (!err) {
                                        commonDB.getByField(dbTables.users, 'email', email, function (err, data) {
                                            data = JSON.parse(data);
                                            if (!err) {
                                                res.json({
                                                    status: true,
                                                    message: "User Authentication Successfull.",
                                                    data: data
                                                });
                                            } else {
                                                res.json({
                                                    status: false,
                                                    message: "Unable to fetch data of user",
                                                    data: {}
                                                });
                                            }
                                        });

                                    } else {
                                        res.json({
                                            status: false,
                                            message: "Unable to update session",
                                            data: {}
                                        });
                                    }
                                });
                            }
                        } else {
                            res.json({
                                status: false,
                                message: "Unable to validate session",
                                data: {}
                            });
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Password does not match.",
                        data: {}
                    })
                }
            } else if (!err && (result != undefined || result != null) && result.length == 0) {
                res.json({
                    status: false,
                    message: "User not Found.",
                    data: {}
                })
            } else {
                res.json({
                    status: false,
                    message: "Something seems to have failed. Try again.",
                    data: {}
                })
            }
        })
    } else {
        res.json({
            status: false,
            message: "Data Missing",
            data: {}
        })
    }
}

function logout(req, res) {
    users.updateSession(req.query.email, "false", function (err, data) {
        if (!err) {
            res.json({
                status: true,
                message: "User Loggedd Out Successfully.",
                data: {}
            });
        } else {
            res.json({
                status: false,
                message: "Unable to update session",
                data: {}
            });
        }
    });
}


function getUsers(req, res) {
    commonDB.getAll(dbTables.users, function (err, result) {
        if (!err) {
            res.json({
                status: true,
                message: "All users fetched",
                data: result
            })
        } else {
            res.json({
                status: false,
                message: "Try again",
                data: {}
            })
        }
    })
}

function changePassword(req, res) {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('oldPassword') && req.body.hasOwnProperty('newPassword')) {
        commonDB.getByField(dbTables.users, 'email', req.body.email, function (err, data) {
            data = JSON.parse(data);
            if (!err) {
                if (data[0].password == helper.encryptData(req.body.oldPassword)) {
                    users.changePassword(req.body.email, req.body.newPassword, function (err, data) {
                        if (!err) {
                            res.json({
                                status: true,
                                message: "Successfully updated",
                                data: {}
                            })
                        } else {
                            res.json({
                                status: false,
                                message: "Something seems to have failed. Try again",
                                data: {}
                            })
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Password did not matched",
                        data: {}
                    })
                }

            } else {
                res.json({
                    status: false,
                    message: "Try again",
                    data: {}
                })
            }
        })
    } else {
        res.json({
            status: false,
            message: "Data Missing",
            data: {}
        })
    }
}
}

function getSession(req,res){

    if(req.query.hasOwnProperty('userid')){
        var userid=req.query.userid;
        commonDB.getByField(dbTables.users,'user_id',userid,function(err,data){
            data = JSON.parse(data);
            console.log(data);
            res.status(200).json({
                status: true,
                message: "Fetched Data",
                data: data[0].session
            })
        });

    }else{
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        })
    }

}


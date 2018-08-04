var commonDB = require('../models/commonDB');
var dbTables = require('../config/db_table');
var polls = require('../models/poll');

module.exports = {
    create_poll: create_poll,
    checkSimilar: checkSimilar,
    approvePoll:approvePoll
}

function create_poll(req, res) {

    if (req.body.hasOwnProperty('poll') && req.body.hasOwnProperty('userID') && req.body.hasOwnProperty('is_anony') && req.body.hasOwnProperty('cat_id') && req.body.hasOwnProperty('option')) {

        var polldata = {
            poll: req.body.poll,
            user_id: req.body.userID,
            is_anonymous: req.body.is_anony,
            category_id: req.body.cat_id,
        }

        commonDB.getByField(dbTables.polls, 'poll', polldata.poll, function (err, result) {
            console.log(result + "poll---" + polldata.poll);

            result = JSON.parse(result);
            if (!err) {
                if (result.length > 0) {
                    res.status(200).json({
                        status: false,
                        message: "Poll Already Exist",
                        data: {}
                    });
                } else {
                    commonDB.add(dbTables.polls, polldata, function (err, result) {
                        if (!err) {
                            console.log(result);

                            commonDB.getByField(dbTables.polls, 'poll', polldata.poll, function (err, data) {
                                if (!err) {
                                    data = JSON.parse(data);
                                    var ques_id = data[0].id;
                                    var option = (req.body.option);
                                    var data_option = {
                                        question_id: '',
                                        option_value: ''
                                    }
                                    var valid = true;
                                    for (var i = 0; i < option.length; i++) {
                                        data_option.question_id = ques_id;
                                        data_option.option_value = option[i].option_value;
                                        commonDB.add(dbTables.option, data_option, function (err, result) {
                                            if (err) {
                                                valid = false;
                                            }
                                        });
                                    }
                                    if (valid) {
                                        res.status(200).json({
                                            status: true,
                                            message: "Poll Created",
                                            data: { result }
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: false,
                                            message: "Unable to create poll options",
                                            data: {}
                                        });
                                    }
                                } else {
                                    res.status(200).json({
                                        status: false,
                                        message: "Unable to fetch question id",
                                        data: {}
                                    });
                                }
                            });
                        } else {
                            res.status(200).json({
                                status: false,
                                message: "unable to create poll",
                                data: {}
                            });
                        }

                    });

                }

            } else {
                res.status(200).json({
                    status: false,
                    message: "Unable to check existing poll",
                    data: {}
                });
            }

        });


    } else {
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        });
    }
}

function checkSimilar(req, res) {
    if (req.query.hasOwnProperty('poll')) {
        polls.promptDuplicate(req.query.poll, function (err, data) {

            if (!err) {
                res.status(200).json(data);
            } else {
                res.status(200).json(data);
            }
        });
    } else {
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        });
    }
}

function approvePoll(req, res) {
    if (req.query.hasOwnProperty('approve') && req.query.hasOwnProperty('id')) {
        var fieldKey = {
            "one": "isActive"
        }
        var fieldValue = {
            "one": "true"
        }
        var id = req.query.id;
        commonDB.updateByField(dbTables.polls, fieldKey, fieldValue, 'id', id, function (data) {
            if(data == "updated"){
                res.status(200).json({
                    status: true,
                    message: "Updated",
                    data: {}
                });
            }else{
                res.status(200).json({
                    status: true,
                    message: data,
                    data: "error"
                });
            }
        })

    } else {
        res.status(200).json({
            status: false,
            message: "Data Missing",
            data: {}
        });
    }
}
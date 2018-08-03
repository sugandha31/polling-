var commonDB = require('../models/commonDB');
var dbTables = require('../config/db_table');

module.exports = {
    promptDuplicate: promptDuplicate,
    insertOptions: insertOptions
}

function promptDuplicate(poll,callback) {
    var returndata = {
        status: '',
        message: '',
        data: ''
    };
    commonDB.getByFieldLike(dbTables.polls, 'poll', poll, function (err, data) {
        data = JSON.parse(data);
        if (!err) {
            if (data.length > 0) {
                returndata = {
                    status: true,
                    message: "Similar Polls",
                    data: { data }
                };
                callback(null,returndata);

            } else {
                returndata = {
                    status: true,
                    message: "No Similar Polls",
                    data: {}
                };
                callback(null,returndata);

            }
        } else {
            returndata = {
                status: false,
                message: "Unable to fetch Similar Polls",
                data: {}
            };
            callback(err,returndata);

        }

    });
}

function insertOptions(options,callback) {

    

}
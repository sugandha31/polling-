var commonDB = require('../livepoll/db_util');
var dbTables = require('../config/db_table');


module.exports = {
    live_poll: live_poll,
    updateCount:updateCount
}

function live_poll(userId, callback) {
    var returndata = {
        status: '',
        message: '',
        data: ''
    };
    commonDB.getByField(dbTables.livepoll, 'user_id', userId, function (err, data) {
        data = JSON.parse(data);
        if (!err) {
            if (data.length > 0) {
                returndata = data;
                callback(null, returndata);

            } else {
                returndata = {
                    status: true,
                    message: "No Live Poll",
                    data: {}
                };
                callback(null, returndata);

            }
        } else {
            returndata = {
                status: false,
                message: "Some Error Occurred",
                data: {}
            };
            callback(null, returndata);

        }

    });
}


function updateCount(pos, neg, id, callback) {

    commonDB.updateCount(dbTables.livepoll, pos, neg, id, function (err, data) {
        if (!err) {
            if(data=="updated")
            callback(null, true);
        }else{
            callback(null,false);
        }

    });
}
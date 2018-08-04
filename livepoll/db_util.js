var mysql = require('mysql');
var con = require('../config/db_config');
var connection = mysql.createConnection(con);
connection.connect();
db = connection;

module.exports = {
    getByField: getByField,
    updateCount:updateCount
}

function getByField(tablename, fieldKey, fieldValue, callback) {
    Query = "select * from " + tablename + " where " + fieldKey + "='" + fieldValue + "'";
    db.query(Query, function (err, data) {
        if (!err) {
            if (data != null || data != undefined) {
                callback(null, JSON.stringify(data))
            }
            else {
                callback(null, null)
            }
        }
        else {
            callback(err, null);
        }
    });
}

function updateCount(tablename, pos, neg, id,callback) {

    Query = "UPDATE `live_poll` SET `pos_count` = '" + pos + "', `neg_count` = '" + neg + "' WHERE `live_poll`.`id` = '" + id + "'";
    db.query(Query, function (err, data) {
        if (!err) {
            if (data != null || data != undefined) {
                callback(null, "updated")
            }
            else {
                callback(null, "err")
            }
        }
        else {
            callback(err, "err");
        }


    });

}
var commonDB = require('../models/commonDB');
var dbTables = require('../config/db_table');

module.exports = {
    getAllCategory: getAllCategory,
    getCategoryByUser: getCategoryByUser,
    addCategory: addCategory
};

function getAllCategory(callback) {

    commonDB.getAll(dbTables.category, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });

}


function getCategoryByUser(userId, callback) {

    commonDB.getAllWithClause(dbTables.category, "user_id", userId, "=", function (err, data) {

        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }

    });

}


function addCategory(data, callback) {

    commonDB.getAllWithClause(dbTables.category, 'user_id', data.user_id, '=', function (err, data) {
        if (!err) {
            commonDB.add(dbTables.category, data, function (err, res) {
                if (!err) {
                    callback(null, res);
                } else {
                    callback(err, null);
                }
            });
        } else {
            callback(err, null);
        }
    })

}
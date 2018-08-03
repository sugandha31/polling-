var helper = require('./helper');

module.exports = {
    getAll: getAll,
    add: add,
    getByField: getByField,
    getByFieldLike:getByFieldLike
}

function getAll(tablename, callback) {
    Query = 'select * from ' + tablename;
    db.query(Query, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });
}

function add(tablename, data, callback) {
    helper.insertQuery(data, function (err, Query) {
        Query = "insert into " + tablename + Query
        db.query(Query, function (err, resp) {
            if (!err) {
                callback(null, resp)
            } else {
                callback(err, null)
            }
        })
    })
}

function getByFieldLike(tablename, fieldKey, fieldValue, callback) {
    Query = "select * from " + tablename + " where " + fieldKey + " LIKE '%" + fieldValue + "%'";
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
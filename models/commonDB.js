var helper = require('./helper');

module.exports = {
    getAll: getAll,
    add: add,
    getByField: getByField,
    getByFieldLike: getByFieldLike,
    updateByField: updateByField,
    getAllWithClause:getAllWithClause
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

// get all using where clause
function getAllWithClause(tablename,clauseKey,clauseVal,conditionType, callback) {
    Query = "select * from " + tablename + " where "+clauseKey+" "+conditionType+" '"+ clauseVal+"'";
    console.log(Query);
    db.query(Query, function (err, data) {
        console.log(err);
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

function updateByField(tablename, fieldKey, fieldValue, clauseKey, clauseValue, callback) {
    var query = "UPDATE " + tablename + " SET ";
    Object.keys(fieldValue).forEach(function (key) {
        if (!(fieldValue[key] === null || fieldValue[key] === ""))
            query += fieldKey[key] + " ='" + fieldValue[key] + "',";
    });
    query += " WHERE " + clauseKey + " = '" + clauseValue + "'";
    var n = query.lastIndexOf(",");
    query = query.slice(0, n) + query.slice(n).replace(",", "");
    console.log(query);

    db.query(query, function (err, data) {
        console.log("err--"+err);
        console.log("data--"+data);
        
        if (!err) {
                callback("updated")
        }
        else {
            callback("err");
        }


    });

}
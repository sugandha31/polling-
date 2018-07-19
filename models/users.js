var tableName = 'users';
var helper = require('./helper');

module.exports = {
    getAll: getAll,
    add : add
}

function getAll(callback){
    Query = 'select * from ' + tableName;
    db.query(Query, function(err,data){
        if(!err){
            callback(null,data);
        }else{
            callback(err,null);
        }
    });
}

function add(data, callback){
    helper.insertQuery(data,function (err,Query) {
        Query = "insert into "+tableName+Query
        db.query(Query,function(err,resp){
            if(!err){
                callback(null,null)
            }else{
                callback(err,null)
            }
        })            
    })
}
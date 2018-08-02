var tablename = 'users';
var helper = require('./helper');

module.exports = {
    getAll: getAll,
    add : add,
    getByField : getByField
}

function getAll(callback){
    Query = 'select * from ' + tablename;
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
        Query = "insert into "+tablename+Query
        db.query(Query,function(err,resp){
            if(!err){
                callback(null,resp)
            }else{
                callback(err,null)
            }
        })            
    })
}

function getByField(fieldKey, fieldValue,callback){
    Query = "select * from "+tablename+" where "+fieldKey+"='"+fieldValue+"'";
    db.query(Query,function(err,data){
        if(!err){
            //console.log(data);
            if(data!=null || data!=undefined){
                console.log("from model--"+JSON.stringify(data));
                callback(null,JSON.stringify(data))
            }
            else{
                callback(null,null)
            }
        }
        else{
            callback(err,null);
        }
    });
}
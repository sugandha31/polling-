var commonDB = require('../models/commonDB');
var dbTables = require('../config/db_table');

module.exports = {
    getAllCategory: getAllCategory,
    getCategoryByUser:getCategoryByUser
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


function getCategoryByUser(userId,callback){

    commonDB.getAllWithClause(dbTables.category, "user_id",userId,"=",function(err,data){

        if(!err){
            callback(null,data);
        }else{
            callback(err,null);
        }

    });

}

/*
Todo : insert into user category
*/
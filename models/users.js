var dbTables = require('../config/db_table');
var tablename = dbTables.users;
var crypto = require('../controllers/helper');

module.exports = {
    validateSession: validateSession,
    updateSession:updateSession,
    changePassword:changePassword
}

//function to validate session
function validateSession(email,callback){
    Query = 'select session from ' + tablename +' WHERE email = "'+email+'"';
    db.query(Query, function(err,data){
        if(!err){
            callback(null,data);
        }else{
            callback(err,null);
        }
    });
}

// function to update session
function updateSession(email,value,callback){
    Query = 'UPDATE '+tablename +' SET session ="' +value +'" WHERE email = "'+email+'"';
    db.query(Query, function(err,data){
        if(!err){
            callback(null,data);
        }else{
            callback(err,null);
        }
    });
}

// function to change password
function changePassword(email,value,callback){
    Query = 'UPDATE '+tablename +' SET password ="' +crypto.encryptData(value) +'" WHERE email = "'+email+'"';
    db.query(Query, function(err,data){
        if(!err){
            callback(null,data);
        }else{
            callback(err,null);
        }
    });
}
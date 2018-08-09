const async = require('async');

module.exports = {
    insertQuery : insertQuery
}

function insertQuery(user, callback) {
    var keys="";
    var values="";
    var Query="";
    async.eachSeries(Object.keys(user),function(key,next){
            if(user[key]===null){
                values=values+user[key]+",";
            }
            else{
                values=values+"'"+user[key]+"'"+",";
            }
        
        keys=keys+key+",";
        next()
    },function(){
        keys=keys.substr(0,keys.length-1);
        values=values.substr(0,values.length-1);
        Query+="("+keys+") values ("+values+")";
    });
    callback(null, Query);
}
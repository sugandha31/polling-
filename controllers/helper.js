var crypto = require('crypto');
var async = require('async');

module.exports = {
    encryptData : encryptData,
    decryptData : decryptData
}

function encryptData(text) {
    algorithm = 'aes-256-ctr',
    password = 'buddycryptosecret';
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decryptData(text) {
    algorithm = 'aes-256-ctr',
    password = 'buddycryptosecret';
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
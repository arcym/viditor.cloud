
// Version 15.04#01
// Sun Feb 22 17:44:26 2015 | 1424645066
// Module to wrap node-mailer in an accessable function to code,
// that accepts and decrypts passwords from mail.keys.js file

var keys   = require('./mail.keys.js');
// mail.keys.js follows this structure
// exports.mailAddress   = '[INSERT emailaddress]';
// exports.cryptPassword = '[INSERT a password for encryption key]';
// exports.hashValue     = '[INSERT encripted password value]';

var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = keys.cryptPassword;

function decrypt(text)
{ 
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',                  //EMAIL SERVICE
    auth:
    {
        user: keys.mailAddress,       
        pass: decrypt(keys.hashValue),
    }
});

module.exports =
    {
    notify: function notifyByMail(title,message)
        {
        transporter.sendMail(
            {
            from: keys.mailAddress,
            to:   keys.mailAddress,
            subject: title,
            text: message
        });
        return;
    }
};

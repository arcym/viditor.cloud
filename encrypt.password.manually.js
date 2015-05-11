
// Verion: 15.04#01
// Fri Jan 23 19:38:20 2015 | 1422059900
// Tool to MANNAULLY produce encryped email password for use in mailKey.js
// Replace ENCRYPTION PASSWORD and EMAIL PASSWORD
// with the respective values for those uses.
// Then run the program to output an encrypted hash value to use with your password

var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'ENCRYPTION PASSWORD'; 

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

var hw = encrypt("EMAIL PASSWORD");
console.log(hw);

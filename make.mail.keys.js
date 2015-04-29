
// Version 15.04#01
// Thu Apr  9 21:50:14 2015 | 1428630614
//
// Program interactively asks user for email address, email password, and encryption password.
// Program then constructs a (new) mail.keys.js file, with an encrypted password.
// Then, if told to, sends an email to the address to verify
// the address and password have been entered correctly

var fs = require('fs');
var inquirer = require('inquirer');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr';
var notifier = require("./notifyByMail.js");

function encrypt(text,encryptPassword){
    var cipher = crypto.createCipher(algorithm,encryptPassword)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

var questions = [
    {
        type: 'input',
        name: 'emailAddress',
        message: 'Please type the email address which you would like to get Viditor notifications: ',
    },
    {
        type: "password",
        message: "Please enter your email password: ",
        name: "emailPassword"
    },
    {
        type: "password",
        message: "Enter an encryption password: ",
        name: "encryptionPassword"
    },
    {
        type: 'confirm',
        name: 'emailTest',
        message: 'Test mail.keys.js file by sending an email?',
    }
];

function readWriteAsync(emailAdd,encryptionPass,emailPass)
{
    fs.readFile('./template.mail.keys.js', 'utf-8', function(err, data)
                {
                    if (err) throw err;

                    var newValue = data.replace(/\[EMAIL ADDRESS\]/i, emailAdd).replace(/\[ENCRYPTION PASSWORD\]/i, encryptionPass).replace(/\[ENCRYPTED EMAIL PASSWORD\]/i, encrypt(emailPass,encryptionPass));

                    fs.writeFile('/tmp/mail.keys.temp', newValue, 'utf-8', function (err)
                                 {
                                     if (err) throw err;
                                     fs.rename('/tmp/mail.keys.temp', './mail.keys.js', function (err)
                                               {
                                                   if (err) throw err;
                                                   console.log('mail.keys.js file created.');
                                               });
                                 });
                });
}


inquirer.prompt(questions, function(params)
                {
                    readWriteAsync(params.emailAddress, params.encryptionPassword, params.emailPassword);
                    if (params.emailTest === true)
                    {
                        notifier.notify("Viditor mail test succeeded!","Viditor will be able to notify you by email!");
                    }
                });

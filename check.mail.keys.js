
// Version: 15.04#01
// Sat Apr 11 23:08:37 2015 | 1428808117
//
// Sends an email to verify mail.keys.js is properly formatted.

var notifier = require("./notifyByMail.js");
notifier.notify("Viditor mail test succeeded!","Viditor will be able to notify you by email!");

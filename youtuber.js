var ytdl = require("ytdl-core");
var fs = require("fs");
var q = require("q");

module.exports.download = function(ytid)
{
	var deferred = q.defer();
	
	var downloading = ytdl("http://www.youtube.com/watch?v=" + ytid);
	
	downloading.on("error", function(error) {deferred.reject(error);});
	downloading.on("end", function() {deferred.resolve(ytid);});
	
	downloading.pipe(fs.createWriteStream(process.env.ASSET_ARCHIVE + "/" + ytid + ".flv"));
	
	return deferred.promise;
}
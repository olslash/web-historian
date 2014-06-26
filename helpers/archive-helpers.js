var through = require('through');
var split = require('split');
var http = require('http');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(path, cb){
  //readListofUrls
  //is it in there
  path = path.substring(1);

  var file = fs.createReadStream('archives/sites.txt');
  file.pipe(split()).pipe(through(function(line){

    if(line === path) { cb(); }
  }));

};

exports.addUrlToList = function(path){
  fs.appendFile('/archives/sites.txt', path, function (err) {
    if (err) throw err;
    console.log(path + ' was appended to file!');
  });
};

exports.isUrlArchived = function(){
  //if not isURLInList
  // addURLtolist
  // return true;
};

exports.downloadUrls = function(){
  // if
  var req = http.get('http://www.cnn.com', function(res) {
    var stream = fs.createWriteStream('www.cnn.com');
    res.pipe(stream);
  });
};

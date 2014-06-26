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

var stripPath = function(path) {
  return path[0] === '/' ? path.substring(1) : path; // strip leading slash

}
exports.readListOfUrls = function(){
};

exports.isUrlInList = function(path, foundCB, notFoundCB){
  //readListofUrls
  //is it in there
  path = stripPath(path);
  var found = false;

  var file = fs.createReadStream('archives/sites.txt');

  file.pipe(split()).pipe(through(function(line){

    if(line === path) { found = true; }
  }, function end(){
    if(found) { foundCB(); } else { notFoundCB(); }
  }));


};

exports.addUrlToList = function(path){
  path = stripPath(path);

  fs.appendFile('archives/sites.txt', path + '\n', function (err) {
    if (err) {console.log('WRITE ERROR ON SITES.TXT');}
    console.log(path + ' was appended to file!');
  });
};

exports.isUrlArchived = function(path, foundCB, notFoundCB){
  // done?
  path = stripPath(path);
  var cachedFile = fs.createReadStream('archives/sites/' + path);

  cachedFile.on('error', function() {
    notFoundCB();
  });

  cachedFile.on('open', function(){
    foundCB();
  });
};

exports.downloadUrls = function(){
  // chron uses this function to read the list and get the URLs
  var req = http.get('http://www.cnn.com', function(res) {
    var stream = fs.createWriteStream('www.cnn.com');
    res.pipe(stream);
  });
};

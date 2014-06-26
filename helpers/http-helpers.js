/*Mittttttch*/
var url = require('url');
var fs = require('fs');

var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var serveAssets = function(res, asset) {
  var statusCode = 200;
  res.writeHead(statusCode, headers);
  var file = fs.createReadStream(asset);

  file.on('open', function() {
    file.pipe(res);
  });

  file.on('end', function(){
    res.end(null);
  });
};

exports.postResponse = function(req,res) {
  sendResponse(res);
};

exports.getResponse = function(req, res) {
  var path = url.parse(req.url).pathname;
  if(path === '/') {
    serveAssets(res, archive.paths.siteAssets + '/' + 'index.html');
    // serveAssets(res, archive.paths.siteAssets + '/' + 'styles.css');
  }
  else {
    // not on root path
    archive.isUrlArchived(path, function(){
      console.log('found');
      // found cache of this URL; serve it
    }, function (){
      console.log('Cache of this URL not found');
      // didn't find the cache
      // is the url in the list to be scraped?
      archive.isUrlInList(path, function(){
        // success-- URL is already in the list
        console.log('URL is already in the list');
        // todo: redirect to loading
      }, function(){
        console.log('Trying to add the URL to the list')
        // fail-- URL is not in the list. Add it.
        archive.addUrlToList(path);
        // todo: redirect to loading
      });
    });
  }
};

exports.sendOptionsResponse = function(req,res) {
  sendResponse(res);
};

exports.send404 = send404 = function(req, res){
  sendResponse(res, 'Not Found', 404);
};

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
    // console.log(archive.isUrlInList(path));
    if(archive.isUrlInList(path, function(){

    }))
  //   if (archive.isUrlArchived(path)) {
  //     serveAssets(res, archive.paths.archivedSites + path);
  //   } else {
  //     if (!archive.isUrlInList(path)) {
  //       console.log('We did not find the path so we will add it');
  //       archive.addUrlToList(path);
  //     }
  //     serveAssets(res, archive.paths.siteAssets + '/' + 'loading.html');
  //   }
  }
};

exports.sendOptionsResponse = function(req,res) {
  sendResponse(res);
};

exports.send404 = send404 = function(req, res){
  sendResponse(res, 'Not Found', 404);
};

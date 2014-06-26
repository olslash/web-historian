
var path = require('path');

var archive = require('../helpers/archive-helpers');
var httphelpers = require('../helpers/http-helpers');

var archivesRouter = {
  'POST'   : httphelpers.postResponse,
  'GET'    : httphelpers.getResponse,
  'OPTIONS': httphelpers.sendOptionsResponse
};




exports.handler = function(request, response) {

  // var path = url.parse(request.url).pathname;
  var method = request.method;
  if (archivesRouter[method]) {
    archivesRouter[method](request, response);
  } else {
    httphelpers.send404(request, response);
  }
};

exports.handleRequest = exports.handler;

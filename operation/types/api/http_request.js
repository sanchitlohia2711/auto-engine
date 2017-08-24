'use strict';
var 
   querystring    = require('querystring'),
   request        = require('request'),
   url            = require('url'),
   http_response  = require('./http_response'),
   auto_helpers   = require('../../../helpers/utils');


var REQUIRED_KEYS = ['method', 'url'];
   
var httpRequest = function (options, callback) {
  
  var missing_keys = auto_helpers.validate_params(options, REQUIRED_KEYS);
  if (missing_keys.length > 0) {
    return callback(new Error(pRoute+"Input options not correct. Missing_keys" + missing_keys.join(',')));
  }
  this.url         = options.url;
  this.method      = options.method;
  this.headers     = options.headers || null;
  this.body        = options.body || null;
  callback(null, this);
};

httpRequest.prototype.executeRequest = function(callback) {
  var requestObj = this;
  var apiOpts    = requestObj.getApiOpts();

  request(apiOpts, function(err, resp, body) {
    var httpResp = new http_response(err, resp, body);
    return callback(null, httpResp);
  });
};

httpRequest.prototype.getApiOpts = function(){
  var requestObj = this;
  var apiOpts = {};
  apiOpts.url     = requestObj.url;
  apiOpts.method  =  requestObj.method;
  apiOpts.timeout = requestObj.timeout || 10000;
  if (requestObj.headers) {
    apiOpts.headers = requestObj.headers;
  }
  if (requestObj.body && (requestObj.headers && requestObj.headers['Content-Type'] === 'application/json')) {
    apiOpts.json = requestObj.body;
  }
  if (requestObj.body && (requestObj.headers && requestObj.headers['Content-Type'] === 'form-data')) {
    apiOpts.form = requestObj.body;
  } 
  if (requestObj.body && (requestObj.headers && requestObj.headers['Content-Type'] === 'application/x-www-form-urlencoded')) {
    apiOpts.form = requestObj.body;
  }
  return apiOpts;
};

var makeRequest = function(options, callback){
  var req = new httpRequest(options,function(err, req){
    if(err)
       return callback(err);
    req.executeRequest(callback);
  }); 
};

function constructUrlObject(options, http_config) {
  var query_params = options.query_params || {};
  return url.format({
                      host: options.hostname, 
                      pathname: options.pathname, 
                      query: query_params
                    });
}

module.exports = {
  httpRequest: httpRequest,
  makeRequest: makeRequest
};
 

"use strict";

var  
     util            = require('util'),
     _               = require('lodash'),
     http_request    = require('./http_request'),
     response        = require('./response'),
     md5             = require('md5'),
     auto_helpers    = require('../../../helpers/utils'),
     REQUEST_OPTIONS = ["method", "headers", "body", "query_params", "url"];


var operationRequest = function (params, api_config, callback) {
  this.params = params;
  this.api_config = api_config;
  this.required_keys = this.api_config.required_keys || [];
  this.request_params = {};
  callback(null, this);
};

operationRequest.prototype.executeOperation = function(callback){
  var self = this;
  
  //Validate first
  var missing_keys = auto_helpers.validate_params(self.params, self.required_keys);
  if (missing_keys.length > 0) {
    return callback(new Error("Api Operation Error: Missing keys: " + missing_keys.join(',')))
  }

  if (self.api_config.base64){
      self.api_config.base64.forEach(function(item){
          item.value = auto_helpers.executeStringReplace(self.params, item.value, item.subsitution_keys);
         _.set(self.params, item.result, base64Oeration(item.value))
      });
  }  

  if (self.api_config.md5){
      self.api_config.md5.forEach(function(item){
          item.value = auto_helpers.executeStringReplace(self.params, item.value, item.subsitution_keys);
         _.set(self.params, item.result, md5(item.value))
      });
  }  
  
  REQUEST_OPTIONS.forEach(function(item){
    if (self.api_config[item]){
        self.api_config[item].value = auto_helpers.executeJsObjReplace(self.params, self.api_config[item].value, self.api_config[item].subsitution_keys) 
        self.request_params[item] = self.api_config[item].value
    }
  }); 
  
  http_request.makeRequest(self.request_params, function(err, http_response){
    var resp = new response(self.params, self.api_config, http_response, function(err, resp){
      return resp.checkResponse(callback);
    });
  });
}

operationRequest.prototype.base64Operation = function(message) {
  return new Buffer(message).toString('base64');
}
 
var request = function(params, api_config, callback) {
  var req = new operationRequest(params, api_config, function(err, req){
    if(err)
       return callback(err);
    req.executeOperation(callback);
  });
}

module.exports = request;
   


"use strict";

var 
     util            = require('util'),
     auto_helpers    = require('../../../helpers/utils'),
     _               = require('lodash'),
     moment          = require('moment');

var operationRequest = function (params, api_config, callback) {
  this.params = params;
  this.api_config = api_config;
  this.required_keys = this.api_config.required_keys || [];
  this.vars_to_set = {};
  callback(null, this);
};

operationRequest.prototype.executeOperation = function(callback){
  var self = this;
  //Validate first
  var missing_keys = auto_helpers.validate_params(self.params, self.required_keys);
  if (missing_keys.length > 0) {
    return callback(new Error("Converter Operation Error: Missing keys: " + missing_keys.join(',')))
  }

  var resp = {
       output_vars : {}
  };
  
  if (self.api_config.set_vars)
  {
     self.api_config.set_vars.value = auto_helpers.executeJsObjReplace(self.params, self.api_config.set_vars.value, self.api_config.set_vars.subsitution_keys) 
     for (var key in self.api_config.set_vars.value) {
       _.set(resp.output_vars, key, self.api_config.set_vars.value[key]);
   }  
  }
  callback(null, resp);
}

var request = function(params, api_config, callback) {
  var req = new operationRequest(params, api_config, function(err, req){
    if(err)
       return callback(err);
    req.executeOperation(callback);
  });
}

module.exports = request;
   


"use strict";

var  
     util            = require('util'),
     _               = require('lodash'),
     auto_helpers    = require('../../../helpers/utils'),
     moment          = require('moment');

var operationRequest = function (params, api_config, callback) {
  this.params = params;
  this.api_config = api_config;
  this.required_keys = this.api_config.required_keys || [];
  this.output_vars = this.api_config.output_vars;
  callback(null, this);
};

operationRequest.prototype.executeOperation = function(callback){
  var self = this;
  //Validate first
  var missing_keys = auto_helpers.validate_params(self.params, self.required_keys);
  if (missing_keys.length > 0) {
    return callback(new Error("DateTime Operation Error: Missing keys: " + missing_keys.join(',')))
  }

  if (self.api_config.set_time){
    self.api_config.set_time.forEach(function(item){
       if (item.default && !self.params[item.result]){
          _.set(self.params, item.result, (new moment().format('YYYY-MM-DD HH:mm:ss'))); 
          return;
       }
       item.start_time = auto_helpers.executeStringReplace(self.params, item.start_time, item.subsitution_keys);
       item.duration   = Number(auto_helpers.executeStringReplace(self.params, item.duration, item.subsitution_keys));
       _.set(self.params, item.result, self.time(item.start_time, item.duration))
    })
  }
  if (self.api_config.epoch_time)
  {
     self.api_config.epoch_time.forEach(function(item){
       item.start_time = auto_helpers.executeStringReplace(self.params, item.start_time, item.subsitution_keys);
        item.duration   = Number(auto_helpers.executeStringReplace(self.params, item.duration, item.subsitution_keys));
       _.set(self.params, item.result, self.epoch_time(item.start_time, item.duration))
      });
   }
   var resp = {
       output_vars : {}
   };
   for (var key in self.output_vars) {
       _.set(resp.output_vars, key, self.params[key]);
   }
   callback(null, resp)
}

operationRequest.prototype.epoch_time = function(start_time, duration ){
  var epoch_time = new moment(start_time).add({days: Number(duration)}).valueOf();
  return epoch_time;
}

operationRequest.prototype.time = function(start_time, duration ){
  var time = new moment(start_time).add({days: Number(duration)}).format('YYYY-MM-DD HH:mm:ss');
  return time;
}


 
var request = function(params, api_config, callback) {
  var req = new operationRequest(params, api_config, function(err, req){
    if(err)
       return callback(err);
    req.executeOperation(callback);
  });
}

module.exports = request;
   


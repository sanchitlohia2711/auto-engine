"use strict";

var  
   _                = require('lodash'),
   async            = require('async'),
   executor         = require('../../executor/check');

var customRequest = function (params, oprConfigArray, callback) {
  this.params = params;
  this.oprConfigArray = oprConfigArray;
  callback(null, this);
};

customRequest.prototype.perform = function(callback){
   var response = {};
   var params = this.params;
   var operationProvider;
   async.eachSeries(
       this.oprConfigArray,
       function(item, cb){
         executor.check_and_execute(params, item, function(err, resp){
             response = resp;
             if(err) return cb(err, response);
             
             //Set vars for first call
             _.forEach(resp.output_vars, function(value, key){
                _.set(params, key, value);
                _.set(response, key, value);
             });
             cb(null, response);
          });
       
       },
       function(err){
           if(err)
             return callback(err);
           callback(null, response);
       });
};

var request = function(params, api_config, callback) {
  var req = new customRequest(params, api_config, function(err, req){
    if(err)
       return callback(err);
    req.perform(callback);
  });
}

module.exports = request;

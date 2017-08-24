"use strict";

var  _                            = require('lodash');
var  workflowTypeProviderMapping  = require('./config').workflowTypeProvider;

//DESCRIPTION
//This class exists to support workflow within workflow going forward

var workflowTypeProviderMapping =  _.mapValues(workflowTypeProviderMapping, function(path) {
  return require(path);
});

var workflow_request = function(params, config, callback) {
  this.params = params;
  this.config = config;
  callback(null, this);
};

workflow_request.prototype.perform = function(callback){
   var resposne = {}
   var workflowProvider = this.workflowTypeProvider();
   workflowProvider(this.params, this.config, callback);
};

workflow_request.prototype.workflowTypeProvider = function(workflowType){
   if(workflowType === undefined) 
       return workflowTypeProviderMapping['custom'];
   return workflowTypeProviderMapping[workflowType];
};

var execute = function(params, config, callback){
  var req = new workflow_request(params, config, function(err, req){
    if(err)
        return callback(err);
        req.perform(function(err, resp){
          if(err)
            return callback(err, resp);
          callback(null, resp);
        });
    });
}

module.exports = {
  execute : execute
}

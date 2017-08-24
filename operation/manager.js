 'use strict';

//var operatonConfig = require('ffservice-o2o-subscription').operation;
var 
operatonTypeProvider = require('./config').operatonTypeProvider,
    _               = require('lodash');


var operatonTypeProvider =  _.mapValues(operatonTypeProvider, function(path) {
  return require(path);
});





var operation_request = function(params, config, callback) {
  this.params = params;
  this.config = config;
  callback(null, this);
};
  
operation_request.prototype.perform = function(callback){
    var resposne = {}
    var operationProvider = this.getOperationProvider(this.config.name);
    operationProvider(this.params, this.config, callback);
};
  
operation_request.prototype.getOperationProvider = function(operationType){
  if(operatonTypeProvider[operationType])
    return operatonTypeProvider[operationType];
  throw new Error("Invalid opeartion type " + operationType);
}

var add_operation = function(opeartionType, operationProvider){
    operatonTypeProvider[operationType] = operationProvider;
}

var execute = function(params, config, callback){
    var req = new operation_request(params, config, function(err, req){
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
    execute       : execute,
    add_operation : add_operation
};

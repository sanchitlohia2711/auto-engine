"use strict";

var  util           = require('util');
var  _              = require('lodash');


var operationResponse = function (params, operationConfig, upstreamResponse, callback) {
  this.params = params || {}
  this.upstreamResponse = upstreamResponse;
  this.response_checker = operationConfig.response_checker || {};
  this.output_vars = operationConfig.output_vars || {};
  this.responseContentType = upstreamResponse.contentType;
  this.responseBody = upstreamResponse.responseBody || {};
  callback(null, this);
};

operationResponse.prototype.checkResponse = function(callback){
   var self = this;
   var output_vars = {};
   if (!self.upstreamResponse.isSuccess()){
      return callback(new Error("API Operation Error: Upstream Error"), self.upstreamResponse.errorResponse )
   }

   var jsonRespBody = self.getJsonBody();
   
   self.responseCheker(function(err){
     if(err)
        return callback(err, self.upstreamResponse.errorResponse)

     //Set all variables that needs to be set for this api call.
     if(self.output_vars.params){
       var obj = self.output_vars.params.value;
       Object.keys(obj).forEach(function(key) {
          _.set(output_vars, key, _.get(self.params , obj[key]));
       });
     }

     if(self.output_vars.response){
       var obj = self.output_vars.response.value;
       Object.keys(obj).forEach(function(key) {
         _.set(output_vars, key, _.get(jsonRespBody , obj[key]));
       });
     }
     
     return callback(null, {upstream_response: jsonRespBody, output_vars : output_vars});
   });


   

}

operationResponse.prototype.responseCheker = function(cb){
  var self = this;
  var jsonRespBody = self.getJsonBody();
  
  //If failure or success is decided only by http status codes and http error
  if(self.response_checker === undefined) 
      return cb(null);
   
  //Check mandatory response
  if(self.response_checker.success){
    for (var key in self.response_checker.success.mandatory_response) {
     if  (_.get(jsonRespBody, key) !== self.response_checker.success.mandatory_response[key]){
       return cb(new Error("Api Operation Type Error - Response not in expected format. Expected: " + 
       self.response_checker.success.mandatory_response[key] + " Got: " + 
       _.get(jsonRespBody, key) + " for key " + key));
      }
     }

    //Check mandatory presense of keys
    for (var key in self.response_checker.success.mandatory_keys) {
     if  (_.get(jsonRespBody, key) !== undefined){
       return cb(new Error("Api Operation Type Error - Some of response keys missing. Missing key " +
       _.get(jsonRespBody, key)));
     }
    }
   }
   

  //  //Check error in response
  //  for (var key in this.response_checker.failure) {
  //    var failureCriteria = this.response_checker.failure[key];
     
  //    if('present' in failureCriteria && ( key in _get(jsonRespBody, key)))
  //      return callback(new Error("Error in upstream call"));
  //    if ('value' in failureCriteria && stats.value === _get(jsonRespBody, key)){
  //      return callback(new Error("Error in upstream call"));
  //    }
  //  }
   cb(null);
}

//This function converts the the response body to json irrespective of response content-type
operationResponse.prototype.getJsonBody = function(){
    // if (operationResponse.responseContentType == 'application/json') {
    //    return JSON.parse(this.responseBody) 
    // }
    try {
       return JSON.parse(this.responseBody);
    } catch (e) {
       return this.responseBody;
    }    
}

module.exports = operationResponse;
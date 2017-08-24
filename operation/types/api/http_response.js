'use strict';

var pRoute = "subscription:lib:request:http_response";

var http_response = function(err, res, body) {
  if (res) {
    this.statusCode      = res.statusCode;
    this.responseBody    = body;
    this.responseHeaders = res.headers;
    this.contentType     = res.headers['content-type'];
  }
  if (err) {
     this.error     = err.message.toString();
     this.errorCode = err.code;
  }
};

http_response.prototype.isSuccess = function() {
  //If there is any error return false
  if (this.error) {
    return false;
  }
  //If the status code is not 2XX return false
  if (this.statusCode.toString().match(/2[0-9][0-9]/) === null) {
    return false
  }
  return true;
};

http_response.prototype.errorString = function() {
   return this.statusCode + this.error + this.error_code
};

http_response.errorResponse = function(){
  return {
    statusCode : this.httpResponse.statusCode, 
    body : this.httpResponse.responseBody,
    error : this.httpResponse.error,
    error_code : this.httpResponse.error_code
  }
};

module.exports = http_response;

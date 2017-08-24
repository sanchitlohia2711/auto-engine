 'use strict';

 var _ = require('lodash');

var executeJsObjReplace = function(params, jsObj, subsitution_keys){
   if (subsitution_keys === undefined || !(subsitution_keys instanceof Array)) return jsObj;
   var stringified = JSON.stringify(jsObj);
   stringified = this.executeStringReplace(params, stringified, subsitution_keys);
   return JSON.parse(stringified);
};

var executeStringReplace = function(params, stringToReplace, subsitution_keys){
   if (subsitution_keys === undefined || !(subsitution_keys instanceof Array)) return stringToReplace;
   subsitution_keys.forEach(function(key) {
     var re = new RegExp("<<" + key + ">>", "g");
     stringToReplace = stringToReplace.replace(re, params[key])
    });
   return stringToReplace
};

var validate_params = function(params, required_keys) {
    var required_keys_length = required_keys.length;
    var missing_keys = [];
    for (var i = 0; i < required_keys_length; i++) { 
      if (_.get(params, required_keys[i]) === undefined) {
            return missing_keys.push(required_keys[i]);
      }
    }
    return missing_keys;
}

module.exports = {
    executeJsObjReplace   :  executeJsObjReplace,
    executeStringReplace  :  executeStringReplace,
    validate_params       :  validate_params
};

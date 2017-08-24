
var 
  operation_manager = require('../operation'),
  workflow_manager  = require('../workflow');


var check_and_execute = function(params, config, callback){
   if (config.type == 'operation')
     return operation_manager.execute(params, config, callback);

   if (config.type == 'workflow'){
     return workflow_manager.execute(params, config, callback);
   }

   callback(new Error("Invalid item config type"));
}

module.exports = {
    check_and_execute : check_and_execute
}

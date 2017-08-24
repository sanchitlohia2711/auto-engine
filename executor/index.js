
var 
  operation_manager = require('../operation'),
  workflow_manager  = require('../workflow');


var check_and_execute = function(params, item_config, callback){
 if (item_config.type == 'operation')
   return operation_manager.execute(params, item_config.config, callback);

 if (item_config.type == 'workflow'){
   return workflow_manager.execute(params, item_config.config, callback);
 }

 callback(new Error("Invalid item config type"));
}

module.exports = {
  check_and_execute : check_and_execute
}

var 
  operation_manager = require('./operation'),
  workflow_manager  = require('./workflow');

var auto = {}

auto.add_operation = function(operation_name, operation_provider){
  if (typeof(operation_name) !== 'string')
    throw new Error("Operation name should be a string");
  if (typeof(operation_provider) !== 'function')
      throw new Error("Operation provider should be a function");

  return operation_manager.add_operation(operation_name, operation_provider);
}

auto.execute_workflow = function(params, config, callback){
  return workflow_manager.execute(params, config, callback);
}

// params = {
//    num : 200
// }

// auto = require('./auto')
// workflow1_config = require('./test/samples/workflow1')

// auto.execute_workflow(params, workflow1_config, function(err, res){
//   console.log(res);
// })

module.exports = auto;
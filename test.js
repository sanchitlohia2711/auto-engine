params = {
    num : 200
 }
 
 auto = require('./auto')
 workflow1_config = require('./test/samples/workflow1')
 
 auto.execute_workflow(params, workflow1_config, function(err, res){ 
     console.log(params);
     console.log(res);
     process.exit(0)
    })
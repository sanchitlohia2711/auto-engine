"use strict";
  
  var workflowTypesEvaluator = {
    custom : 'custom',
  } 
  var workflowTypeProvider = {};
  workflowTypeProvider[workflowTypesEvaluator['custom']] = './types/custom';

  module.exports = { 
    workflowTypeProvider : workflowTypeProvider
  }

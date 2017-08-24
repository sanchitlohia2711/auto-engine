"use strict";
  
  var operationTypes = {
    api : 'api',
    fusio : 'fusio',
    date_time : "date_time",
    converter : "converter"
  } 
  var operatonTypeProvider = {};
  operatonTypeProvider[operationTypes['api']]   = './types/api/request';
  operatonTypeProvider[operationTypes['date_time']] = './types/date_time',
  operatonTypeProvider[operationTypes['converter']] = './types/converter'

  module.exports = { 
    operatonTypeProvider : operatonTypeProvider
  }

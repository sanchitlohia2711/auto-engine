"use strict";

module.exports =  [ 
     {
        type : "operation",
        name : "api",
        method : {
            value: 'GET'
        },
        url : {
           value : "https://www.google.com"
        }
     },
     {
         type : "operation",
         name : "converter",
         set_vars : {
           subsitution_keys : ["num"],
           value : {
             result : "<<num>>"
           }
         }
     }
 ]

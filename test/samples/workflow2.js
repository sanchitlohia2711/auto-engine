"use strict";

module.exports =  [ 
     {
        type : "opeartion",
        name : "api",
        method : {
            value: 'POST'
        },
        hostname : {
           url : "https://paystag.hungama.com"
        },
        query_params : {
            subsitution_keys : ["auth", "recipient_email", "recipient_mobile"],
            value : {
                auth             : '<<auth>>',
                m                : 'subscription_status_username',
                email            : '<<recipient_email>>',
                mobileno         : '<<recipient_mobile>>',
                product          : 'hungamamusic',
                platform         : 'android',
                payment_mode     : 'paytm'    
              }
        },
        output_vars : {
            params : {
              value : {
                  ref_customer_id : 'recipient_mobile'
                }
            }
        }
     },
     {
         type : "opeartion",
         name : "converter",
         set_vars : {
           value : {
             number : 'status_code'
           }
         }
     }
 ]

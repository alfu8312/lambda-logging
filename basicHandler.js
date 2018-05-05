'use strict';

const getErrorResult = (err) => {
    return {
        statusCode: 500,
        body: JSON.stringify(err.message)
    }    
};

function createApiHandler (f) {  
  return (function (event, context, cb) {
    if (!context["parentRequestId"]) {
      context["parentRequestId"] = context.awsRequestId;
    }
    console.log('[event] :', JSON.stringify(event));
    console.log('[context] :', JSON.stringify(context));

    try {  
      f(event, context, function (err, response) {
        if(err) {
          cb(null, getErrorResult(err));
        }else {
          console.log('[RESPONSE] :', response)
          cb(err, response)
        }
      });
    } catch (err) {
      let response = getErrorResult(err)
      console.log('[RESPONSE] :', response)
      cb(null, response);
    }
  });
}

module.exports = createApiHandler;
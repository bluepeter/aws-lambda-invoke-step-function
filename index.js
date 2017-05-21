const aws = require('aws-sdk');
const async = require('async');
const bunyan = require('bunyan');

class LambdaFunction {

  constructor(event, context, lambdaCallback) {

    this.log = bunyan.createLogger({
      name: "LetsLog",
      level: "info"
    });

    async.waterfall([
        (...args) => {
          this.invokeStepFunction(context, ...args);
        }
      ],
      (...args) => {
        this.finishLambda(lambdaCallback, ...args);
      }
    );
  }

  invokeStepFunction(context, callback) {
    const stepFunction = new aws.StepFunctions();
    const accountId = context.invokedFunctionArn.split(':')[4];
    const params = {
      stateMachineArn: `arn:aws:states:us-east-1:${accountId}:stateMachine:HelloWorld`,
      input: JSON.stringify({})
    };
    stepFunction.startExecution(params, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  finishLambda(lambdaCallback, err) {
    if (err === null || err === undefined) {
      lambdaCallback(null, "We succeeded.");
    } else {
      lambdaCallback(err);
    }
  }
}

exports.handler = (...args) => {
  return new LambdaFunction(...args);
};

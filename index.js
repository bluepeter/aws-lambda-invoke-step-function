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
          this.invokeStepFunction(...args);
        }
      ],
      (...args) => {
        this.finishLambda(lambdaCallback, ...args);
      }
    );
  }

  invokeStepFunction(callback) {
    const stepFunction = new aws.StepFunctions();
    const params = {
      stateMachineArn: `arn:aws:states:us-east-1:975366878261:stateMachine:HelloWorld`,
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

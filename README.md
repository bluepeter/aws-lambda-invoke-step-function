# Node.js Lambda Function To Invoke AWS Step Function

This is a simple Node.js AWS Lambda seed that invokes an AWS Step Function. It
uses [node-lambda](https://github.com/motdotla/node-lambda) for locally running
and deploying.

AWS Step Functions are a great way to maintain state and orchestrate AWS Lambda
functions. However, currently, invoking a Step Function is limited to, e.g.,
API Gateway, Cloudwatch, etc. The purpose of this repo is to serve as a means
to invoke a Step Function from a Lambda function. This way, if you want to, for
example, invoke a Step Function from SES, this function can serve as the
conduit.

### To use:

1. `npm i -g aws-sdk` to install AWS SDK if you haven't already.
2. `npm i` in repo directory to build node modules.
3. Configure aws-sdk in your home directory. Ensure the Lambda-controlling
   `aws_access_key_id` and `aws_secret_access_key` are in, e.g., `~/.aws`. This
   way you don't have to keep this in `.env` which I prefer to keep in version
   control.
4. Create an AWS Lambda function on AWS. Edit `.env` and `package.json` with
   your Lambda function name.
5. Create an AWS IAM Role with a Lambda trusted relationship. Give it
   permissions for Step Functions. Edit `.env` to add the role.
6. Create a Hello World Step Function. Edit `index.js` with the ARN of this
   Step Function.
7. `npm run start` to run it locally! It works, right? Great!
8. `npm run deploy` to push into the cloud...
9. Test that everything works by executing the Lambda function from AWS
   Console.

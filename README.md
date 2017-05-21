# Node.js Lambda Function Invokes AWS Step Function

This is a simple Node.js AWS Lambda seed that invokes an AWS Step Function. It
uses [node-lambda](https://github.com/motdotla/node-lambda) for locally running
and deploying.

AWS Step Functions are a great way to maintain state and orchestrate AWS Lambda
functions. However, currently, invoking a Step Function is limited to, e.g.,
API Gateway, Cloudwatch, etc. The purpose of this repo is to serve as a means
to invoke a Step Function from a Lambda function. This way, if you want to, for
example, invoke a Step Function from SES, this function can serve as the
conduit.

### Basic

1. `npm i -g aws-sdk` to install AWS SDK if you haven't already.
2. `npm i` in repo directory to build node modules.
3. `npm run start` to try it out (locally)! Everything works, right? Good!
   Let's get it into the cloud...
4. Configure aws-sdk in your home directory. Ensure the Lambda-controlling
   `aws_access_key_id` and `aws_secret_access_key` are in, e.g., `~/.aws`. This
   way you don't have to keep this in `.env` which I prefer to keep in version
   control.
5. Create a Lambda function on AWS. Edit `.env` to your Lambda function; and
   function name in `package.json`.
6. `npm run deploy` to push into the cloud...
7. Go to AWS Lambda console and test if it works. It does, right? Great! Start
   editing `index.js` to whatever you want. You can mock data in `event.json`.
   Look at `deploy.env.example` if you want to send along secret variables
   (change name to `deploy.env`) that don't go to git.

### Advanced

8. Go to the AWS Lambda console and create two aliases, `PROD` and `STAG`.
9. Point `STAG` to `$latest` version. This way, whenever you deploy, `STAG`
   will always use the newest deployment.
10. Ready to update `PROD`? Use `npm run updateProd` and it will create a new
    version from  `$latest` and point `PROD` to that version.
11. How to use this setup? When you invoke a Lambda function from, e.g., API
    Gateway, you can choose, e.g., `MyFunctionName:PROD`, and use `STAG` for,
    well, staging or development.

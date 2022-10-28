# PDF Generated Service

> Generate PDF from API Request Data

## Develop Guide

### Pre Requirement

- node.js : `nodejs16.x` (You can use the library like [nvm](https://github.com/nvm-sh/nvm) to change your node version )

- AWS SAM CLI : [Reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Development

1. Go to `/pdf-generate`, and run `npm install`

   ```shell
   cd ./pdf-generate
   npm install
   ```

2. After you finish your adjustment, go back to the root path and build your code

   ```shell
   cd ../
   sam build
   ```

3. Testing your code in Local

   ```shell
   sam local start-api
   ```

## Reference

- React-pdf : [Link](https://react-pdf.org/)
- AWS SAM (Serverless Application Model) : [Link](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- AWS Lambda : [Link](https://docs.aws.amazon.com/lambda/latest/dg/lambda-typescript.html)

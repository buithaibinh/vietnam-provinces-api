import {
  Stack,
  StackProps,
  Duration,
  CfnOutput,
  RemovalPolicy,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as logs from 'aws-cdk-lib/aws-logs';
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

import { Utils } from './utils';
export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const nodeRuntime: lambda.Runtime = lambda.Runtime.NODEJS_14_X;
    const lambdaMemory = parseInt(Utils.getEnv('LAMBDA_MEMORY', '256'));

    // TODO deploy front-end and set corsOrigin
    const corsOrigin = Utils.getEnv('CORS_ORIGIN', '*');

    // ========================================================================
    // Resource: AWS Lambda Function - CRUD API Backend
    // ========================================================================

    // Purpose: serverless backend for the demo app, uses express.js
    const apiFunction = new lambda.Function(this, 'ApiFunction', {
      runtime: nodeRuntime,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../functions/api'),
      timeout: Duration.seconds(30),
      memorySize: lambdaMemory,
      logRetention: logs.RetentionDays.ONE_WEEK,
      environment: {
      },
    });
    // ========================================================================
    // Resource: Amazon API Gateway - API endpoints
    // ========================================================================

    // Purpose: create API endpoints and integrate with Amazon Cognito for JWT validation
    // ------------------------------------------------------------------------
    // The API
    // ------------------------------------------------------------------------
    // 👇 create our HTTP Api
    const httpApi = new HttpApi(this, 'vietnam-provinces-api', {
      description: 'Query data includes cities, provinces, wards',
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });

    httpApi.addRoutes({
      path: '/{proxy}',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('api-integration', apiFunction),
    });

    new CfnOutput(this, 'LambdaAPIFunction', {
      value: apiFunction.functionName,
    });

    new CfnOutput(this, 'APIURL', {
      value: httpApi.url || '',
    });
  }
}

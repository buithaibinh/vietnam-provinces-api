#!/usr/bin/env bash

export AWS_SDK_LOAD_CONFIG=1 # allows the SDK to load from config. see https://github.com/aws/aws-sdk-js/pull/1391

## ====================================================================================================================
## 1. the CloudFormation stack name, e.g. "MyAppName"
## ====================================================================================================================

export STACK_NAME=CronSolution-dev

## ====================================================================================================================
## 2. explicitly define the account you intend to deploy into
##    for the simplicity of running the demo, it takes the current profile's account and region
##    in production make sure you explicitly define these via the CI/CD environment variables as a safety mechanism
## ====================================================================================================================

export STACK_ACCOUNT=$(aws sts get-caller-identity --query "Account" --output text)
export STACK_REGION=$(aws configure get region)

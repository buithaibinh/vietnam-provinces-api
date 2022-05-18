#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import { Utils } from '../lib/utils';

const app = new cdk.App();
const stackName = Utils.getEnv('STACK_NAME');

cdk.Tags.of(app).add('App', stackName);
new CdkStack(app, stackName);

import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_PAN_URL = '10.10.20.77';
const DEFAULT_USERNAME = 'username';
const DEFAULT_PASSWORD = 'password';
const DEFAULT_PORT = '9060';

export const integrationConfig: IntegrationConfig = {
  panUrl: process.env.PAN_URL || DEFAULT_PAN_URL,
  username: process.env.USERNAME || DEFAULT_USERNAME,
  password: process.env.PASSWORD || DEFAULT_PASSWORD,
  port: process.env.PORT || DEFAULT_PORT,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}

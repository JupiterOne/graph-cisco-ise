import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';
import { isUrl } from './utils';

/**
 * A type describing the configuration fields required to execute the
 * integration for a specific account in the data provider.
 *
 * When executing the integration in a development environment, these values may
 * be provided in a `.env` file with environment variables. For example:
 *
 * - `CLIENT_ID=123` becomes `instance.config.clientId = '123'`
 * - `CLIENT_SECRET=abc` becomes `instance.config.clientSecret = 'abc'`
 *
 * Environment variables are NOT used when the integration is executing in a
 * managed environment. For example, in JupiterOne, users configure
 * `instance.config` in a UI.
 */
export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  panUrl: {
    type: 'string',
  },
  port: {
    type: 'string',
  },
  username: {
    type: 'string',
  },
  password: {
    type: 'string',
    mask: true,
  },
  verifyTls: {
    type: 'boolean',
    optional: true,
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  panUrl: string;
  port: string;
  username: string;
  password: string;
  verifyTls?: boolean;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;
  const { logger } = context;

  if (!config.panUrl || !config.password || !config.username || !config.port) {
    throw new IntegrationValidationError(
      'Config requires all of {panUrl, username, password, port}',
    );
  }

  if (isUrl(config.panUrl)) {
    throw new IntegrationValidationError(
      'panUrl should not include http protocol, it should be the clean URL only.',
    );
  }

  const apiClient = createAPIClient(config, logger);
  await apiClient.verifyAuthentication();
}

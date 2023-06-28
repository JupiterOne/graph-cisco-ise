import fetch, { RequestInit } from 'node-fetch';
import { IntegrationConfig } from './config';
import { retry } from '@lifeomic/attempt';
import https from 'https';
import {
  IntegrationError,
  IntegrationLogger,
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { buildQueryParams } from './utils';
import { CiscoIseApiCallback, CommonResponse } from './types';

export const DEFAULT_ATTEMPT_OPTIONS = {
  maxAttempts: 5,
  delay: 30_000,
  timeout: 180_000,
  factor: 2,
};

export enum ERSApiPath {
  ERS_CONFIG_PATH = '/ers/config',
}

export class APIClient {
  private integrationConfig: IntegrationConfig;
  private baseUrl: string;
  private logger: IntegrationLogger;

  constructor(integrationConfig: IntegrationConfig, logger: IntegrationLogger) {
    this.integrationConfig = integrationConfig;
    this.baseUrl = `https://${integrationConfig.panUrl}:${this.integrationConfig.port}`;
    this.logger = logger;
  }

  /**
   * Private methods
   */

  private async executeAPIRequestWithRetries<T>(
    requestUrl: string,
    init?: RequestInit,
  ): Promise<T> {
    const requestAttempt = async () => {
      const response = await fetch(requestUrl, {
        ...init,
        headers: {
          ...init?.headers,
          ...this.getDefaultHeaders(),
        },
        agent: this.getHttpsAgent(),
      });

      return response.json();
    };

    return retry(requestAttempt, {
      ...DEFAULT_ATTEMPT_OPTIONS,
      handleError: (err, atteptContext) => {
        // TODO: handle rate limiting

        this.logger.warn(
          { requestUrl, err, atteptContext },
          `Retrying API call error`,
        );
      },
    });
  }

  private getDefaultHeaders() {
    return {
      authorization: `Basic ${Buffer.from(
        `${this.integrationConfig.username}:${this.integrationConfig.password}`,
      ).toString('base64')}`,
      accept: 'application/json',
    };
  }

  private buildBaseUrl(apiPath: ERSApiPath) {
    return `${this.baseUrl}${apiPath}`;
  }

  private getHttpsAgent() {
    return new https.Agent({
      rejectUnauthorized: this.integrationConfig.verifyTsl ?? false,
    });
  }

  /**
   * Public methods
   */

  // TODO: add concurrency options
  public async iterateApi<T>(
    cb: CiscoIseApiCallback<T>,
    size: string,
    urlPath: string,
  ) {
    let hasNext = true;
    let page = 1;

    do {
      const response = await this.executeAPIRequestWithRetries<
        CommonResponse<T>
      >(
        `${this.baseUrl}${urlPath}${buildQueryParams({
          size,
          page: String(page),
        })}`,
      );

      hasNext = response.SearchResult.nextPage !== undefined;
      page += 1;

      await cb(response.SearchResult.resources);
    } while (hasNext);
  }

  public async verifyAuthentication(): Promise<void> {
    const verifyEndpointUrl = `${this.buildBaseUrl(
      ERSApiPath.ERS_CONFIG_PATH,
    )}/node`;

    try {
      await fetch(verifyEndpointUrl, {
        headers: this.getDefaultHeaders(),
        agent: this.getHttpsAgent(),
      });
    } catch (err) {
      if (err.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
        throw new IntegrationProviderAuthenticationError({
          status: 401,
          statusText: `Server's TLS certificate is not trusted and integrations config Verify TSL is enabled.`,
          endpoint: verifyEndpointUrl,
        });
      }

      if (err.code === 'ETIMEDOUT') {
        throw new IntegrationProviderAPIError({
          status: 400,
          statusText: `Unable to reach host due to timeout. This is likely a port configuration issue.`,
          endpoint: verifyEndpointUrl,
        });
      }

      if (err.code === 'ENOTFOUND') {
        throw new IntegrationProviderAPIError({
          status: 404,
          statusText: `Unable to reach host. Please verify that the pan url provided in the integration configurations is correct.`,
          endpoint: verifyEndpointUrl,
        });
      }

      throw new IntegrationError({
        message: err,
        code: err.code,
      });
    }
  }
}

export function createAPIClient(
  integrationConfig: IntegrationConfig,
  logger: IntegrationLogger,
): APIClient {
  return new APIClient(integrationConfig, logger);
}

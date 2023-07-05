import {
  createMockExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { setupProjectRecording } from '../test/recording';
import { IntegrationConfig, validateInvocation } from './config';
import { integrationConfig } from '../test/config';

describe('#validateInvocation', () => {
  let recording: Recording;

  afterEach(async () => {
    if (recording) {
      await recording.stop();
    }
  });

  test('requires valid config', async () => {
    const executionContext = createMockExecutionContext<IntegrationConfig>({
      instanceConfig: {} as IntegrationConfig,
    });

    await expect(validateInvocation(executionContext)).rejects.toThrow(
      'Config requires all of {panUrl, username, password, port}',
    );
  });

  test('requires valid config - panUrl includes protocol', async () => {
    const executionContext = createMockExecutionContext<IntegrationConfig>({
      instanceConfig: {
        panUrl: 'https://10.10.20.77',
        username: 'username',
        password: 'password',
        port: '9060',
      } as IntegrationConfig,
    });

    await expect(validateInvocation(executionContext)).rejects.toThrow(
      'panUrl should not include http protocol, it should be the clean URL only.',
    );
  });

  test('successfully validates invocation', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'validate-invocation',
    });

    const executionContext = createMockExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await expect(validateInvocation(executionContext)).resolves.toBeUndefined();
  });

  test(`if verifyTls is enabled and server's TSL is not trusted, should throw a specific error message`, async () => {
    const executionContext = createMockExecutionContext<IntegrationConfig>({
      instanceConfig: {
        ...integrationConfig,
        verifyTls: true,
      },
    });

    await expect(validateInvocation(executionContext)).rejects.toThrow(
      `Provider authentication failed at https://10.10.20.77:9060/ers/config/node: 401 Server's TLS certificate is not trusted and integrations config Verify TSL is enabled.`,
    );
  });
});

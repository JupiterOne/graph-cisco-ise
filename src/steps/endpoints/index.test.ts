import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { EndpointSteps } from './constants';

let recording: Recording;

afterEach(async () => {
  await recording.stop();
});

test(EndpointSteps.ENDPOINT_GROUP, async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: EndpointSteps.ENDPOINT_GROUP,
  });

  const stepConfig = buildStepTestConfigForStep(EndpointSteps.ENDPOINT_GROUP);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test(
  EndpointSteps.ENDPOINTS,
  async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: EndpointSteps.ENDPOINTS,
    });

    const stepConfig = buildStepTestConfigForStep(EndpointSteps.ENDPOINTS);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  },
  100_000,
);

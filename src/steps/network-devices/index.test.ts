import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { NetworkDeviceSteps } from './constants';

let recording: Recording;

afterEach(async () => {
  await recording.stop();
});

test(NetworkDeviceSteps.NETWORK_DEVICE_GROUP, async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: NetworkDeviceSteps.NETWORK_DEVICE_GROUP,
  });

  const stepConfig = buildStepTestConfigForStep(
    NetworkDeviceSteps.NETWORK_DEVICE_GROUP,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test(NetworkDeviceSteps.NETWORK_DEVICE, async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: NetworkDeviceSteps.NETWORK_DEVICE,
  });

  const stepConfig = buildStepTestConfigForStep(
    NetworkDeviceSteps.NETWORK_DEVICE,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

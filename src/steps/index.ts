import { accountSteps } from './account';
import { endpointSteps } from './endpoints';
import { networkDeviceSteps } from './network-devices';

const integrationSteps = [
  ...accountSteps,
  ...endpointSteps,
  ...networkDeviceSteps,
];

export { integrationSteps };

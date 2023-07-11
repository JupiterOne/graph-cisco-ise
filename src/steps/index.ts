import { accountSteps } from './account';
import { endpointsSteps } from './endpoints';

const integrationSteps = [...accountSteps, ...endpointsSteps];

export { integrationSteps };

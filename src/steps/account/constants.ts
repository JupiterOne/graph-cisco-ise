import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export const AccountSteps = {
  ACCOUNT: 'fetch-account',
};

export const AccountEntities: Record<'ACCOUNT', StepEntityMetadata> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'acme_account',
    _class: ['Account'],
    schema: {
      properties: {
        mfaEnabled: { type: 'boolean' },
        manager: { type: 'string' },
      },
      // required: ['mfaEnabled', 'manager'],
    },
  },
};

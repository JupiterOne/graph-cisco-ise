import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  GROUPS: 'fetch-groups',
  GROUP_USER_RELATIONSHIPS: 'build-user-group-relationships',
};

export const Entities: Record<'ACCOUNT', StepEntityMetadata> = {
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

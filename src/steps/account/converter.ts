import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { AccountEntities } from './constants';

export function createAccountEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {},
      assign: {
        _key: 'cisco-ise-unique-account-id',
        _type: AccountEntities.ACCOUNT._type,
        _class: AccountEntities.ACCOUNT._class,
        name: 'cisco-ise-account',
      },
    },
  });
}

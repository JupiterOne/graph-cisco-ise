import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const NetworkDeviceSteps = {
  NETWORK_DEVICE_GROUP: 'fetch-network-device-groups',
  NETWORK_DEVICE: 'fetch-network-devices',
};

export const NetworkDeviceEntities: Record<
  'NETWORK_DEVICE_GROUP' | 'NETWORK_DEVICE',
  StepEntityMetadata
> = {
  NETWORK_DEVICE: {
    resourceName: 'Network Device',
    _type: 'cisco_ise_network_device',
    _class: ['NetworkEndpoint'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
      },
    },
  },
  NETWORK_DEVICE_GROUP: {
    resourceName: 'Network Device Group',
    _type: 'cisco_ise_network_device_group',
    _class: ['Group'],
    schema: {
      additionalProperties: true,
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        'trustsecsettings.pushIdSupport': { type: 'boolean' },
        networkDeviceIPList: { type: 'array' },
        networkDeviceGroupList: { type: 'array' },
      },
    },
  },
};

export const NetworkDeviceRelationships: Record<
  'NETWORK_DEVICE_GROUP_HAS_NETWORK_DEVICE',
  StepRelationshipMetadata
> = {
  NETWORK_DEVICE_GROUP_HAS_NETWORK_DEVICE: {
    _type: 'cisco_ise_network_device_group_has_device',
    _class: RelationshipClass.HAS,
    sourceType: NetworkDeviceEntities.NETWORK_DEVICE_GROUP._type,
    targetType: NetworkDeviceEntities.NETWORK_DEVICE._type,
  },
};

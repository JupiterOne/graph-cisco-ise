import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const EndpointSteps = {
  ENDPOINT_GROUP: 'fetch-endpoint-groups',
  ENDPOINTS: 'fetch-endpoints',
};

export const EndpointsEntities: Record<
  'ENDPOINT_GROUP' | 'ENDPOINT',
  StepEntityMetadata
> = {
  ENDPOINT_GROUP: {
    resourceName: 'Endpoint Group',
    _type: 'cisco_ise_endpoint_group',
    _class: ['Group'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        'link.rel': { type: 'string' },
        'link.href': { type: 'string' },
        'link.type': { type: 'string' },
      },
    },
  },
  ENDPOINT: {
    resourceName: 'Endpoint',
    _type: 'cisco_ise_endpoint',
    _class: ['Device'],
    schema: {
      additionalProperties: true,
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        mac: { type: 'string' },
        profileId: { type: 'string' },
        staticProfileAssignment: { type: 'boolean' },
        staticProfileAssignmentDefined: { type: 'boolean' },
        portalUser: { type: 'string' },
        identityStore: { type: 'string' },
        identityStoreId: { type: 'string' },
        'link.rel': { type: 'string' },
        'link.href': { type: 'string' },
        'link.type': { type: 'string' },
      },
    },
  },
};

export const EndpointRelationships: Record<
  'ENDPOINT_GROUP_HAS_ENDPOINT',
  StepRelationshipMetadata
> = {
  ENDPOINT_GROUP_HAS_ENDPOINT: {
    _type: 'cisco_ise_endpoint_group_has_endpoint',
    _class: RelationshipClass.HAS,
    sourceType: EndpointsEntities.ENDPOINT_GROUP._type,
    targetType: EndpointsEntities.ENDPOINT._type,
  },
};

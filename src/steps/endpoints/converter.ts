import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { EndpointDetails, EndpointGroup } from '../../types';
import { EndpointsEntities } from './constants';
import _ from 'lodash';

export function createEndpointGroupEntity(
  endpointGroup: EndpointGroup,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: endpointGroup,
      assign: {
        _key: endpointGroup.id,
        _type: EndpointsEntities.ENDPOINT_GROUP._type,
        _class: EndpointsEntities.ENDPOINT_GROUP._class,
        id: endpointGroup.id,
        name: endpointGroup.name,
        description: endpointGroup.description,
        'link.rel': endpointGroup.link?.rel,
        'link.href': endpointGroup.link?.href,
        'link.type': endpointGroup.link?.type,
      },
    },
  });
}

export function createEndpointEntity(endpoint: EndpointDetails): Entity {
  const converterCustomAttributes = _.mapKeys(
    endpoint.customAttributes?.customAttributes || {},
    (v, k) => _.camelCase(k),
  );
  return createIntegrationEntity({
    entityData: {
      source: endpoint,
      assign: {
        _key: endpoint.id,
        _type: EndpointsEntities.ENDPOINT._type,
        _class: EndpointsEntities.ENDPOINT._class,
        id: endpoint.id,
        name: endpoint.name,
        description: endpoint.description,
        category: endpoint.description,
        macAddress: endpoint.mac,
        profileId: endpoint.profileId,
        staticProfileAssignment: endpoint.staticProfileAssignment,
        staticGroupAssignmentDefined: endpoint.staticGroupAssignmentDefined,
        portalUser: endpoint.portalUser,
        identityStore: endpoint.identityStore,
        identityStoreId: endpoint.identityStoreId,
        'link.rel': endpoint.link?.rel,
        'link.href': endpoint.link?.href,
        'link.type': endpoint.link?.type,
        make: '',
        model: '',
        serial: '',
        deviceId: '',
        ...converterCustomAttributes,
      },
    },
  });
}

import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createEndpointEntity, createEndpointGroupEntity } from './converter';
import {
  EndpointRelationships,
  EndpointSteps,
  EndpointsEntities,
} from './constants';
import { EndpointClient } from './client';

export async function fetchEndpointGroups({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new EndpointClient(instance.config, logger);

  await client.iterateEndpointGroups(async (endpointGroup) => {
    await jobState.addEntity(createEndpointGroupEntity(endpointGroup));
  });
}

export async function fetchEndpoints({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new EndpointClient(instance.config, logger);

  await client.iterateEndpoints(async (endpoint) => {
    const endpointDetails = await client.fetchEndpointDetails(endpoint.id);
    const endpointEntity = createEndpointEntity(endpointDetails);

    await jobState.addEntity(endpointEntity);

    if (endpointDetails.groupId) {
      const endpointGroupEntity = await jobState.findEntity(
        endpointDetails.groupId,
      );

      if (!endpointGroupEntity) return;

      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: endpointGroupEntity,
          to: endpointEntity,
        }),
      );
    }
  });
}

export const endpointsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: EndpointSteps.ENDPOINT_GROUP,
    name: 'Fetch Endpoint Groups',
    entities: [EndpointsEntities.ENDPOINT_GROUP],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchEndpointGroups,
  },
  {
    id: EndpointSteps.ENDPOINTS,
    name: 'Fetch Endpoints',
    entities: [EndpointsEntities.ENDPOINT],
    relationships: [EndpointRelationships.ENDPOINT_GROUP_HAS_ENDPOINT],
    dependsOn: [EndpointSteps.ENDPOINT_GROUP],
    executionHandler: fetchEndpoints,
  },
];

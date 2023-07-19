import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import {
  createNetworkDeviceEntity,
  createNetworkDeviceGroupEntity,
} from './converter';
import { NetworkDeviceClient } from './client';
import {
  NetworkDeviceEntities,
  NetworkDeviceRelationships,
  NetworkDeviceSteps,
} from './constants';

export async function fetchNetworkDeviceGroups({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new NetworkDeviceClient(instance.config, logger);

  await client.iterateNetworkDeviceGroups(async (endpointGroup) => {
    await jobState.addEntity(createNetworkDeviceGroupEntity(endpointGroup));
  });
}

export async function fetchNetworkDevices({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new NetworkDeviceClient(instance.config, logger);

  await client.iterateNetworkDevices(async (networkDevice) => {
    const networkDeviceDetails = await client.fetchNetworkDeviceDetails(
      networkDevice.id,
    );
    const networkDeviceEntity = createNetworkDeviceEntity(networkDeviceDetails);

    await jobState.addEntity(networkDeviceEntity);

    if (networkDeviceDetails.NetworkDeviceGroupList) {
      for (const networkDeviceGroup of networkDeviceDetails.NetworkDeviceGroupList) {
        const networkDeviceGroupEntity = await jobState.findEntity(
          networkDeviceGroup,
        );

        if (networkDeviceGroupEntity) {
          const networkDeviceGroupDeviceRelationship = createDirectRelationship(
            {
              _class: RelationshipClass.HAS,
              from: networkDeviceGroupEntity,
              to: networkDeviceEntity,
            },
          );

          if (jobState.hasKey(networkDeviceGroupDeviceRelationship._key)) {
            return;
          }

          await jobState.addRelationship(networkDeviceGroupDeviceRelationship);
        }
      }
    }
  });
}

export const networkDeviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: NetworkDeviceSteps.NETWORK_DEVICE_GROUP,
    name: 'Fetch Network Device Groups',
    entities: [NetworkDeviceEntities.NETWORK_DEVICE_GROUP],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchNetworkDeviceGroups,
  },
  {
    id: NetworkDeviceSteps.NETWORK_DEVICE,
    name: 'Fetch Network Devices',
    entities: [NetworkDeviceEntities.NETWORK_DEVICE],
    relationships: [
      NetworkDeviceRelationships.NETWORK_DEVICE_GROUP_HAS_NETWORK_DEVICE,
    ],
    dependsOn: [NetworkDeviceSteps.NETWORK_DEVICE_GROUP],
    executionHandler: fetchNetworkDevices,
  },
];

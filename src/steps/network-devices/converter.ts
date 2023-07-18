import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { NetworkDeviceDetails, NetworkDeviceGroup } from '../../types';
import { NetworkDeviceEntities } from './constants';

export function createNetworkDeviceGroupEntity(
  networkDeviceGroup: NetworkDeviceGroup,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: networkDeviceGroup,
      assign: {
        _key: networkDeviceGroup.name,
        _type: NetworkDeviceEntities.NETWORK_DEVICE_GROUP._type,
        _class: NetworkDeviceEntities.NETWORK_DEVICE_GROUP._class,
        id: networkDeviceGroup.id,
        name: networkDeviceGroup.name,
        description: networkDeviceGroup.description,
        'link.rel': networkDeviceGroup.link?.rel,
        'link.href': networkDeviceGroup.link?.href,
        'link.type': networkDeviceGroup.link?.type,
      },
    },
  });
}

export function createNetworkDeviceEntity(
  networkDevice: NetworkDeviceDetails,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: networkDevice,
      assign: {
        _key: networkDevice.id,
        _type: NetworkDeviceEntities.NETWORK_DEVICE._type,
        _class: NetworkDeviceEntities.NETWORK_DEVICE._class,
        networkDeviceIPList: networkDevice?.NetworkDeviceIPList?.map(
          (networkDeviceIP) => networkDeviceIP.ipaddress,
        ),
        networkDeviceGroupList: networkDevice.NetworkDeviceGroupList.map(
          (networkDeviceGroup) => networkDeviceGroup,
        ),
        'authenticationSettings.networkProtocol':
          networkDevice.authenticationSettings?.networkProtocol,
        'authenticationSettings.radiusSharedSecret':
          networkDevice.authenticationSettings?.radiusSharedSecret,
        'authenticationSettings.enableKeyWrap':
          networkDevice.authenticationSettings?.enableKeyWrap,
        'authenticationSettings.dtlsRequired':
          networkDevice.authenticationSettings?.dtlsRequired,
        'authenticationSettings.enableMultiSecret':
          networkDevice.authenticationSettings?.enableMultiSecret,
        'authenticationSettings.keyEncryptionKey':
          networkDevice.authenticationSettings?.keyEncryptionKey,
        'authenticationSettings.messageAuthenticatorCodeKey':
          networkDevice.authenticationSettings?.messageAuthenticatorCodeKey,
        'authenticationSettings.keyInputFormat':
          networkDevice.authenticationSettings?.keyInputFormat,
        'snmpsettings.version': networkDevice.snmpsettings?.version,
        'snmpsettings.roCommunity': networkDevice.snmpsettings?.roCommunity,
        'snmpsettings.pollingInterval':
          networkDevice.snmpsettings?.pollingInterval,
        'snmpsettings.linkTrapQuery': networkDevice.snmpsettings?.linkTrapQuery,
        'snmpsettings.macTrapQuery': networkDevice.snmpsettings?.macTrapQuery,
        'snmpsettings.originatingPolicyServicesNode':
          networkDevice.snmpsettings?.originatingPolicyServicesNode,
        'trustsecsettings.deviceAuthenticationSettings.sgaDeviceId':
          networkDevice?.trustsecsettings?.deviceAuthenticationSettings
            ?.sgaDeviceId,
        'trustsecsettings.deviceAuthenticationSettings.sgaDevicePassword':
          networkDevice?.trustsecsettings?.deviceAuthenticationSettings
            ?.sgaDevicePassword,
        'trustsecsettings.sgaNotificationAndUpdates.downlaodEnvironmentDataEveryXSeconds':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.downlaodEnvironmentDataEveryXSeconds,
        'trustsecsettings.sgaNotificationAndUpdates.downloadSGACLListsEveryXSeconds':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.downloadSGACLListsEveryXSeconds,
        'trustsecsettings.sgaNotificationAndUpdates.downlaodPeerAuthorizationPolicyEveryXSeconds':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.downlaodPeerAuthorizationPolicyEveryXSeconds,
        'trustsecsettings.sgaNotificationAndUpdates.reAuthenticationEveryXSeconds':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.reAuthenticationEveryXSeconds,
        'trustsecsettings.sgaNotificationAndUpdates.otherSGADevicesToTrustThisDevice':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.otherSGADevicesToTrustThisDevice,
        'trustsecsettings.sgaNotificationAndUpdates.sendConfigurationToDevice':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.sendConfigurationToDevice,
        'trustsecsettings.sgaNotificationAndUpdates.sendConfigurationToDeviceUsing':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.sendConfigurationToDeviceUsing,
        'trustsecsettings.sgaNotificationAndUpdates.coaSourceHost':
          networkDevice?.trustsecsettings?.sgaNotificationAndUpdates
            ?.coaSourceHost,
        'trustsecsettings.deviceConfigurationDeployment.includeWhenDeployingSGTUpdates':
          networkDevice?.trustsecsettings?.deviceConfigurationDeployment
            ?.includeWhenDeployingSGTUpdates,
        'trustsecsettings.deviceConfigurationDeployment.execModePassword':
          networkDevice?.trustsecsettings?.deviceConfigurationDeployment
            ?.execModePassword,
        'trustsecsettings.deviceConfigurationDeployment.enableModePassword':
          networkDevice?.trustsecsettings?.deviceConfigurationDeployment
            ?.enableModePassword,
        'trustsecsettings.deviceConfigurationDeployment.execModeUsername':
          networkDevice?.trustsecsettings?.deviceConfigurationDeployment
            ?.execModeUsername,
        'trustsecsettings.pushIdSupport':
          networkDevice?.trustsecsettings?.pushIdSupport,
        'tacacsSettings.sharedSecret':
          networkDevice?.tacacsSettings?.sharedSecret,
        'tacacsSettings.connectModeOptions':
          networkDevice?.tacacsSettings?.connectModeOptions,
        profileName: networkDevice?.profileName,
        coaPort: networkDevice?.coaPort,
        dtlsDnsName: networkDevice?.dtlsDnsName,
        'link.rel': networkDevice?.link?.rel,
        'link.href': networkDevice?.link?.href,
        'link.type': networkDevice?.link?.type,
      },
    },
  });
}

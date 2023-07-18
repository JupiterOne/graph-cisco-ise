import { CiscoIseAPIClient, ERSApiPath } from '../../client';
import {
  NetworkDevice,
  NetworkDeviceDetails,
  NetworkDeviceGroup,
} from '../../types';

export class NetworkDeviceClient extends CiscoIseAPIClient {
  public async iterateNetworkDeviceGroups(
    callback: (data: NetworkDeviceGroup) => Promise<void>,
  ): Promise<void> {
    await this.iterateApi<NetworkDeviceGroup>(
      async (networkDeviceGroups) => {
        for (const networkDeviceGroup of networkDeviceGroups) {
          await callback(networkDeviceGroup);
        }
      },
      '100',
      `${ERSApiPath.ERS_CONFIG_PATH}/networkdevicegroup`,
    );
  }

  public async iterateNetworkDevices(
    callback: (data: NetworkDevice) => Promise<void>,
  ): Promise<void> {
    await this.iterateApi<NetworkDevice>(
      async (endpointGroups) => {
        for (const endpointGroup of endpointGroups) {
          await callback(endpointGroup);
        }
      },
      '100',
      `${ERSApiPath.ERS_CONFIG_PATH}/networkdevice`,
    );
  }

  public async fetchNetworkDeviceDetails(
    networkDeviceId: string,
  ): Promise<NetworkDeviceDetails> {
    const response = await this.executeAPIRequestWithRetries<{
      NetworkDevice: NetworkDeviceDetails;
    }>(
      `${this.buildBaseUrl(
        ERSApiPath.ERS_CONFIG_PATH,
      )}/networkdevice/${networkDeviceId}`,
    );

    return response.NetworkDevice;
  }
}

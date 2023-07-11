import { CiscoIseAPIClient, ERSApiPath } from '../../client';
import { Endpoint, EndpointDetails, EndpointGroup } from '../../types';

export class EndpointClient extends CiscoIseAPIClient {
  public async iterateEndpointGroups(
    callback: (data: EndpointGroup) => Promise<void>,
  ): Promise<void> {
    await this.iterateApi<EndpointGroup>(
      async (endpointGroups) => {
        for (const endpointGroup of endpointGroups) {
          await callback(endpointGroup);
        }
      },
      '100',
      `${ERSApiPath.ERS_CONFIG_PATH}/endpointgroup`,
    );
  }

  public async iterateEndpoints(
    callback: (data: Endpoint) => Promise<void>,
  ): Promise<void> {
    await this.iterateApi<Endpoint>(
      async (endpointGroups) => {
        for (const endpointGroup of endpointGroups) {
          await callback(endpointGroup);
        }
      },
      '100',
      `${ERSApiPath.ERS_CONFIG_PATH}/endpoint`,
    );
  }

  public async fetchEndpointDetails(
    endpointId: string,
  ): Promise<EndpointDetails> {
    const response = await this.executeAPIRequestWithRetries<{
      ERSEndPoint: EndpointDetails;
    }>(
      `${this.buildBaseUrl(ERSApiPath.ERS_CONFIG_PATH)}/endpoint/${endpointId}`,
    );

    return response.ERSEndPoint;
  }
}

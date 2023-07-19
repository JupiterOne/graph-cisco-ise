export type Page = {
  rel: string;
  href: string;
  type: string;
};

export type CommonResponse<T> = {
  SearchResult: {
    total: number;
    resources: T[];
    nextPage?: Page;
    previousPage?: Page;
  };
};

export type CiscoIseApiCallback<T> = (
  resources: T[],
) => boolean | void | Promise<boolean | void>;

export type Link = {
  rel?: string;
  href?: string;
  type?: string;
};

export type EndpointGroup = {
  id: string;
  name: string;
  description?: string;
  link?: Link;
};

export type NetworkDeviceGroup = {
  id: string;
  name: string;
  description?: string;
  link?: Link;
};

export type Endpoint = {
  id: string;
  name?: string;
  link?: Link;
};

export type NetworkDevice = {
  id: string;
  name?: string;
  link?: Link;
};

export type EndpointDetails = {
  id: string;
  name?: string;
  description?: string;
  mac?: string;
  profileId?: string;
  staticProfileAssignment?: boolean;
  staticProfileAssignmentDefined?: boolean;
  groupId?: string;
  staticGroupAssignment?: boolean;
  staticGroupAssignmentDefined?: boolean;
  portalUser?: string;
  identityStore?: string;
  identityStoreId?: string;
  link?: Link;
  customAttributes?: {
    customAttributes?: { [key: string]: string | number | boolean };
  };
};

export type NetworkDeviceIP = {
  ipaddress: string;
  mask?: number;
};

export type NetworkDeviceDetails = {
  id: string;
  NetworkDeviceIPList: NetworkDeviceIP[];
  NetworkDeviceGroupList: string[];
  authenticationSettings?: {
    networkProtocol?: string;
    radiusSharedSecret?: string;
    enableKeyWrap?: boolean;
    dtlsRequired?: boolean;
    enableMultiSecret?: boolean;
    keyEncryptionKey?: string;
    messageAuthenticatorCodeKey?: string;
    keyInputFormat?: string;
  };
  snmpsettings?: {
    version?: string;
    roCommunity?: string;
    pollingInterval?: number;
    linkTrapQuery?: boolean;
    macTrapQuery?: boolean;
    originatingPolicyServicesNode?: string;
  };
  trustsecsettings?: {
    deviceAuthenticationSettings?: {
      sgaDeviceId?: string;
      sgaDevicePassword?: string;
    };
    sgaNotificationAndUpdates?: {
      downlaodEnvironmentDataEveryXSeconds?: number;
      downlaodPeerAuthorizationPolicyEveryXSeconds?: number;
      reAuthenticationEveryXSeconds?: number;
      downloadSGACLListsEveryXSeconds?: number;
      otherSGADevicesToTrustThisDevice?: boolean;
      sendConfigurationToDevice?: boolean;
      sendConfigurationToDeviceUsing?: string;
      coaSourceHost?: string;
    };
    deviceConfigurationDeployment?: {
      includeWhenDeployingSGTUpdates?: boolean;
      enableModePassword?: string;
      execModePassword?: string;
      execModeUsername?: string;
    };
    pushIdSupport?: boolean;
  };
  tacacsSettings?: {
    sharedSecret?: string;
    connectModeOptions?: string;
  };
  profileName?: string;
  coaPort?: number;
  dtlsDnsName?: string;
  link?: Link;
};

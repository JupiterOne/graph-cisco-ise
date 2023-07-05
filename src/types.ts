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
  name?: string;
  description?: string;
  link?: Link;
};

export type Endpoint = {
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

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

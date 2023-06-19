import { type ListingType, type SortType } from "lemmy-js-client";

import { type AccountData } from "../types";

type GetPostsQueryKey = {
  listingType: ListingType;
  sort: SortType;
  communityName?: string;
  account: AccountData;
};

export const queryKeys = {
  getUser: (jwt: string) => ["user", jwt],
  getUsers: (jwts: string[]) => ["user", jwts],
  getPosts: ({ account, listingType, sort }: GetPostsQueryKey) =>
    [
      "posts",
      account.instanceUrl,
      account.username,
      listingType,
      sort,
    ] as const,
} as const;

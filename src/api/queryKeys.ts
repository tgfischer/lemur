import { type ListingType, type SortType } from "lemmy-js-client";

import { type AccountData } from "../types";

type GetPostQueryKey = {
  account: AccountData;
  postId: number;
};

type GetPostsQueryKey = {
  listingType: ListingType;
  sort: SortType;
  communityName?: string;
  account: AccountData;
};

type GetCommentsQueryKey = {
  type: ListingType;
  postId: number;
  limit: number;
  maxDepth: number;
};

export const queryKeys = {
  getUser: (jwt: string) => ["user", jwt] as const,
  getUsers: (jwts: string[]) => ["user", jwts] as const,
  getPost: ({ account, postId }: GetPostQueryKey) =>
    ["post", account.instanceUrl, account.username, postId] as const,
  getPosts: ({ account, listingType, sort }: GetPostsQueryKey) =>
    [
      "posts",
      account.instanceUrl,
      account.username,
      listingType,
      sort,
    ] as const,
  getComments: ({ type, postId, limit, maxDepth }: GetCommentsQueryKey) =>
    ["comments", postId, type, limit, maxDepth] as const,
} as const;

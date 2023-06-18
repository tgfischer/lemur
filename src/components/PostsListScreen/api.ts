import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import {
  LemmyHttp,
  type GetPostsResponse,
  type PostView,
  type ListingType,
  type SortType,
} from "lemmy-js-client";
import { useMemo } from "react";

import { useRefresh } from "../../hooks";
import { type AccountData, type Overwrite } from "../../types";

type GetPostsQueryOptions = {
  listingType: ListingType;
  sort: SortType;
  communityName?: string;
  account: AccountData;
};

type GetPostsQueryData = InfiniteData<GetPostsResponse> & {
  flattened: PostView[];
};

type GetPostsQueryResult = Overwrite<
  UseInfiniteQueryResult<GetPostsResponse>,
  { data: GetPostsQueryData; refetch: () => Promise<void> }
>;

type GetPostsQueryKey = GetPostsQueryOptions;

export const queryKeys = {
  getPosts: ({ account, listingType, sort }: GetPostsQueryKey) =>
    [
      "posts",
      account.instanceUrl,
      account.username,
      listingType,
      sort,
    ] as const,
} as const;

export const useGetPostsQuery = ({
  listingType,
  sort,
  communityName,
  account,
}: GetPostsQueryOptions): GetPostsQueryResult => {
  console.log(listingType, sort, communityName, account);
  const query = useInfiniteQuery<GetPostsResponse>(
    queryKeys.getPosts({
      account,
      listingType,
      sort,
    }),
    async ({ pageParam = 1 }) => {
      const http = new LemmyHttp(account.instanceUrl);
      return await http.getPosts({
        page: pageParam,
        limit: 10,
        type_: listingType,
        sort,
        community_name: communityName,
        auth: account.jwt,
      });
    },
    {
      keepPreviousData: true,
    },
  );

  const { isRefreshing, handleRefresh } = useRefresh(query.refetch);

  const data = useMemo<GetPostsQueryData>(() => {
    if (!query.data) {
      return { pages: [], flattened: [], pageParams: [] };
    }

    const posts = query.data.pages.flatMap(({ posts }) => posts);

    return {
      ...query.data,
      flattened: posts.filter(
        ({ post: post1 }, i) =>
          posts.findIndex(({ post: post2 }) => post1.ap_id === post2.ap_id) ===
          i,
      ),
    };
  }, [query.data]);

  return { ...query, data, refetch: handleRefresh, isRefetching: isRefreshing };
};

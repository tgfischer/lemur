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
import { type Overwrite } from "../../types";

type GetPostsQueryOptions = {
  instanceUrl: string;
  listingType: ListingType;
  sort: SortType;
  communityName?: string;
};

type GetPostsQueryData = InfiniteData<GetPostsResponse> & {
  flattened: PostView[];
};

type GetPostsQueryResult = Overwrite<
  UseInfiniteQueryResult<GetPostsResponse>,
  { data: GetPostsQueryData; refetch: () => Promise<void> }
>;

export const queryKeys = {
  getPosts: ({ instanceUrl, listingType, sort }: GetPostsQueryOptions) =>
    ["posts", instanceUrl, listingType, sort] as const,
} as const;

export const useGetPostsQuery = ({
  instanceUrl,
  listingType,
  sort,
  communityName,
}: GetPostsQueryOptions): GetPostsQueryResult => {
  const query = useInfiniteQuery<GetPostsResponse>(
    queryKeys.getPosts({ instanceUrl, listingType, sort }),
    async ({ pageParam = 1 }) => {
      const http = new LemmyHttp(instanceUrl);
      return await http.getPosts({
        page: pageParam,
        limit: 10,
        type_: listingType,
        sort,
        community_name: communityName,
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

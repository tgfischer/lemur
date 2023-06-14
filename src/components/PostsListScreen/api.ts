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

import { type Overwrite } from "../../types";

type GetPostsQueryOptions = {
  instanceUrl: "https://lemmy.ca";
  type: ListingType;
  sort: SortType;
};

type GetPostsQueryData = InfiniteData<GetPostsResponse> & {
  flattened: PostView[];
};

type GetPostsQueryResult = Overwrite<
  UseInfiniteQueryResult<GetPostsResponse>,
  { data: GetPostsQueryData }
>;

export const queryKeys = {
  getPosts: ({ instanceUrl, type, sort }: GetPostsQueryOptions) =>
    ["posts", instanceUrl, type, sort] as const,
} as const;

export const useGetPostsQuery = ({
  instanceUrl,
  type,
  sort,
}: GetPostsQueryOptions): GetPostsQueryResult => {
  const query = useInfiniteQuery<GetPostsResponse>(
    queryKeys.getPosts({ instanceUrl, type, sort }),
    async ({ pageParam = 1 }) => {
      const http = new LemmyHttp(instanceUrl);
      return await http.getPosts({
        page: pageParam,
        limit: 10,
        type_: type,
        sort,
      });
    },
    {
      keepPreviousData: true,
    },
  );

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

  return { ...query, data };
};

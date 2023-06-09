import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { LemmyHttp, type GetPostsResponse } from "lemmy-js-client";

export const queryKeys = {
  getPosts: () => ["posts"] as const,
} as const;

export const useGetPostsQuery =
  (): UseInfiniteQueryResult<GetPostsResponse> => {
    return useInfiniteQuery<GetPostsResponse>(
      queryKeys.getPosts(),
      async ({ pageParam = 1 }) => {
        const http = new LemmyHttp("https://lemmy.ca");
        return await http.getPosts({ page: pageParam, limit: 10 });
      },
      {
        keepPreviousData: true,
      },
    );
  };

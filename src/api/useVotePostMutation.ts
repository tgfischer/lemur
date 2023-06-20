import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  type GetPostsResponse,
  LemmyHttp,
  type ListingType,
  type SortType,
  type PostView,
} from "lemmy-js-client";

import { type AccountData } from "../types";

import { queryKeys } from "./queryKeys";

type VotePostMutationOptions = {
  postId: number;
  vote: "up" | "down" | "reset";
  account: AccountData;
  listingType: ListingType;
  sort: SortType;
};

/**
 * @todo refresh the post cache
 */
export const useVotePostMutation = ({
  postId,
  vote,
  account,
  listingType,
  sort,
}: VotePostMutationOptions): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(["vote"], async () => {
    const http = new LemmyHttp(account.instanceUrl);
    const result = await http.likePost({
      auth: account.jwt,
      post_id: postId,
      score: vote === "up" ? 1 : vote === "down" ? -1 : 0,
    });

    queryClient.setQueryData<PostView>(
      queryKeys.getPost({ account, postId }),
      result.post_view,
    );

    queryClient.setQueryData<InfiniteData<GetPostsResponse>>(
      queryKeys.getPosts({ account, listingType, sort }),
      (state) => {
        if (!state) {
          return { pages: [], pageParams: [] };
        }

        const pages = state.pages.map<GetPostsResponse>((page) => ({
          posts: page.posts.map<PostView>((post) =>
            post.post.ap_id === result.post_view.post.ap_id
              ? result.post_view
              : post,
          ),
        }));

        return { ...state, pages };
      },
    );

    return result;
  });
};

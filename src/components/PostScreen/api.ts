import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { LemmyHttp, type PostView, type CommentView } from "lemmy-js-client";

import { queryKeys } from "../../api/queryKeys";
import { type Tree, type Overwrite, type AccountData } from "../../types";

type GetPostQueryOptions = {
  account: AccountData;
  view: PostView;
};

export const useGetPostQuery = ({
  view,
  account,
}: GetPostQueryOptions): UseQueryResult<PostView> => {
  return useQuery<PostView>(
    queryKeys.getPost({ account, postId: view.post.id }),
    async () => {
      const http = new LemmyHttp("https://lemmy.ca");
      const result = await http.getPost({
        id: view.post.id,
        auth: account.jwt,
      });

      return result.post_view;
    },
    { initialData: view },
  );
};

export type CommentViewData = Overwrite<
  CommentView,
  { parentId: string | undefined }
>;

const toCommentTree = (data: CommentView[]): Array<Tree<CommentViewData>> => {
  const lookup = data
    .map((view) => {
      const parts = view.comment.path.split(".");
      const parentId = parts.length > 2 ? parts[parts.length - 2] : undefined;
      return { ...view, parentId };
    })
    .sort(
      (a, b) =>
        b.comment.path.split(".").length - a.comment.path.split(".").length,
    )
    .reduce(
      (lookup, view) =>
        lookup.set(view.comment.id.toString(), { value: view, children: [] }),
      new Map<string, Tree<CommentViewData>>(),
    );

  for (const [, tree] of lookup) {
    if (!tree.value.parentId) {
      continue;
    }

    const parent = lookup.get(tree.value.parentId);

    if (parent) {
      lookup.set(tree.value.parentId, {
        ...parent,
        children: [...parent.children, tree],
      });
    }
  }

  const result: Array<Tree<CommentViewData>> = [];

  for (const view of data) {
    if (view.comment.path.split(".").length !== 2) {
      continue;
    }

    const comment = lookup.get(view.comment.id.toString());

    if (!comment) {
      continue;
    }

    result.push(comment);
  }

  return result;
};

type GetCommentsQueryOptions = {
  postId: number;
};

export const useGetCommentsQuery = ({
  postId,
}: GetCommentsQueryOptions): UseInfiniteQueryResult<
  Array<Tree<CommentViewData>>
> => {
  return useInfiniteQuery<Array<Tree<CommentViewData>>>(
    queryKeys.getComments({
      type: "All",
      postId,
      limit: 10,
      maxDepth: 10,
    }),
    async ({ pageParam = 1 }) => {
      const http = new LemmyHttp("https://lemmy.ca");
      const result = await http.getComments({
        type_: "All",
        post_id: postId,
        limit: 10,
        page: pageParam,
        max_depth: 10,
      });
      return toCommentTree(result.comments);
    },
    {
      keepPreviousData: true,
    },
  );
};

import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import { Row, View } from "native-base";
import { useMemo, useRef } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  type ListRenderItem,
  FlatList,
} from "react-native";

import { type Tree } from "../../types";
import { ReturnToTopButton } from "../ReturnToTopButton";
import { type ScreenType, type FeedStackParamList } from "../types";

import {
  type CommentViewData,
  queryKeys,
  useGetCommentsQuery,
  useGetPostQuery,
} from "./api";
import { Comment } from "./Comment";
import { PostMasthead } from "./PostMasthead";

type PostScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  ScreenType.Post
>;

const renderItem: ListRenderItem<Tree<CommentViewData>> = ({ item: tree }) => (
  <Comment key={tree.value.comment.ap_id} tree={tree} level={0} />
);

const keyExtractor = (tree: Tree<CommentViewData>): string =>
  tree.value.comment.ap_id;

export const PostScreen = ({ route }: PostScreenProps): JSX.Element | null => {
  const flatListRef = useRef<FlatList>(null);

  const queryClient = useQueryClient();

  const postId = route.params.view.post.id;

  const postQuery = useGetPostQuery({ post: route.params.view });
  const commentsQuery = useGetCommentsQuery({ postId });

  const comments = useMemo(() => {
    return commentsQuery.data?.pages.flatMap((comments) => comments) ?? [];
  }, [commentsQuery.data?.pages]);

  if (!postQuery.data) {
    return null;
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            refreshing={postQuery.isRefetching || commentsQuery.isRefetching}
            onRefresh={() => {
              void Promise.all([
                postQuery.refetch(),
                commentsQuery.refetch(),
              ]).then(async () => {
                await queryClient.resetQueries(queryKeys.getPost(postId));
                await queryClient.resetQueries(["comments", postId]);
              });
            }}
          />
        }
        data={comments}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={<PostMasthead view={postQuery.data} />}
        ListFooterComponent={
          commentsQuery.isInitialLoading || commentsQuery.isFetchingNextPage ? (
            <Row p={2} justifyContent="center">
              <ActivityIndicator />
            </Row>
          ) : undefined
        }
      />
      <ReturnToTopButton
        onPress={() =>
          flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
        }
      />
    </View>
  );
};

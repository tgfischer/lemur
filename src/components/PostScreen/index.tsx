import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { Row, useColorMode } from "native-base";
import { useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  type ListRenderItem,
  FlatList,
} from "react-native";

import { type Tree } from "../../types";
import { type ScreenType, type StackNavigatorParamList } from "../types";

import {
  type CommentViewData,
  useGetCommentsQuery,
  useGetPostQuery,
} from "./api";
import { Comment } from "./Comment";
import { PostMasthead } from "./PostMasthead";

type PostScreenProps = NativeStackScreenProps<
  StackNavigatorParamList,
  ScreenType.Post
>;

const renderItem: ListRenderItem<Tree<CommentViewData>> = ({ item: tree }) => (
  <Comment key={tree.value.comment.ap_id} tree={tree} level={0} />
);

const keyExtractor = (tree: Tree<CommentViewData>): string =>
  tree.value.comment.ap_id;

export const PostScreen = ({ route }: PostScreenProps): JSX.Element | null => {
  const theme = useColorMode();

  const postId = route.params.view.post.id;

  const postQuery = useGetPostQuery({
    account: route.params.account,
    view: route.params.view,
  });

  const commentsQuery = useGetCommentsQuery({ postId });

  const comments = useMemo(() => {
    return commentsQuery.data?.pages.flatMap((comments) => comments) ?? [];
  }, [commentsQuery.data?.pages]);

  const colorMode = theme.colorMode === "dark" ? "white" : "default";

  return (
    <FlatList
      indicatorStyle={colorMode}
      refreshControl={
        <RefreshControl
          refreshing={postQuery.isRefetching || commentsQuery.isRefetching}
          tintColor={colorMode}
        />
      }
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ListHeaderComponent={<PostMasthead view={postQuery.data!} />}
      ListFooterComponent={
        commentsQuery.isInitialLoading || commentsQuery.isFetchingNextPage ? (
          <Row p={2} justifyContent="center">
            <ActivityIndicator />
          </Row>
        ) : undefined
      }
    />
  );
};

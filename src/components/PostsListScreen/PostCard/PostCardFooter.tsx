import { type RouteProp, useRoute } from "@react-navigation/native";
import { type PostView } from "lemmy-js-client";
import { Column, Row, Flex } from "native-base";

import { timeAgo } from "../../../utilities";
import { IconText } from "../../IconText";
import { type ScreenType, type StackNavigatorParamList } from "../../types";
import { Username } from "../../Username";
import { DownvoteButton, UpvoteButton } from "../../VoteButtons";

type PostCardFooterProps = PostView;

export const PostCardFooter = ({
  post,
  counts,
  creator,
  my_vote: myVote,
}: PostCardFooterProps): JSX.Element => {
  const { params } =
    useRoute<RouteProp<StackNavigatorParamList, ScreenType.Posts>>();

  return (
    <Flex
      padding={2.5}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Column>
        <Username creator={creator} />
        <Row alignItems="center" space={2.5}>
          <IconText icon="ios-arrow-up">{counts.score}</IconText>
          <IconText icon="ios-chatbox-outline">{counts.comments}</IconText>
          <IconText icon="ios-time-outline">{timeAgo(post.published)}</IconText>
        </Row>
      </Column>
      <Row>
        <UpvoteButton
          postId={post.id}
          account={params.account}
          vote={myVote}
          listingType={params.listingType}
          sort={params.sort}
        />
        <DownvoteButton
          postId={post.id}
          account={params.account}
          vote={myVote}
          listingType={params.listingType}
          sort={params.sort}
        />
      </Row>
    </Flex>
  );
};

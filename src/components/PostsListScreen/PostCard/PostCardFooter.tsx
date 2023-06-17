import { type PostView } from "lemmy-js-client";
import { Column, Row, Flex } from "native-base";

import { timeAgo } from "../../../utilities";
import { IconText } from "../../IconText";
import { Username } from "../../Username";
import { DownvoteButton, UpvoteButton } from "../../VoteButtons";

type PostCardFooterProps = PostView;

export const PostCardFooter = ({
  post,
  counts,
  creator,
}: PostCardFooterProps): JSX.Element => (
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
      <UpvoteButton />
      <DownvoteButton />
    </Row>
  </Flex>
);

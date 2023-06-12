import { type PostView } from "lemmy-js-client";
import { Column, Row, Text, Flex } from "native-base";

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
    padding={2}
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Column>
      <Username creator={creator} />
      <Row alignItems="center" space={2.5}>
        <IconText icon="arrow-up">{counts.upvotes}</IconText>
        <IconText icon="arrow-down">{counts.downvotes}</IconText>
        <IconText icon="chatbox-outline">{counts.comments}</IconText>
        <Text color="muted.600">{timeAgo(post.published)}</Text>
      </Row>
    </Column>
    <Row>
      <UpvoteButton />
      <DownvoteButton />
    </Row>
  </Flex>
);

import { type PostView } from "lemmy-js-client";
import { Column, Divider, Flex, Row, Stack } from "native-base";

import { timeAgo } from "../../utilities";
import { IconText } from "../IconText";
import { PostTextBody } from "../PostTextBody";
import { PostThumbnail } from "../PostThumbnail";
import { Username } from "../Username";
import { UpvoteButton, DownvoteButton } from "../VoteButtons";

import { MoreActionsButton } from "./MoreActionsButton";
import { PostHeader } from "./PostHeader";

type PostMastheadProps = {
  view: PostView;
};

export const PostMasthead = ({ view }: PostMastheadProps): JSX.Element => {
  return (
    <Stack>
      <PostHeader {...view} />
      <PostThumbnail {...view} />
      <PostTextBody {...view} padding={2.5} />
      <Flex
        padding={2.5}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Column>
          <Username creator={view.creator} />
          <Row alignItems="center" space={2.5}>
            <IconText icon="ios-arrow-up">{view.counts.score}</IconText>
            <IconText icon="ios-chatbox-outline">
              {view.counts.comments}
            </IconText>
            <IconText icon="ios-time-outline">
              {timeAgo(view.post.published)}
            </IconText>
          </Row>
        </Column>
        <Row>
          <MoreActionsButton />
          <UpvoteButton />
          <DownvoteButton />
        </Row>
      </Flex>
      <Divider _dark={{ backgroundColor: "dark.100" }} height={1.5} />
    </Stack>
  );
};

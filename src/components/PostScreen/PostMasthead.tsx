import { type PostView } from "lemmy-js-client";
import { Row, Stack, Text } from "native-base";

import { timeAgo } from "../../utilities";
import { IconText } from "../IconText";
import { PostTextBody } from "../PostTextBody";
import { PostThumbnail } from "../PostThumbnail";
import { Username } from "../Username";

import { PostActions } from "./PostActions";
import { PostHeader } from "./PostHeader";

type PostMastheadProps = {
  view: PostView;
};

export const PostMasthead = ({ view }: PostMastheadProps): JSX.Element => {
  return (
    <Stack>
      <PostHeader {...view} />
      <PostThumbnail {...view} />
      <PostTextBody {...view} padding={2} />
      <Stack padding={2}>
        <Username creator={view.creator} />
        <Row alignItems="center" space={2.5}>
          <IconText icon="arrow-up">{view.counts.score}</IconText>
          <IconText icon="chatbox-outline">{view.counts.comments}</IconText>
          <Text color="muted.600">{timeAgo(view.post.published)}</Text>
        </Row>
      </Stack>
      <PostActions />
    </Stack>
  );
};

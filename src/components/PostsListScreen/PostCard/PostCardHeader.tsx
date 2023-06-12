import { type PostView } from "lemmy-js-client";
import { Heading, Column, Row, Text } from "native-base";

import { PostCardLink } from "./PostCardLink";

type PostCardHeaderProps = PostView;

export const PostCardHeader = (props: PostCardHeaderProps): JSX.Element => {
  return (
    <PostCardLink view={props}>
      <Column padding={2}>
        <Heading size="sm" fontWeight="semibold">
          {props.post.name}
        </Heading>
        <Row>
          <Text color="muted.600">
            {props.community.actor_id.replace("https://", "")}
          </Text>
        </Row>
      </Column>
    </PostCardLink>
  );
};

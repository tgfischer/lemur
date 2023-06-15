import { type PostView } from "lemmy-js-client";
import { Heading, Column, Row, Text, Badge, Stack } from "native-base";

import { PostCardLink } from "./PostCardLink";

type PostCardHeaderProps = PostView;

export const PostCardHeader = (props: PostCardHeaderProps): JSX.Element => {
  return (
    <PostCardLink view={props}>
      <Column padding={2}>
        <Heading size="sm" fontWeight="semibold">
          {props.post.name}
        </Heading>
        <Stack space={1}>
          <Row>
            <Text _light={{ color: "muted.600" }}>
              {props.community.actor_id.replace("https://", "")}
            </Text>
          </Row>
          {props.post.nsfw && (
            <Row>
              <Badge colorScheme="danger" variant="solid">
                <Text fontSize={10} color="white">
                  NSFW
                </Text>
              </Badge>
            </Row>
          )}
        </Stack>
      </Column>
    </PostCardLink>
  );
};

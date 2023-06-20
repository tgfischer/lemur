import { type PostView } from "lemmy-js-client";
import { Heading, Column, Row, Text, Badge, Stack, Avatar } from "native-base";

import { PostCardLink } from "./PostCardLink";

type PostCardHeaderProps = PostView;

export const PostCardHeader = (props: PostCardHeaderProps): JSX.Element => {
  return (
    <PostCardLink view={props}>
      <Column padding={2.5}>
        <Heading size="md" fontWeight="semibold">
          {props.post.name}
        </Heading>
        <Stack space={1}>
          <Row space={1} alignItems="center">
            {props.community.icon && (
              <Avatar source={{ uri: props.community.icon }} size={5}>
                {props.community.icon}
              </Avatar>
            )}
            <Text
              _light={{ color: "muted.600" }}
              _dark={{ color: "muted.400" }}
            >
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

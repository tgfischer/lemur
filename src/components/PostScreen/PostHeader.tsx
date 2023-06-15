import { type PostView } from "lemmy-js-client";
import { Heading, Column, Row, Text } from "native-base";

type PostHeaderProps = PostView;

export const PostHeader = ({
  post,
  community,
}: PostHeaderProps): JSX.Element => {
  return (
    <Column padding={2.5}>
      <Heading size="md" fontWeight="semibold">
        {post.name}
      </Heading>
      <Row>
        <Text _light={{ color: "muted.600" }}>
          {community.actor_id.replace("https://", "")}
        </Text>
      </Row>
    </Column>
  );
};

import { Link } from "@react-navigation/native";
import { type PostView } from "lemmy-js-client";
import { Heading, Column, Row, Text } from "native-base";

type PostCardHeaderProps = PostView;

export const PostCardHeader = ({
  community,
  post,
}: PostCardHeaderProps): JSX.Element => {
  return (
    <Link to={{ screen: "Post" }}>
      <Column padding={2}>
        <Heading size="sm" fontWeight="semibold">
          {post.name}
        </Heading>
        <Row>
          <Text color="muted.600">
            {community.actor_id.replace("https://", "")}
          </Text>
        </Row>
      </Column>
    </Link>
  );
};

import { Box, Row, Text } from "native-base";

import { type PostThumbnailProps } from "./types";

export const WebsiteThumbnail = ({ post }: PostThumbnailProps): JSX.Element => {
  return (
    <Box padding={2.5}>
      <Box>
        <Text>Todo</Text>
      </Box>
      <Row>
        <Text>{post.embed_title}</Text>
      </Row>
    </Box>
  );
};

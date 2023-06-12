import { Divider, Box, Row } from "native-base";

import { DownvoteButton, UpvoteButton } from "../VoteButtons";

export const PostActions = (): JSX.Element => {
  return (
    <Box background="gray.200">
      <Divider />
      <Row justifyContent="flex-end" padding={2}>
        <UpvoteButton />
        <DownvoteButton />
      </Row>
      <Divider />
    </Box>
  );
};

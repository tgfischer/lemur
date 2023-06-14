import { Divider, Box, Row } from "native-base";

import { DownvoteButton, UpvoteButton } from "../VoteButtons";

import { MoreActionsButton } from "./MoreActionsButton";

export const PostActions = (): JSX.Element => {
  return (
    <Box background="gray.200">
      <Divider />
      <Row justifyContent="flex-end" padding={2}>
        <MoreActionsButton />
        <UpvoteButton />
        <DownvoteButton />
      </Row>
      <Divider />
    </Box>
  );
};

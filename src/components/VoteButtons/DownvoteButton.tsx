import { useVotePostMutation } from "../../api";

import { type VoteButtonProps } from "./types";
import { VoteButton } from "./VoteButton";

export const DownvoteButton = ({
  postId,
  account,
  vote,
  listingType,
  sort,
}: VoteButtonProps): JSX.Element => {
  const { mutate } = useVotePostMutation({
    postId,
    account,
    listingType,
    sort,
    vote: "down",
  });
  return (
    <VoteButton
      arrow="down"
      color="blue"
      onPress={() => {
        mutate({});
      }}
      highlighted={vote === -1}
    />
  );
};

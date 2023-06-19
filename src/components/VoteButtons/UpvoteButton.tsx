import { useVotePostMutation } from "../../api";

import { type VoteButtonProps } from "./types";
import { VoteButton } from "./VoteButton";

export const UpvoteButton = ({
  postId,
  account,
  vote,
  listingType,
  sort,
}: VoteButtonProps): JSX.Element => {
  const { mutate } = useVotePostMutation({
    postId,
    account,
    vote: "up",
    listingType,
    sort,
  });
  return (
    <VoteButton
      arrow="up"
      color="orange"
      onPress={() => {
        mutate({});
      }}
      highlighted={vote === 1}
    />
  );
};

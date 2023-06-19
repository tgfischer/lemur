import { type ListingType, type SortType } from "lemmy-js-client";

import { type AccountData } from "../../types";

export type VoteButtonProps = {
  postId: number;
  account: AccountData;
  vote?: number;
  listingType: ListingType;
  sort: SortType;
};

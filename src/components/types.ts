import { type Ionicons } from "@expo/vector-icons";
import {
  type SortType,
  type PostView,
  type ListingType,
} from "lemmy-js-client";

import { type AccountData } from "../types";

export type IconType = keyof typeof Ionicons.glyphMap;

type PostsScreenParams = {
  instanceUrl: string;
  listingType: ListingType;
  sort: SortType;
  communityName?: string;
  account: AccountData;
};

export enum ScreenType {
  PostsStack = "PostsStack",
  Posts = "Posts",
  Post = "Post",
  Accounts = "Accounts",
  AddAccount = "AddAccount",
}

export type StackNavigatorParamList = {
  Accounts: undefined;
  AddAccount: undefined;
  Posts: PostsScreenParams;
  Post: { view: PostView };
};

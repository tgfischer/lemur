import { type Ionicons } from "@expo/vector-icons";
import {
  type SortType,
  type PostView,
  type ListingType,
} from "lemmy-js-client";

import { type AccountData } from "../types";

export type IconType = keyof typeof Ionicons.glyphMap;

type PostsScreenParams = {
  listingType: ListingType;
  sort: SortType;
  communityName?: string;
  account: AccountData;
};

type PostScreenParams = PostsScreenParams & {
  view: PostView;
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
  Post: PostScreenParams;
};

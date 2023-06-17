import { type Ionicons } from "@expo/vector-icons";
import {
  type SortType,
  type PostView,
  type ListingType,
} from "lemmy-js-client";

export type IconType = keyof typeof Ionicons.glyphMap;

export enum ScreenType {
  Posts = "Posts",
  Post = "Post",
}

export type FeedStackParamList = {
  Posts: {
    instanceUrl: string;
    listingType: ListingType;
    sort: SortType;
    communityName?: string;
  };
  Post: { view: PostView };
};

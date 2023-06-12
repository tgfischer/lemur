import { type PostView } from "lemmy-js-client";

export enum ScreenType {
  Posts = "Posts",
  Post = "Post",
}

export type FeedStackParamList = {
  Posts: undefined;
  Post: { view: PostView };
};

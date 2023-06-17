import { type Post, type PostView } from "lemmy-js-client";

import { type Overwrite, type SetRequired } from "../../types";

export type UrlPost = SetRequired<Post, "url">;

export type PostThumbnailProps = Overwrite<PostView, { post: UrlPost }>;

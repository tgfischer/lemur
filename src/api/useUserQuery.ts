import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { LemmyHttp } from "lemmy-js-client";

import { type UserData, type AccountData } from "../types";

import { queryKeys } from "./queryKeys";

type UserQueryOptions = Pick<AccountData, "jwt" | "instanceUrl">;

export const useUserQuery = ({
  jwt,
  instanceUrl,
}: UserQueryOptions): UseQueryResult<UserData> => {
  return useQuery<UserData>(queryKeys.getUser(jwt), async () => {
    const http = new LemmyHttp(instanceUrl);
    const result = await http.getSite({ auth: jwt });

    if (!result.my_user) {
      throw new Error("Invalid user");
    }

    return result as UserData;
  });
};

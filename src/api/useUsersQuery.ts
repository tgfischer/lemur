import {
  type UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { LemmyHttp } from "lemmy-js-client";

import { type UserData, type AccountData } from "../types";

import { queryKeys } from "./queryKeys";

type UsersQueryOptions = {
  accounts: AccountData[];
};

type UsersQueryResult = {
  users: Array<{
    user: UserData;
    account: AccountData;
  }>;
};

export const useUsersQuery = ({
  accounts,
}: UsersQueryOptions): UseQueryResult<UsersQueryResult> => {
  const queryClient = useQueryClient();

  return useQuery<UsersQueryResult>(
    queryKeys.getUsers(accounts.map(({ jwt }) => jwt)),
    async () => {
      return {
        users: await Promise.all(
          accounts.map(async (account) => {
            const http = new LemmyHttp(account.instanceUrl);
            const result = await http.getSite({ auth: account.jwt });

            if (!result.my_user) {
              throw new Error("Invalid user");
            }

            queryClient.setQueryData<UserData>(
              queryKeys.getUser(account.jwt),
              result as UserData,
            );

            return {
              user: result as UserData,
              account,
            };
          }),
        ),
      };
    },
  );
};

import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { LemmyHttp } from "lemmy-js-client";

import { useAccountsStore } from "../../hooks";
import { ScreenType, type StackNavigatorParamList } from "../types";

type AddAccountRequestBody = {
  instanceUrl: string;
  username: string;
  password: string;
};

export const useAddAccountMutation = (): UseMutationResult<
  unknown,
  unknown,
  AddAccountRequestBody
> => {
  const { addAccount } = useAccountsStore();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParamList, ScreenType.Accounts>
    >();

  return useMutation<unknown, unknown, AddAccountRequestBody>(
    ["addAccount"],
    async ({ instanceUrl, username, password }) => {
      const http = new LemmyHttp(instanceUrl);
      const { jwt } = await http.login({
        username_or_email: username,
        password,
      });

      if (!jwt) {
        throw new Error("Invalid login");
      }

      const result = await http.getPersonDetails({
        username: `${username}@${instanceUrl.replace("https://", "")}`,
      });

      addAccount({ jwt, user: result.person_view.person });
    },
    {
      onSuccess: () => {
        navigation.navigate(ScreenType.Accounts);
      },
    },
  );
};

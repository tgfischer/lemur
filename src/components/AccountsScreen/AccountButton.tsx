import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "native-base";

import { type AccountData, type UserData } from "../../types";
import { ScreenType, type StackNavigatorParamList } from "../types";

export * from "./AddAccountHeaderButton";

type AccountButtonProps = {
  account: AccountData;
  user: UserData;
};

export const AccountButton = ({
  account,
  user,
}: AccountButtonProps): JSX.Element => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParamList, ScreenType.Posts>
    >();

  return (
    <Button
      onPress={() => {
        navigation.navigate(ScreenType.Posts, {
          listingType: "Subscribed",
          sort: "TopDay",
          account,
        });
      }}
    >
      {user.my_user.local_user_view.person.actor_id.replace("https://", "")}
    </Button>
  );
};

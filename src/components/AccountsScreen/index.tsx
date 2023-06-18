import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Button, Column } from "native-base";

import { useAccounts } from "../../hooks";
import { ScreenType, type StackNavigatorParamList } from "../types";

export * from "./AddAccountHeaderButton";

export const AccountsScreen = (): JSX.Element => {
  const accounts = useAccounts();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorParamList, ScreenType.Posts>
    >();

  return (
    <ScrollView padding={3}>
      <Column space={2}>
        {accounts.map((account) => (
          <Button
            key={account.user.actor_id}
            onPress={() => {
              navigation.navigate(ScreenType.Posts, {
                instanceUrl: "https://lemmy.ca",
                listingType: "Subscribed",
                sort: "TopDay",
                account,
              });
            }}
          >
            {account.user.actor_id.replace("https://", "")}
          </Button>
        ))}
      </Column>
    </ScrollView>
  );
};

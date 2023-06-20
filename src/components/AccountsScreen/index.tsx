import { ScrollView, Column, Row } from "native-base";
import { ActivityIndicator } from "react-native";

import { useUsersQuery } from "../../api";
import { useAccounts } from "../../hooks";

import { AccountButton } from "./AccountButton";

export * from "./AddAccountHeaderButton";

export const AccountsScreen = (): JSX.Element => {
  const accounts = useAccounts();

  const { data } = useUsersQuery({ accounts });

  if (!data) {
    return (
      <Row p={2} justifyContent="center">
        <ActivityIndicator />
      </Row>
    );
  }

  return (
    <ScrollView padding={3}>
      <Column space={2}>
        {data.users.map(({ user, account }) => (
          <AccountButton
            key={user.my_user.local_user_view.person.actor_id}
            user={user}
            account={account}
          />
        ))}
      </Column>
    </ScrollView>
  );
};

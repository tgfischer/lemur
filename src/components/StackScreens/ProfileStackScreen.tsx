import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileScreen } from "../ProfileScreen";
import { ScreenType } from "../types";

const ProfileStack = createNativeStackNavigator();

export const ProfileStackScreen = (): JSX.Element => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name={ScreenType.Posts} component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

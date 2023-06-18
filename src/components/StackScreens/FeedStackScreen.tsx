import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AccountsScreen, AddAccountHeaderButton } from "../AccountsScreen";
import { AddAccountScreen } from "../AddAccountScreen";
import { PostScreen } from "../PostScreen";
import { PostsListScreen, PostsListHeaderSortButton } from "../PostsListScreen";
import { ScreenType, type StackNavigatorParamList } from "../types";

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const Tabs = createBottomTabNavigator();

export const TabsNavigator = (): JSX.Element => (
  <Tabs.Navigator
    initialRouteName={ScreenType.PostsStack}
    screenOptions={{ headerShown: false }}
  >
    <Tabs.Screen
      name={ScreenType.PostsStack}
      component={StackNavigator}
      options={{
        title: "Feed",
        tabBarIcon: (props) => <Ionicons {...props} name="ios-home" />,
      }}
    />
  </Tabs.Navigator>
);

export const StackNavigator = (): JSX.Element => (
  <Stack.Navigator initialRouteName={ScreenType.Accounts}>
    <Stack.Screen
      name={ScreenType.Accounts}
      component={AccountsScreen}
      options={{ headerRight: AddAccountHeaderButton }}
    />
    <Stack.Screen name={ScreenType.AddAccount} component={AddAccountScreen} />
    <Stack.Screen
      name={ScreenType.Posts}
      component={PostsListScreen}
      options={({ route }) => ({
        headerRight: PostsListHeaderSortButton,
        title: route.params.listingType,
      })}
    />
    <Stack.Screen
      name={ScreenType.Post}
      component={PostScreen}
      options={({ route }) => ({
        title: `${route.params.view.counts.comments} Comments`,
      })}
    />
  </Stack.Navigator>
);

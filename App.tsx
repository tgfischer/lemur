import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";

import {
  FeedStackScreen,
  ProfileStackScreen,
} from "./src/components/StackScreens";
import { colorModeManager, theme } from "./src/theme";

const Tabs = createBottomTabNavigator();

const queryClient = new QueryClient();

const navigationTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.dark["50"],
    primary: theme.colors.darkBlue["500"],
    card: theme.colors.dark["100"],
    text: theme.colors.white,
    border: theme.colors.dark["50"],
  },
};

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContainer theme={navigationTheme}>
        <Tabs.Navigator
          initialRouteName="Feed"
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen
            name="Feed"
            component={FeedStackScreen}
            options={{
              title: "Feed",
              tabBarIcon: (props) => <Ionicons {...props} name="ios-home" />,
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              title: "Profile",
              tabBarIcon: (props) => (
                <Ionicons {...props} name="ios-person-outline" />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  </QueryClientProvider>
);

export default App;

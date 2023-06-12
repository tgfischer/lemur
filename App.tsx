import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";

import { FeedStackScreen } from "./src/components/FeedStackScreen";
import { colorModeManager, theme } from "./src/theme";

const Tabs = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContainer>
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
        </Tabs.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  </QueryClientProvider>
);

export default App;

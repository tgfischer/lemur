import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";

import { PostsStackScreen } from "./src/components/PostsStackScreen";
import { colorModeManager, theme } from "./src/theme";

const Tabs = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContainer>
        <Tabs.Navigator
          initialRouteName="Posts"
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen
            name="Posts"
            component={PostsStackScreen}
            options={{
              title: "Posts",
              tabBarIcon: (props) => <Ionicons {...props} name="ios-home" />,
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  </QueryClientProvider>
);

export default App;

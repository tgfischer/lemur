import {
  NavigationContainer,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";

import { TabsNavigator } from "./src/components/StackScreens";
import { colorModeManager, theme } from "./src/theme";

const queryClient = new QueryClient();

const navigationTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.dark["50"],
    primary: theme.colors.primary["300"],
    card: theme.colors.dark["100"],
    text: theme.colors.white,
    border: theme.colors.dark["50"],
  },
};

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContainer theme={navigationTheme}>
        <TabsNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  </QueryClientProvider>
);

export default App;

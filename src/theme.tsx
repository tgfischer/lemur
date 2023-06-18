import AsyncStorage from "@react-native-async-storage/async-storage";
import { type StorageManager, type ColorMode, extendTheme } from "native-base";

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
  fontSizes: {
    sm: 16,
    md: 19,
  },
  colors: {
    primary: {
      "50": "#bed7ff",
      "100": "#87b4fd",
      "200": "#5794f5",
      "300": "#2c74e8",
      "400": "#1658c5",
      "500": "#1a4d9f",
      "600": "#1c417c",
      "700": "#1b345c",
      "800": "#17263f",
      "900": "#101824",
    },
  },
});

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem("@color-mode");
      return val === "light" ? "light" : "dark";
    } catch (e) {
      return "dark";
    }
  },
  set: (value: ColorMode) => {
    if (!value) {
      return;
    }

    try {
      void AsyncStorage.setItem("@color-mode", value);
    } catch (e) {
      console.log(e);
    }
  },
};

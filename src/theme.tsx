import AsyncStorage from "@react-native-async-storage/async-storage";
import { type StorageManager, type ColorMode, extendTheme } from "native-base";

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
  fontSizes: {
    sm: 15,
    md: 17,
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

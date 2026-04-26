import { AppProvider } from "@contexts/AppProvider";
import { RootNavigator } from "@navigation/RootNavigator";
import {
  DarkTheme as NavDarkTheme,
  NavigationContainer,
  DefaultTheme as NavLightTheme,
} from "@react-navigation/native";
import Storage from "@services/storage";
import { useTheme } from "@theme";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function ThemedNavigation() {
  const { resolvedTheme, colors } = useTheme();

  const navTheme =
    resolvedTheme === "dark"
      ? {
          ...NavDarkTheme,
          colors: {
            ...NavDarkTheme.colors,
            background: colors.background,
            card: colors.surface,
            text: colors.text,
            primary: colors.primary,
            border: colors.border,
          },
        }
      : {
          ...NavLightTheme,
          colors: {
            ...NavLightTheme.colors,
            background: colors.background,
            card: colors.surface,
            text: colors.text,
            primary: colors.primary,
            border: colors.border,
          },
        };

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function AppContent() {
  const { colors, resolvedTheme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={resolvedTheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.statusBar}
      />
      <ThemedNavigation />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider storage={Storage}>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;

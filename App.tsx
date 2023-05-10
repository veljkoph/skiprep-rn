import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import i18n from "./language/i18n";
export default function App() {
  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    "Lexend-ExtraLight": require("./fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Light": require("./fonts/Lexend-Light.ttf"),
    "Lexend-Medium": require("./fonts/Lexend-Medium.ttf"),
    "Lexend-Regular": require("./fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("./fonts/Lexend-SemiBold.ttf"),
    "Lexend-Bold": require("./fonts/Lexend-Bold.ttf"),
    "Lexend-Black": require("./fonts/Lexend-Black.ttf"),
  });
  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>
            <RootNavigation />
          </I18nextProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

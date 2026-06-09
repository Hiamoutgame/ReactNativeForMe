import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GluestackUIProvider } from "@/common/components/ui/gluestack-ui-provider";
import { todoPalette } from "@/constants/todo";
import "@/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: todoPalette.primary },
            headerTintColor: todoPalette.white,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
            contentStyle: { backgroundColor: todoPalette.backgroundWhite },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add" options={{ title: "Add Task" }} />
          <Stack.Screen name="edit/[id]" options={{ title: "Edit Task" }} />
        </Stack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

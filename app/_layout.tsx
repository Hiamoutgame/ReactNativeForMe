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
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: todoPalette.paper },
            headerTintColor: todoPalette.ink,
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: "900",
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Asm1 SE193308 TodoList" }} />
        </Stack>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

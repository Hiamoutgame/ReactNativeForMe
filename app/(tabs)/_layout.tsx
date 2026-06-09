import { todoPalette } from "@/constants/todo";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { Pressable } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: todoPalette.primary,
                tabBarInactiveTintColor: todoPalette.textLight,
                tabBarStyle: {
                    backgroundColor: todoPalette.backgroundWhite,
                    borderTopWidth: 1,
                    borderTopColor: todoPalette.line,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                headerStyle: {
                    backgroundColor: todoPalette.primary,
                },
                headerTintColor: todoPalette.white,
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
                headerShadowVisible: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "TODO APP",
                    tabBarLabel: "All",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            style={{ marginRight: 16 }}
                            onPress={() => console.log("Calendar pressed")}
                        >
                            <Ionicons name="calendar-outline" size={24} color={todoPalette.white} />
                        </Pressable>
                    ),
                }}
            />
            <Tabs.Screen
                name="complete"
                options={{
                    title: "Completed Task",
                    tabBarLabel: "Completed",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark" size={size} color={color} />
                    ),
                    headerLeft: () => (
                        <Pressable
                            style={{ marginLeft: 16 }}
                            onPress={() => router.push("/(tabs)")}
                        >
                            <Ionicons name="arrow-back" size={24} color={todoPalette.white} />
                        </Pressable>
                    ),
                }}
            />
        </Tabs>
    );
}

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { todoPalette, todoRadius } from "@/constants/todo";

export function EmptyTodoState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconShell}>
        <Ionicons name="calendar-outline" size={28} color={todoPalette.primary} />
      </View>
      <Text style={styles.title}>No tasks yet</Text>
      <Text style={styles.description}>
        Add your first task and it will stay here after you reopen the app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: todoRadius.lg,
    backgroundColor: todoPalette.panel,
    paddingHorizontal: 24,
    paddingVertical: 34,
  },
  iconShell: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: todoPalette.primarySoft,
  },
  title: {
    color: todoPalette.ink,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 14,
  },
  description: {
    color: todoPalette.muted,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    marginTop: 6,
    maxWidth: 260,
    textAlign: "center",
  },
});

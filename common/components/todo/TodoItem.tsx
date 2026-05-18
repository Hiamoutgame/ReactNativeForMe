import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Todo, todoPalette, todoRadius } from "@/constants/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        todo.completed && styles.completedCard,
        pressed && styles.pressed,
      ]}
      onPress={() => onToggle(todo.id)}
    >
      <View
        style={[styles.checkbox, todo.completed && styles.checkedCheckbox]}
      >
        {todo.completed ? (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        ) : null}
      </View>

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={[styles.title, todo.completed && styles.completedTitle]}
        >
          {todo.title}
        </Text>
        <Text style={styles.meta}>
          {todo.completed ? "Completed" : "Tap to complete"}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.iconButton,
            styles.editButton,
            pressed && styles.actionPressed,
          ]}
          onPress={(event) => {
            event.stopPropagation();
            onEdit(todo);
          }}
        >
          <Ionicons name="pencil" size={17} color={todoPalette.accent} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.iconButton,
            styles.deleteButton,
            pressed && styles.actionPressed,
          ]}
          onPress={(event) => {
            event.stopPropagation();
            onDelete(todo.id);
          }}
        >
          <Ionicons name="trash-outline" size={17} color={todoPalette.danger} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 82,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: todoRadius.md,
    backgroundColor: todoPalette.panel,
    padding: 14,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: todoPalette.successSoft,
    borderColor: "#C7DEC3",
  },
  checkbox: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: todoPalette.line,
    borderRadius: 14,
    backgroundColor: todoPalette.panel,
  },
  checkedCheckbox: {
    borderColor: todoPalette.success,
    backgroundColor: todoPalette.success,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  title: {
    color: todoPalette.ink,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
  },
  completedTitle: {
    color: todoPalette.muted,
    textDecorationLine: "line-through",
  },
  meta: {
    color: todoPalette.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: todoRadius.sm,
  },
  editButton: {
    backgroundColor: todoPalette.accentSoft,
  },
  deleteButton: {
    backgroundColor: todoPalette.dangerSoft,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  actionPressed: {
    opacity: 0.74,
  },
});

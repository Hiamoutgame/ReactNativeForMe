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
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      onPress={() => onToggle(todo.id)}
    >
      <View style={styles.card}>
        <View style={styles.content}>
          <Text
            numberOfLines={1}
            style={[styles.title, todo.completed && styles.completedTitle]}
          >
            {todo.title}
          </Text>
          {todo.detail ? (
             <Text numberOfLines={1} style={styles.detail}>
               {todo.detail}
             </Text>
          ) : null}
        </View>

        {/* Hành động ở bên phải */}
        <View style={styles.actions}>
          <Pressable
            hitSlop={8}
            onPress={(event) => {
              event.stopPropagation();
              onEdit(todo);
            }}
          >
            <Ionicons name="pencil-outline" size={20} color={todoPalette.primary} />
          </Pressable>

          <Pressable
            hitSlop={8}
            onPress={(event) => {
              event.stopPropagation();
              onDelete(todo.id);
            }}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={todoPalette.primary}
            />
          </Pressable>
          
          <Pressable
            hitSlop={8}
            onPress={(event) => {
              event.stopPropagation();
              onToggle(todo.id);
            }}
          >
            <Ionicons
              name={todo.completed ? "checkmark-circle" : "checkmark-circle-outline"}
              size={22}
              color={todoPalette.primary}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: todoRadius.md,
    backgroundColor: todoPalette.backgroundWhite,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  card: {
    minHeight: 70,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    borderRadius: todoRadius.md,
    padding: 16,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 4,
    justifyContent: "center",
  },
  title: {
    color: todoPalette.primary, // Design màu tím cho title
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  completedTitle: {
    color: todoPalette.textLight,
    textDecorationLine: "line-through",
  },
  detail: {
    color: todoPalette.textLight, // Xám nhạt
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});

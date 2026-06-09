import React from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { useTodos } from "@/shared/hooks/useTodos";
import { todoPalette, todoRadius } from "@/constants/todo";

export default function CompletedTasksPage() {
  const { todos, isLoading } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.center}>
              <ActivityIndicator color={todoPalette.primary} />
            </View>
          ) : (
            <View style={styles.center}>
               <Text style={styles.emptyText}>No completed tasks</Text>
            </View>
          )
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            {item.detail ? (
              <Text numberOfLines={1} style={styles.detail}>
                {item.detail}
              </Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: todoPalette.backgroundLight,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  separator: {
    height: 16,
  },
  center: {
    paddingVertical: 36,
    alignItems: "center",
  },
  emptyText: {
    color: todoPalette.textLight,
    fontSize: 14,
  },
  card: {
    minHeight: 70,
    justifyContent: "center",
    backgroundColor: todoPalette.backgroundWhite,
    borderRadius: todoRadius.md,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    color: todoPalette.primary, // Theo ảnh màn Complete thì title có màu tím
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  detail: {
    color: todoPalette.textDark, // Chữ detail màu đen (theo thiết kế ở Home thì màu nhạt, ở completed có vẻ đen nhạt)
    fontSize: 13,
  },
});

import { useMemo, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  EmptyTodoState,
  TodoItem,
  TodoSummary,
} from "@/common/components/todo";
import { Todo, todoPalette, todoRadius } from "@/constants/todo";
import { useTodos } from "@/shared/hooks/useTodos";

import HomeLayout from "./Layout";

export default function Page() {
  const {
    todos,
    completedCount,
    remainingCount,
    isLoading,
    updateTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  function handleEdit(todo: Todo) {
    // Navigate to edit screen with ID when implemented, for now just use add flow.
    // Assuming you have an edit screen or will have one
    router.push(`/edit/${todo.id}`);
  }

  function handleDelete(id: string) {
    deleteTodo(id);
  }

  return (
    <HomeLayout>
      <View style={styles.container}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.loadingState}>
                <ActivityIndicator color={todoPalette.primary} />
                <Text style={styles.loadingText}>Loading tasks...</Text>
              </View>
            ) : (
              <EmptyTodoState />
            )
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={toggleTodo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        />
        
        {/* FAB (+) button */}
        <Pressable
          style={({ pressed }) => [
            styles.fab,
            pressed && styles.fabPressed,
          ]}
          onPress={() => router.push("/add")}
        >
          <Ionicons name="add" size={32} color={todoPalette.white} />
        </Pressable>
      </View>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: todoPalette.backgroundLight,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 100, // Make room for FAB
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  separator: {
    height: 16,
  },
  loadingState: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 36,
  },
  loadingText: {
    color: todoPalette.textLight,
    fontSize: 14,
    fontWeight: "700",
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: todoRadius.lg, // Use lg radius (28 or 32 for fully rounded)
    backgroundColor: todoPalette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});

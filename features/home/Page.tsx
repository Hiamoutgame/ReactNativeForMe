import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  EmptyTodoState,
  TodoComposer,
  TodoItem,
  TodoSummary,
} from "@/common/components/todo";
import { Todo, todoPalette } from "@/constants/todo";
import { useTodos } from "@/shared/hooks/useTodos";

import HomeLayout from "./Layout";

export default function Page() {
  const {
    todos,
    completedCount,
    remainingCount,
    isLoading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const [draft, setDraft] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const editingTodo = useMemo(
    () => todos.find((todo) => todo.id === editingTodoId),
    [editingTodoId, todos]
  );

  function resetComposer() {
    setDraft("");
    setEditingTodoId(null);
  }

  function handleSubmit() {
    if (editingTodoId) {
      updateTodo(editingTodoId, draft);
      resetComposer();
      return;
    }

    addTodo(draft);
    setDraft("");
  }

  function handleEdit(todo: Todo) {
    setEditingTodoId(todo.id);
    setDraft(todo.title);
  }

  function handleDelete(id: string) {
    deleteTodo(id);
    if (editingTodoId === id) {
      resetComposer();
    }
  }

  return (
    <HomeLayout>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <TodoSummary
              totalCount={todos.length}
              completedCount={completedCount}
              remainingCount={remainingCount}
            />

            <TodoComposer
              value={draft}
              isEditing={Boolean(editingTodo)}
              onChangeText={setDraft}
              onSubmit={handleSubmit}
              onCancelEdit={resetComposer}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today</Text>
              <Text style={styles.sectionMeta}>
                {remainingCount} open tasks
              </Text>
            </View>
          </View>
        }
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
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: 28,
    paddingTop: 16,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: todoPalette.ink,
    fontSize: 20,
    fontWeight: "900",
  },
  sectionMeta: {
    color: todoPalette.muted,
    fontSize: 13,
    fontWeight: "800",
  },
  separator: {
    height: 12,
  },
  loadingState: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 36,
  },
  loadingText: {
    color: todoPalette.muted,
    fontSize: 14,
    fontWeight: "700",
  },
});

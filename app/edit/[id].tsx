import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Todo, TODO_STORAGE_KEY, todoPalette } from "@/constants/todo";

export default function EditTodoPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTodo() {
      try {
        const storedValue = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        if (storedValue) {
          const todos = JSON.parse(storedValue) as Todo[];
          const todoToEdit = todos.find((t) => t.id === id);
          if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDetail(todoToEdit.detail || "");
          }
        }
      } catch (error) {
        console.warn("Failed to load todo", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTodo();
  }, [id]);

  async function handleUpdate() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const storedValue = await AsyncStorage.getItem(TODO_STORAGE_KEY);
      if (storedValue) {
        const todos = JSON.parse(storedValue) as Todo[];
        const updatedTodos = todos.map((todo) =>
          todo.id === id
            ? { ...todo, title: trimmedTitle, detail: detail.trim() }
            : todo
        );
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodos));
      }
      router.replace("/(tabs)");
    } catch (error) {
      console.warn("Failed to save todo", error);
      setIsSaving(false);
    }
  }

  function handleCancel() {
    router.back();
  }

  if (isLoading) {
    return (
      <View style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={todoPalette.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              placeholder=""
              returnKeyType="next"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <Text style={styles.label}>Detail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder=""
              returnKeyType="done"
              style={styles.input}
              value={detail}
              onChangeText={setDetail}
              onSubmitEditing={handleUpdate}
            />
          </View>

          <View style={styles.actionsContainer}>
            <View style={styles.buttonWrapper}>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                  pressed && styles.pressed,
                ]}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>{isSaving ? "Updating" : "Update"}</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                  pressed && styles.pressed,
                ]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: todoPalette.backgroundWhite,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: todoPalette.backgroundWhite,
    padding: 20,
    paddingTop: 40,
  },
  label: {
    color: todoPalette.textLight,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 24,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    minHeight: 40,
    color: todoPalette.textDark,
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 40,
  },
  buttonWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: 8,
    padding: 12,
    backgroundColor: todoPalette.primary,
    alignItems: "center",
  },
  buttonText: {
    color: todoPalette.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});

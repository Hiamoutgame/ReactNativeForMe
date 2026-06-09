import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
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

export default function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const storedValue = await AsyncStorage.getItem(TODO_STORAGE_KEY);
      const storedTodos = storedValue ? (JSON.parse(storedValue) as Todo[]) : [];
      const currentTodos = Array.isArray(storedTodos) ? storedTodos : [];

      const nextTodo: Todo = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: trimmedTitle,
        detail: detail.trim(),
        completed: false,
        createdAt: Date.now(),
      };

      await AsyncStorage.setItem(
        TODO_STORAGE_KEY,
        JSON.stringify([nextTodo, ...currentTodos]),
      );

      router.replace("/(tabs)");
    } catch (error) {
      console.warn("Can not save todo to Async Storage", error);
      setIsSaving(false);
    }
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
          {/* Nhãn giả lập Title như trong ảnh */}
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

          {/* Nhãn giả lập Detail như trong ảnh */}
          <Text style={styles.label}>Detail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder=""
              returnKeyType="done"
              style={styles.input}
              value={detail}
              onChangeText={setDetail}
              onSubmitEditing={handleSave}
            />
          </View>

          {/* Nút ADD nằm trong card container */}
          <View style={styles.buttonContainer}>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                pressed && styles.pressed,
              ]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>{isSaving ? "SAVING..." : "ADD"}</Text>
            </Pressable>
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
  buttonContainer: {
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: 8,
    padding: 12,
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    backgroundColor: todoPalette.primary,
  },
  saveText: {
    color: todoPalette.white,
    fontSize: 16,
    justifyContent: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});

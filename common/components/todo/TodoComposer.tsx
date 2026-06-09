import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { todoPalette, todoRadius } from "@/constants/todo";

type TodoComposerProps = {
  value: string;
  isEditing: boolean;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
};

export function TodoComposer({
  value,
  isEditing,
  onChangeText,
  onSubmit,
  onCancelEdit,
}: TodoComposerProps) {
  return (

    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.submitButton,
          isEditing && styles.editButton,
          pressed && styles.pressed,
        ]}
        onPress={onSubmit}
      >
        <Ionicons
          name={isEditing ? "checkmark" : "add"}
          size={20}
          color="#4F252E"
        />
        <Text style={styles.submitText}>{isEditing ? "Edit" : "Add"}</Text>
      </Pressable>



      <View style={styles.actions}>
        {isEditing ? (
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.iconButton,
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
            onPress={onCancelEdit}
          >
            <Ionicons name="close" size={20} color={todoPalette.danger} />
          </Pressable>
        ) : null}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 22,
  },
  inputShell: {
    minHeight: 56,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: todoRadius.md,
    backgroundColor: todoPalette.panel,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    minHeight: 54,
    color: todoPalette.ink,
    fontSize: 16,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  submitButton: {
    minHeight: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderRadius: todoRadius.md,
    backgroundColor: todoPalette.primary,
  },
  editButton: {
    backgroundColor: todoPalette.accent,
  },
  iconButton: {
    width: 50,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: todoRadius.md,
  },
  cancelButton: {
    backgroundColor: todoPalette.dangerSoft,
  },
  submitText: {
    color: "#4F252E",
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
});

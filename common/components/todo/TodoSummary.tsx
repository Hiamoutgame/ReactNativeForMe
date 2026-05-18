import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { todoPalette, todoRadius } from "@/constants/todo";

type TodoSummaryProps = {
  totalCount: number;
  completedCount: number;
  remainingCount: number;
};

export function TodoSummary({
  totalCount,
  completedCount,
  remainingCount,
}: TodoSummaryProps) {
  const progressLabel =
    totalCount === 0
      ? "0%"
      : `${Math.round((completedCount / totalCount) * 100)}%`;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Assignment 1</Text>
          <Text style={styles.title}>Todo List</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="sparkles-outline" size={16} color={todoPalette.ink} />
          <Text style={styles.badgeText}>{progressLabel}</Text>
        </View>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{remainingCount}</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedCount}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: todoPalette.line,
    borderRadius: todoRadius.lg,
    backgroundColor: todoPalette.panel,
    padding: 18,
    marginBottom: 18,
  },
  headerRow: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 14,
  },
  eyebrow: {
    color: todoPalette.accent,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    color: todoPalette.ink,
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
  },
  badge: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    borderRadius: todoRadius.sm,
    backgroundColor: todoPalette.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  badgeText: {
    color: todoPalette.ink,
    fontSize: 13,
    fontWeight: "900",
  },
  statGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  statItem: {
    flex: 1,
    borderRadius: todoRadius.md,
    backgroundColor: todoPalette.paper,
    padding: 12,
  },
  statValue: {
    color: todoPalette.ink,
    fontSize: 22,
    fontWeight: "900",
  },
  statLabel: {
    color: todoPalette.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
    textTransform: "uppercase",
  },
});

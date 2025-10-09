import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEntries } from "../../context/EntriesContext";
import { formatDisplayDate } from "../../utils/dateUtils";
import { theme } from "../../theme";

export default function HistoryScreen() {
  const { entries } = useEntries();

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique</Text>
      <FlatList
        data={sortedEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{formatDisplayDate(item.date)}</Text>
            <Text style={styles.value}>{item.value}/5</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
    display: "flex",
    alignItems :"center",
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
  },
  date: {
    color: theme.colors.subtleText,
        padding: theme.spacing.md,
  },
  value: {
    fontWeight: "bold",
    color: theme.colors.primary,
        padding: theme.spacing.md,
  },
});

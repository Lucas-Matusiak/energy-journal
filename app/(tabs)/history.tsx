import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEntries } from "../../context/EntriesContext";
import { formatDisplayDate } from "../../utils/dateUtils";

export default function HistoryScreen() {
  const { entries } = useEntries();

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Historique :</Text>
      <FlatList
        data={sortedEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {formatDisplayDate(item.date)} → {item.value}/5
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "600",
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
});

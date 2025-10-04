import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEntries } from "../../context/EntriesContext";

export default function HistoryScreen() {
  const { entries } = useEntries();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Historique :</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.date} → {item.value}/5</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  subtitle: { fontSize: 18, marginVertical: 10 },
});

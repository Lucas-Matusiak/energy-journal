import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("entries");
        if (jsonValue != null) {
          setEntries(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Erreur chargement :", e);
      }
    };
    loadEntries();
  }, []);

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

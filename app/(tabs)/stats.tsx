import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEntries } from "../../context/EntriesContext"; 

export default function StatsScreen() {
  const { entries } = useEntries();

  if (!entries || entries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Statistiques</Text>
        <Text style={styles.empty}>Aucune donnée pour le moment 📭</Text>
      </View>
    );
  }
  console.log(entries);
  const total = entries.length;
  const avg = entries.reduce((acc, e) => acc + (e.value || 0), 0) / total;

  const high = entries.filter((e) => e.value >= 4).length;
  const low = entries.filter((e) => e.value <= 2).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ton énergie 🧠</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Moyenne</Text>
        <Text style={styles.value}>{avg.toFixed(1)}/5</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{total}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Énergie basse</Text>
          <Text style={[styles.statValue, { color: "#e74c3c" }]}>{low}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Énergie haute</Text>
          <Text style={[styles.statValue, { color: "#27ae60" }]}>{high}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "90%",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    color: "#6366F1",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statBox: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  empty: {
    fontSize: 16,
    color: "#9CA3AF",
  },
});

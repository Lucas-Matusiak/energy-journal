import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEntries } from "../../context/EntriesContext";
import { formatShortLabel } from "../../utils/dateUtils";

export default function StatsScreen() {
  const { entries } = useEntries();

  // Trie les entrées par date (plus ancien → plus récent)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const last7 = sortedEntries.slice(-7);
  const data = last7.map((e) => e.value);
  const average =
    data.length > 0
      ? (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)
      : "–";

  const best = data.length ? Math.max(...data) : null;
  const worst = data.length ? Math.min(...data) : null;
  const labels = last7.map((e) => formatShortLabel(e.date));
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Statistiques</Text>

      <Text style={{ marginTop: 10 }}>Moyenne : {average}</Text>
      {best !== null && <Text>Meilleur jour : {best}</Text>}
      {worst !== null && <Text>Pire jour : {worst}</Text>}

      {data.length >= 2 ? (
        <LineChart
          data={{
            labels,
            datasets: [{ data }],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            marginVertical: 20,
            borderRadius: 10,
          }}
        />
      ) : (
        <Text style={{ marginTop: 20, color: "gray" }}>
          Pas encore assez de données pour afficher une courbe.
        </Text>
      )}
    </ScrollView>
  );
}

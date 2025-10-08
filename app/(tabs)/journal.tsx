import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useEntries } from "../../context/EntriesContext";

export default function JournalScreen() {
  const { addOrUpdateEntry } = useEntries();
  const [energy, setEnergy] = useState(3);
const [saved, setSaved] = useState(false);
  const getEnergyFeedback = () => {
    if (energy <= 1) return "Fatigué 😴";
    if (energy <= 2) return "Bof 🫤";
    if (energy <= 3) return "Moyen 😐";
    if (energy <= 4) return "En forme 🙂";
    return "Énergique 💥";
  };
  const getEnergyColor = () => {
    if (energy <= 1) return "#FF6B6B"; // rouge
    if (energy <= 2) return "#ff9b3dff";
    if (energy <= 3) return "#FFD93D"; // jaune
    if (energy <= 4) return "#6BCB77"; // vert clair
    return "#4CAF50"; // vert vif
  };
  const handleSave = () => {
    addOrUpdateEntry(energy);
    setSaved(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Ton niveau d’énergie du jour :</Text>
      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={energy}
        onValueChange={(val) => setEnergy(val)}
        minimumTrackTintColor={getEnergyColor()}
        maximumTrackTintColor="#ddd"
      />
      <Text style={styles.energyText}>Énergie : {energy}/5</Text>
      <Button title="Sauvegarder" onPress={handleSave} />
      {saved && <Text style={{ color: "green" }}>Sauvegardé ✅</Text>}
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Text style={{ fontSize: 18 }}>{getEnergyFeedback()}</Text>
      </View>
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
  subtitle: { fontSize: 18, marginVertical: 10 },
  energyText: { marginTop: 15, fontSize: 18, fontWeight: "600" },
});
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function JournalScreen() {
  const [energy, setEnergy] = useState(3);
  const [entries, setEntries] = useState<any[]>([]);

  const saveEntries = async (newEntries: any[]) => {
    try {
      const jsonValue = JSON.stringify(newEntries);
      await AsyncStorage.setItem("entries", jsonValue);
    } catch (e) {
      console.error("Erreur sauvegarde :", e);
    }
  };

  const handleSave = () => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      value: energy,
    };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    saveEntries(newEntries);
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
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#ddd"
      />
      <Text style={styles.energyText}>Énergie : {energy}/5</Text>
      <Button title="Sauvegarder" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  subtitle: { fontSize: 18, marginVertical: 10 },
  energyText: { marginTop: 15, fontSize: 18, fontWeight: "600" },
});

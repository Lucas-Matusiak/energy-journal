import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import Slider from "@react-native-community/slider";
import { useEntries } from "../../context/EntriesContext";
import { theme } from "../../theme";

export default function JournalScreen() {
  const { addOrUpdateEntry } = useEntries();
  const [energy, setEnergy] = useState(3);
  const [saved, setSaved] = useState(false);
  const [scale] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));

  const getEnergyFeedback = () => {
    if (energy <= 1) return "😴";
    if (energy <= 2) return "🫤";
    if (energy <= 3) return "😐";
    if (energy <= 4) return "🙂";
    return "💥";
  };

  const getEnergyColor = () => {
    if (energy <= 1) return "#FF6B6B";
    if (energy <= 2) return "#ff9b3dff";
    if (energy <= 3) return "#FFD93D";
    if (energy <= 4) return "#6BCB77";
    return "#4CAF50";
  };

  const handleSave = () => {
    addOrUpdateEntry(energy);
    setSaved(true);

    // animation du bouton (rebond)
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();

    // animation du message de sauvegarde (fade in/out)
    fadeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setSaved(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon énergie du jour</Text>

      <Text style={[styles.energyText, { color: getEnergyColor() }]}>
        {energy}/5
      </Text>
      <Text style={styles.feedback}>{getEnergyFeedback()}</Text>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={energy}
        onValueChange={(val) => setEnergy(val)}
        minimumTrackTintColor={getEnergyColor()}
        maximumTrackTintColor="#ddd"
        thumbTintColor={getEnergyColor()}
      />

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={() =>
            Animated.spring(scale, {
              toValue: 0.95,
              useNativeDriver: true,
            }).start()
          }
          onPressOut={() =>
            Animated.spring(scale, {
              toValue: 1,
              friction: 3,
              useNativeDriver: true,
            }).start()
          }
          onPress={handleSave}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.buttonText}>Enregistrer</Text>
        </Pressable>
      </Animated.View>

      {saved && (
        <Animated.View style={[styles.savedContainer, { opacity: fadeAnim }]}>
          <Text style={styles.savedText}>Sauvegardé ✅</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  energyText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 4,
  },
  feedback: {
    fontSize: 18,
    marginBottom: typeof theme.spacing.md === "number" ? theme.spacing.md : 0,
  },
  slider: {
    width: "80%",
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
},
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  savedContainer: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  savedText: {
    color: "white",
    fontWeight: "600",
  },
});

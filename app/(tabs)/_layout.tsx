import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { EntriesProvider } from "../../context/EntriesContext";

export default function TabLayout() {
  return (
    <EntriesProvider>
      <Tabs
      
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "help-circle";
            if (route.name === "journal") iconName = "book-outline";
            else if (route.name === "history") iconName = "time-outline";
            else if (route.name === "stats") iconName = "stats-chart-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* ordre : journal, history, stats */}
        <Tabs.Screen name="journal" options={{ title: "Journal" }} />
        <Tabs.Screen name="history" options={{ title: "Historique" }} />
        <Tabs.Screen name="stats" options={{ title: "Stats" }} />
      </Tabs>
    </EntriesProvider>
  );
}

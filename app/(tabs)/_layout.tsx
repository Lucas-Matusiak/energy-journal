import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help-circle";

          if (route.name === "journal") {
            iconName = "book-outline"; // Journal
          } else if (route.name === "history") {
            iconName = "time-outline"; // Historique
          } else if (route.name === "stats") {
            iconName = "stats-chart-outline"; // Stats
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="journal"
        options={{ title: "Journal" }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: "Historique" }}
      />
      <Tabs.Screen
        name="stats"
        options={{ title: "Stats" }}
      />
    </Tabs>
  );
}

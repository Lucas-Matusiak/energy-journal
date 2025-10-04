import { Redirect } from "expo-router";
import React from 'react';

export default function Index() {
  // On redirige directement vers l’onglet "journal"
  return <Redirect href="/(tabs)/journal" />;
}

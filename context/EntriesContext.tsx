import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Entry = {
  id: string;
  date: string;
  value: number;
};

type EntriesContextType = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  addOrUpdateEntry: (value: number) => void; // 👈 nouvelle méthode
};

const EntriesContext = createContext<EntriesContextType>({
  entries: [],
  setEntries: () => { },
  addOrUpdateEntry: ()=>{},
});

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("entries");
        if (jsonValue) setEntries(JSON.parse(jsonValue));
      } catch (e) {
        console.error("Erreur de chargement :", e);
      }
    };
    loadEntries();
  }, []);

  useEffect(() => {
    const saveEntries = async () => {
      try {
        await AsyncStorage.setItem("entries", JSON.stringify(entries));
      } catch (e) {
        console.error("Erreur de sauvegarde :", e);
      }
    };
    if (entries.length) saveEntries();
  }, [entries]);

  const addOrUpdateEntry = (value: number) => {
    const today = new Date().toISOString().split("T")[0];
    setEntries((prev) => {
      const existing = prev.find((e) => e.date === today);
      if (existing) {
        // mise à jour de la valeur du jour
        return prev.map((e) => (e.date === today ? { ...e, value } : e));
      } else {
        // nouvelle entrée
        return [...prev, { id: Math.random().toString(), date: today, value }];
      }
    });
  };

  return (
    <EntriesContext.Provider value={{ entries, setEntries,addOrUpdateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => useContext(EntriesContext);

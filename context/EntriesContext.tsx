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
};

const EntriesContext = createContext<EntriesContextType>({
  entries: [],
  setEntries: () => {},
});

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => useContext(EntriesContext);

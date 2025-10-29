import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Entry = {
  energyLevel: number;
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
  setEntries: () => {},
  addOrUpdateEntry: () => {},
});

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  // helper de normalisation
  const normalizeDateString = (dateStr: string) => {
    if (!dateStr) return dateStr;

    // déjà ISO YYYY-MM-DD ?
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    // si format DD/MM/YYYY ou D/M/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split("/");
      const dd = d.padStart(2, "0");
      const mm = m.padStart(2, "0");
      return `${y}-${mm}-${dd}`; // YYYY-MM-DD
    }

    // fallback : essayer de parser (peut échouer selon la plateforme)
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }

    // si on ne sait pas, renvoyer tel quel
    return dateStr;
  };

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("entries");
        if (!jsonValue) return;

        const raw = JSON.parse(jsonValue) as Entry[];
        const normalized = raw.map((e) => ({
          ...e,
          date: normalizeDateString(e.date),
        }));

        setEntries(normalized);

        // réécrire si on a modifié le format (utile une seule fois pour migrer)
        if (JSON.stringify(normalized) !== jsonValue) {
          await AsyncStorage.setItem("entries", JSON.stringify(normalized));
        }
      } catch (e) {
        console.error("Erreur de chargement :", e);
      }
    };
    loadEntries();
  }, []);
  const addOrUpdateEntry = (value: number) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    setEntries((prev) => {
      const existing = prev.find((e) => e.date === today);
      if (existing) {
        return prev.map((e) => (e.date === today ? { ...e, value } : e));
      } else {
        return [...prev, { id: Math.random().toString(), date: today, value }];
      }
    });
  };

  return (
    <EntriesContext.Provider value={{ entries, setEntries, addOrUpdateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => useContext(EntriesContext);

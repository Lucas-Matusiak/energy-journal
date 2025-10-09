// src/utils/dateUtils.ts

/**
 * Formate une date ISO (YYYY-MM-DD) ou autre en format lisible.
 * Par défaut : "DD/MM/YYYY"
 */
export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";

  // Si format ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }

  // Si déjà au format français
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    return dateStr;
  }

  // Sinon on tente un parse
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("fr-FR");
  }

  return dateStr;
};

/**
 * Formate une date courte pour les labels (stats, graphiques, etc.)
 * Par défaut : "DD-MM"
 */
export const formatShortLabel = (dateStr: string): string => {
  if (!dateStr) return "";

  // Format ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}`;
  }

  // Format français
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    const [d, m] = dateStr.split("/");
    return `${d.padStart(2, "0")}-${m.padStart(2, "0")}`;
  }

  // Fallback
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed
      .toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
      .replace("/", "-");
  }

  return dateStr;
};

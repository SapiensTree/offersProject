/**
 * Campañas y fechas para los temas.
 *
 * Edita aquí los meses/días que quieras para cada campaña.
 * Un rango que cruza de año (ej. Navidad: dic -> ene) funciona correctamente.
 */

/**
 * CAMPAÑA MANUAL
 * Pon aquí el id del tema que quieras activo y la lógica de fechas se ignora.
 * Ids válidos: "default", "navidad", "reyes", "rebajas-invierno",
 * "san-valentin", "carnaval", "semana-santa", "dia-madre", "dia-padre",
 * "verano", "halloween", "black-friday", "cyber-monday".
 * Deja en null para que se use la lógica automática por fechas de abajo.
 */
export const MANUAL_THEME: string | null = "verano";

export interface Campaign {
  id: string;
  label: string;
  icon: string;
  start: { month: number; day: number };
  end: { month: number; day: number };
}

export const CAMPAIGNS: Campaign[] = [
  { id: "navidad", label: "Navidad", icon: "🎄", start: { month: 12, day: 1 }, end: { month: 1, day: 6 } },
  { id: "reyes", label: "Reyes Magos", icon: "👑", start: { month: 1, day: 5 }, end: { month: 1, day: 6 } },
  { id: "rebajas-invierno", label: "Rebajas de Invierno", icon: "❄️", start: { month: 1, day: 7 }, end: { month: 2, day: 15 } },
  { id: "san-valentin", label: "San Valentín", icon: "💖", start: { month: 2, day: 10 }, end: { month: 2, day: 14 } },
  { id: "carnaval", label: "Carnaval", icon: "🎭", start: { month: 2, day: 20 }, end: { month: 3, day: 10 } },
  { id: "dia-padre", label: "Día del Padre", icon: "👔", start: { month: 3, day: 15 }, end: { month: 3, day: 19 } },
  { id: "semana-santa", label: "Semana Santa", icon: "🕊️", start: { month: 3, day: 25 }, end: { month: 4, day: 5 } },
  { id: "dia-madre", label: "Día de la Madre", icon: "🌸", start: { month: 5, day: 1 }, end: { month: 5, day: 10 } },
  { id: "verano", label: "Verano", icon: "☀️", start: { month: 6, day: 21 }, end: { month: 9, day: 15 } },
  { id: "halloween", label: "Halloween", icon: "🎃", start: { month: 10, day: 20 }, end: { month: 11, day: 1 } },
  { id: "black-friday", label: "Black Friday", icon: "🖤", start: { month: 11, day: 24 }, end: { month: 12, day: 2 } },
  { id: "cyber-monday", label: "Cyber Monday", icon: "⚡", start: { month: 11, day: 27 }, end: { month: 12, day: 3 } },
];

function dayValue(month: number, day: number): number {
  return month * 100 + day;
}

export function isDateInCampaign(date: Date, campaign: Campaign): boolean {
  const value = dayValue(date.getMonth() + 1, date.getDate());
  const start = dayValue(campaign.start.month, campaign.start.day);
  const end = dayValue(campaign.end.month, campaign.end.day);

  if (start <= end) {
    return value >= start && value <= end;
  }
  return value >= start || value <= end;
}

export function getActiveCampaign(date: Date): Campaign | null {
  if (MANUAL_THEME) {
    return CAMPAIGNS.find((campaign) => campaign.id === MANUAL_THEME) ?? null;
  }
  for (const campaign of CAMPAIGNS) {
    if (isDateInCampaign(date, campaign)) return campaign;
  }
  return null;
}

export function getThemeForDate(date: Date): string {
  if (MANUAL_THEME) return MANUAL_THEME;
  return getActiveCampaign(date)?.id ?? "default";
}

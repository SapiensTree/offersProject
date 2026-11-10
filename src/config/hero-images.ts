/**
 * Imágenes flotantes del hero por tema.
 *
 * CÓMO USARLO:
 * 1. Guarda tus imágenes en `public/themes/<tema>/` (ej. public/themes/navidad/).
 * 2. Añade aquí los nombres de los archivos que quieras mostrar.
 * 3. Cuantas más imágenes añadas, más "cosas" flotarán (hasta 6 posiciones definidas).
 *
 * Temas disponibles: default, navidad, reyes, rebajas-invierno, san-valentin,
 * carnaval, semana-santa, dia-madre, dia-padre, verano, halloween,
 * black-friday, cyber-monday.
 */

export const HERO_IMAGES: Record<string, string[]> = {
  default: [],
  navidad: ["1.png", "2.png", "3.png"],
  reyes: ["1.png", "2.png", "3.png"],
  "rebajas-invierno": ["1.png", "2.png", "3.png"],
  "san-valentin": ["1.png", "2.png", "3.png"],
  carnaval: ["1.png", "2.png", "3.png"],
  "semana-santa": ["1.png", "2.png", "3.png"],
  "dia-madre": ["1.png", "2.png", "3.png"],
  "dia-padre": ["1.png", "2.png", "3.png"],
  verano: ["1.png", "2.png", "3.png"],
  halloween: ["1.png", "2.png", "3.png"],
  "black-friday": ["1.png", "2.png", "3.png"],
  "cyber-monday": ["1.png", "2.png", "3.png"],
};

export function getHeroImages(themeId: string): string[] {
  const files = HERO_IMAGES[themeId] ?? [];
  return files.map((file) => `/themes/${themeId}/${file}`);
}

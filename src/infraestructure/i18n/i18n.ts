import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import enCommon from './locales/en/common.json';

const FALLBACK_LANG = 'en';

const resources: Record<string, { common: typeof enCommon }> = {
    en: { common: enCommon },
}

const langFiles: Record<string, () => Promise<{ default: typeof enCommon }>> = {
    es: () => import("./locales/es/common.json"),
    pt: () => import("./locales/pt/common.json"),
}

async function ensureLang(lng: string): Promise<boolean> {
    const code = lng.split('-')[0];
    if (resources[code] || !langFiles[code]) return true;
    try {
        const mod = await langFiles[code]();
        resources[code] = { common: mod.default };
        i18n.addResourceBundle(code, "common", mod.default)

        return true;
    } catch {
        return false
    }

}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: FALLBACK_LANG,
        defaultNS: "common",
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        }
    });

const detected = i18n.language?.split("-")[0] ?? FALLBACK_LANG;
if (detected !== FALLBACK_LANG) {
    void (async () => {
        const stillCurrent = () => i18n.language?.split("-")[0] == detected;
        if (!langFiles[detected]) {
            await i18n.changeLanguage(FALLBACK_LANG);
            return;
        }

        const loaded = await ensureLang(detected);

        if (!loaded && stillCurrent()) {
            await i18n.changeLanguage(FALLBACK_LANG);
        } else if (loaded && stillCurrent() && i18n.resolvedLanguage !== detected) {
            await i18n.changeLanguage(detected)
        }
    })();
}


i18n.on("languageChanged", (lng) => void ensureLang(lng));


export async function changeLanguage(code: string) {
    const loaded = await ensureLang(code);
    if (!loaded && code !== i18n.language) return;
    await i18n.changeLanguage(code);
}

export default i18n


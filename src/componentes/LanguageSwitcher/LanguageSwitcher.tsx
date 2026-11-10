"use client";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.scss";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { changeLanguage } from "@/infraestructure/i18n/i18n";

const emptySubscribe = () => () => {};

const FLAGS: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  pt: "🇵🇹",
  /*fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  pt: "🇵🇹",*/
};

const AVAILABLE_LANGUAGES = ["en", "es", "pt"];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const currentCode = mounted
    ? (i18n.language ?? i18n.resolvedLanguage ?? "en").split("-")[0]
    : "en";

  const getLanguageLabel = (code: string) => {
    const key = `languages.${code}`;

    if (i18n.exists(key)) return t(key);

    try {
      const displayNames = new Intl.DisplayNames([mounted ? i18n.language : "en"], {
        type: "language",
      });
      const name = displayNames.of(code) ?? code;
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch {
      return code.toUpperCase();
    }
  };

  const handleSelectLanguage = async (code: string) => {
    await changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="lang-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        <span className="lang-dropdown__flag" suppressHydrationWarning>
          {FLAGS[currentCode] ?? "🌐"}
        </span>
        <span className="lang-dropdown__label" suppressHydrationWarning>
          {getLanguageLabel(currentCode)}
        </span>
        <span className={`lang-dropdown__arrow ${isOpen ? "open" : ""}`}>
          ▾
        </span>{" "}
      </button>

      {isOpen && (
        <ul className="lang-dropdown__menu">
          {AVAILABLE_LANGUAGES.map((code) => {
            const isActive = code === currentCode;
            return (
              <li key={code}>
                <button
                  type="button"
                  className={`lang-dropdown__item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectLanguage(code)}
                >
                  <span className="lang-dropdown__flag">
                    {FLAGS[code] ?? "🌐"}
                  </span>
                  <span className="lang-dropdown__label">
                    {getLanguageLabel(code)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

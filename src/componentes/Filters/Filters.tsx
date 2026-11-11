"use client";
import { useTranslation } from "react-i18next";
import "./Filters.scss";
import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { id: "all", key: "filter.all" },
  { id: "technology", key: "filter.technology" },
  { id: "fashion", key: "filter.fashion" },
  { id: "homeAndKitchen", key: "filter.homeAndKitchen" },
  { id: "sports", key: "filter.sports" },
  { id: "beauty", key: "filter.beauty" },
];
const MORECATEGORIES = [
  { id: "gaming", key: "Gaming" },
  { id: "automotive", key: "Motor" },
  { id: "books", key: "Libros" },
  { id: "toys", key: "Juguetes" },
];

export default function Filters() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMoreCategory = (id: string) => {
    setSelectedCategory(id);
    setIsOpen(false);
  };
  return (
    <div className="container-filters">
      <div className="container-filters__options">
        <div className="container-filters__option">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`container-filters__button ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {t(cat.key)}
            </button>
          ))}
        </div>
        <div className="container-filters__sorting" ref={dropdownRef}>
          <button
            type="button"
            className={`container-filters__sorting-trigger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>{t("filter.moreCategories")}</span>
            <span className={`arrow ${isOpen ? "open" : ""}`}>▾</span>
          </button>
          {isOpen && (
            <div className="container-filters__sorting-menu">
              {MORECATEGORIES.map((morcat) => (
                <button
                  type="button"
                  key={morcat.id}
                  className={`container-filters__sorting-item ${
                    selectedCategory === morcat.id ? "active" : ""
                  }`}
                  onClick={() => handleSelectMoreCategory(morcat.id)}
                >
                  {morcat.key}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

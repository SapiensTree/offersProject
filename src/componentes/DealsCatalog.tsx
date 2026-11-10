"use client";

import { useState } from "react";
import { PublicDeal } from "@/core/domain/deal";
import { Category } from "@/core/domain/category";
import DealDetailModal from "./DealDetailModal";

const DEAL_TYPE_LABEL: Record<string, string> = {
  annual: "Anual",
  lifetime: "De por vida",
  one_time: "Pago único",
};

export default function DealsCatalog({
  deals,
  categories,
  searchQuery = "",
}: {
  deals: PublicDeal[];
  categories: Category[];
  searchQuery?: string;
}) {
  const [selectedDeal, setSelectedDeal] = useState<PublicDeal | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const query = searchQuery.trim().toLowerCase();

  const visibleDeals = deals.filter((deal) => {
    const matchesCategory =
      activeCategory === "all" || deal.categorySlug === activeCategory;
    const matchesQuery =
      !query ||
      deal.name.toLowerCase().includes(query) ||
      (deal.tagline || "").toLowerCase().includes(query) ||
      (deal.description || "").toLowerCase().includes(query) ||
      (deal.categoryName || "").toLowerCase().includes(query) ||
      (deal.discountCode || "").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`filter-pill${activeCategory === "all" ? " is-active" : ""}`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={`filter-pill${activeCategory === category.slug ? " is-active" : ""}`}
              style={
                activeCategory === category.slug
                  ? { borderColor: category.colorAccent, color: category.colorAccent }
                  : undefined
              }
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="deal-list">
        {visibleDeals.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] text-center py-10">
            {query
              ? `No hay ofertas que coincidan con "${searchQuery.trim()}".`
              : "No hay ofertas en esta categoría."}
          </p>
        )}

        {visibleDeals.map((deal) => {
          const categoryStyle = {
            color: deal.categoryAccentColor || "var(--badge-text)",
            borderColor: deal.categoryAccentColor || "var(--badge-border)",
            backgroundColor: `${deal.categoryAccentColor || "#f59e0b"}22`,
          };

          return (
            <div
              key={deal.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedDeal(deal)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedDeal(deal);
                }
              }}
              className={`deal-row${deal.isFeatured ? " is-featured" : ""}`}
            >
              <div className="deal-ribbon">
                <span>{deal.discountLabel}</span>
              </div>

              <div className="deal-row-body">
                <div className="deal-row-head">
                  <h3 className="deal-row-title">{deal.name}</h3>
                  <span className="category-tag" style={categoryStyle}>
                    {deal.categoryName || "General"}
                  </span>
                </div>

                <p className="deal-row-tagline">{deal.tagline}</p>

                <div className="deal-row-meta">
                  {deal.discountCode ? (
                    <span className="deal-row-code">
                      Código: <b>{deal.discountCode}</b>
                    </span>
                  ) : (
                    <span className="deal-row-code">Sin código</span>
                  )}
                  <span className="deal-row-type">
                    {DEAL_TYPE_LABEL[deal.dealType] ?? deal.dealType}
                  </span>
                  {deal.isFeatured && <span className="deal-row-featured">★ Destacada</span>}
                </div>
              </div>

              <div className="deal-row-cta">
                <a
                  href={`/go/${deal.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-primary-theme btn-sm"
                >
                  Ver oferta →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <DealDetailModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
    </>
  );
}

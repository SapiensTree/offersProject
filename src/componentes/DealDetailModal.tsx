"use client";

import { useEffect, useRef, useState } from "react";
import { PublicDeal } from "@/core/domain/deal";

const DEAL_TYPE_LABEL: Record<string, string> = {
  annual: "Suscripción anual",
  lifetime: "De por vida",
  one_time: "Pago único",
};

export default function DealDetailModal({
  deal,
  onClose,
}: {
  deal: PublicDeal | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!deal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [deal, onClose]);

  if (!deal) return null;

  const categoryStyle = {
    color: deal.categoryAccentColor || "var(--badge-text)",
    borderColor: deal.categoryAccentColor || "var(--badge-border)",
    backgroundColor: `${deal.categoryAccentColor || "#f59e0b"}22`,
  };

  const handleCopyCode = async () => {
    if (!deal.discountCode) return;
    try {
      await navigator.clipboard.writeText(deal.discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div className="modal-panel" role="dialog" aria-modal="true" aria-label={deal.name}>
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="modal-head">
          <span className="category-tag" style={categoryStyle}>
            {deal.categoryName || "General"}
          </span>
          <span className="badge-theme">{deal.discountLabel}</span>
        </div>

        <h2 className="modal-title">{deal.name}</h2>
        <span className="modal-discount">{deal.discountLabel}</span>

        <p className="modal-description">{deal.description || deal.tagline}</p>

        <div className="modal-info-list">
          <div className="modal-info-row">
            <span className="modal-info-label">Tipo de oferta</span>
            <span className="modal-info-value">
              {DEAL_TYPE_LABEL[deal.dealType] ?? deal.dealType}
            </span>
          </div>
          <div className="modal-info-row">
            <span className="modal-info-label">Categoría</span>
            <span className="modal-info-value">{deal.categoryName || "General"}</span>
          </div>
          <div className="modal-info-row">
            <span className="modal-info-label">Código de descuento</span>
            {deal.discountCode ? (
              <button
                type="button"
                className="modal-code-copy"
                onClick={handleCopyCode}
                aria-label="Copiar código"
              >
                {deal.discountCode} {copied ? "✓" : "⧉"}
              </button>
            ) : (
              <span className="modal-info-value">Sin código</span>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary-theme btn-sm" onClick={onClose}>
            Cerrar
          </button>
          <a
            href={`/go/${deal.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-theme btn-sm"
          >
            Ir a la oferta →
          </a>
        </div>
      </div>
    </div>
  );
}

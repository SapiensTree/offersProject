"use client";

import { useEffect, useRef, useState } from "react";
import "./AdCard.scss";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdCardProps {
  adSlot?: string;
  channel?: "whatsapp" | "telegram";
}

export default function AdCard({
  adSlot = "5522595677",
  channel = "whatsapp",
}: AdCardProps) {
  const [isFallback, setIsFallback] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setIsFallback(true);
    }

    const observer = new MutationObserver(() => {
      if (insRef.current?.getAttribute("data-ad-status") === "unfilled") {
        setIsFallback(true);
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, {
        attributes: true,
        attributeFilter: ["data-ad-status"],
      });
    }

    const timer = setTimeout(() => {
      if (
        !insRef.current?.hasChildNodes() ||
        insRef.current?.getAttribute("data-ad-status") === "unfilled"
      ) {
        setIsFallback(true);
      }
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const isWhatsapp = channel === "whatsapp";

  return (
    <div
      className={`ad-card ${
        isFallback
          ? isWhatsapp
            ? "ad-card--whatsapp"
            : "ad-card--telegram"
          : ""
      }`}
    >
      <span className="ad-card__label">
        {isFallback
          ? isWhatsapp
            ? "Canal WhatsApp"
            : "Canal Telegram"
          : "Publicidad"}
      </span>

      {/* 1. Anuncio de Google AdSense */}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: isFallback ? "none" : "block", width: "100%" }}
        data-ad-client="ca-pub-AQUÍ_TU_ID_CLIENTE"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {isFallback && (
        <div className="ad-card__fallback">
          <i
            className={`bi ${isWhatsapp ? "bi-whatsapp" : "bi-telegram"} ad-card__watermark`}
          />

          <div className="ad-card__fallback-info">
            <span
              className={`ad-card__fallback-badge ${
                isWhatsapp
                  ? "ad-card__fallback-badge--whatsapp"
                  : "ad-card__fallback-badge--telegram"
              }`}
            >
              <i
                className={`bi ${isWhatsapp ? "bi-whatsapp" : "bi-telegram"}`}
              />{" "}
              {isWhatsapp ? "Alertas en WhatsApp" : "Alertas en Telegram"}
            </span>

            <h3 className="ad-card__fallback-title">
              {isWhatsapp
                ? "¡Únete a nuestro canal oficial de WhatsApp!"
                : "¡Únete a nuestro canal oficial de Telegram!"}
            </h3>

            <p className="ad-card__fallback-desc">
              {isWhatsapp
                ? "Recibe las mejores ofertas, chollos y cupones directamente en tus chats sin spam."
                : "Notificaciones instantáneas de precios mínimos históricos y chollos al segundo."}
            </p>
          </div>

          <div className="ad-card__fallback-actions">
            {isWhatsapp ? (
              <a
                href="https://whatsapp.com/channel/tu_canal"
                target="_blank"
                rel="noopener noreferrer"
                className="ad-card__fallback-btn ad-card__fallback-btn--whatsapp"
              >
                <i className="bi bi-whatsapp" /> Abrir WhatsApp
              </a>
            ) : (
              <a
                href="https://t.me/tu_canal"
                target="_blank"
                rel="noopener noreferrer"
                className="ad-card__fallback-btn ad-card__fallback-btn--telegram"
              >
                <i className="bi bi-telegram" /> Unirme a Telegram
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

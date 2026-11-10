import type { CSSProperties } from "react";
import { Campaign } from "@/config/campaigns";
import { getHeroImages } from "@/config/hero-images";

interface HeroProps {
  campaign: Campaign | null;
  dealCount: number;
  categoryCount: number;
  featuredCount: number;
}

export default function Hero({
  campaign,
  dealCount,
  categoryCount,
  featuredCount,
}: HeroProps) {
  const label = campaign ? campaign.label : "Ofertas de temporada";
  const highlight = campaign ? "Descuentos exclusivos" : "Ahorra en grande";
  const subtitle = campaign
    ? `Vive la ${campaign.label.toLowerCase()} con descuentos exclusivos. Las mejores ofertas, seleccionadas a mano para ti.`
    : "Las mejores ofertas de la temporada, seleccionadas a mano para ti.";

  const heroImages = getHeroImages(campaign?.id ?? "default");

  return (
    <section className="hero">
      {campaign && (
        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-marquee-track">
            {[0, 1].map((k) => (
              <span key={k}>
                {campaign.icon} {campaign.label} · Ofertas seleccionadas a mano · Hasta -80% ·
                Descuentos de temporada ·{" "}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="hero-deco" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>

      {heroImages.length > 0 && (
        <div className="hero-floats" aria-hidden="true">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className="hero-float"
              style={{ "--i": i } as CSSProperties}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ))}
        </div>
      )}

      <div className="hero-inner">
        <span className="hero-badge">
          {campaign ? `${campaign.icon} ${campaign.label}` : "✨ Ofertas de temporada"}
        </span>

        <h1 className="hero-title">
          <span className="hero-title-line">{label}</span>
          <span className="hero-title-accent">{highlight}</span>
        </h1>

        <p className="hero-subtitle">{subtitle}</p>

        <div className="hero-cta">
          <a href="#ofertas" className="btn-primary-theme">
            Ver ofertas →
          </a>
          <a href="#ofertas" className="btn-secondary-theme">
            Explorar categorías
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <b>{dealCount}</b>
            <span>Ofertas</span>
          </div>
          <div className="hero-stat">
            <b>{categoryCount}</b>
            <span>Categorías</span>
          </div>
          {featuredCount > 0 && (
            <div className="hero-stat">
              <b>{featuredCount}</b>
              <span>Destacadas</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

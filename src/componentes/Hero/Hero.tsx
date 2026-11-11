"use client";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import "./Hero.scss";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="container-hero">
      <div className="hero-information">
        <h1 className="hero-information__title">
          {t("hero.title").toUpperCase()}
        </h1>
        <span className="hero-information__description">
          {t("hero.description")}
        </span>
        <button className="hero-information__button">
          <span className="hero-information__button__text">
            {t("hero.button-text")}
          </span>
        </button>
      </div>
      <div className="hero-products">
        <div className="hero-products__container-products">
          <Image
            src="/Products/Auriculares.png"
            alt="Auriculares"
            width={250}
            height={250}
            className="hero-products__product"
          />
          <Image
            src="/Products/Cafetera.png"
            alt="Cafetera"
            width={250}
            height={250}
            className="hero-products__product"
          />
          <Image
            src="/Products/Smartwatch.png"
            alt="SmartWatch"
            width={250}
            height={250}
            className="hero-products__product"
          />
        </div>
      </div>
    </div>
  );
}

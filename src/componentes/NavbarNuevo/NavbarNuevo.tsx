"use client";
import "./NavbarNuevo.scss";
import Image from "next/image";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function NavbarNuevo() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="nav-contenedor">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          loading="eager"
        />
        <ul className="list">
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/coupons">{t("nav.coupons")}</Link>
          <Link href="/category">{t("nav.categories")}</Link>
          <Link href="/forum">{t("nav.forum")}</Link>
        </ul>

        <div className="search">
          <input
            className="search-input"
            type="search"
            placeholder={t("nav.search")}
          />
          <button className="btn" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div className="acciones">
          <LanguageSwitcher />

          <button className="btn" type="submit">
            <i className="bi bi-person-circle"></i>
          </button>
          <button className="btn" type="submit">
            <i className="bi bi-heart-fill heart"></i>
          </button>
          <button className="btn" type="submit">
            <i className="bi bi-cart3 carrito">
              <span className="notificacion"></span>
            </i>
          </button>
        </div>
      </div>
    </nav>
  );
}

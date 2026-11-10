import type { CSSProperties } from "react";
import type { RecordModel } from "pocketbase";
import Link from "next/link";
import { Campaign } from "@/config/campaigns";

type AuthMode = "login" | "register";

export default function Navbar({
  campaign,
  user,
  searchQuery,
  onSearchChange,
  onOpenAuth,
  onLogout,
}: {
  campaign: Campaign | null;
  user: RecordModel | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenAuth: (mode: AuthMode) => void;
  onLogout: () => void;
}) {
  const userName =
    (user as { name?: string } | null)?.name ||
    (user as { email?: string } | null)?.email ||
    "Usuario";

  return (
    <nav className="navbar">
      <div className="nav-deco" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>

      <div className="navbar-row">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-dot" />
          Deals ST
        </Link>

        <div className="navbar-links">
          <Link href="/" className="nav-link">
            Inicio
          </Link>
          <a href="#ofertas" className="nav-link">
            Ofertas
          </a>
          <a href="#ofertas" className="nav-link">
            Categorías
          </a>
        </div>

        <div className="navbar-search">
          <input
            type="search"
            className="input-theme navbar-search-input"
            placeholder="Buscar ofertas…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar ofertas"
          />
        </div>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="nav-user">
                <span className="nav-user-dot" />
                {userName}
              </span>
              <button
                type="button"
                className="btn-secondary-theme btn-sm"
                onClick={onLogout}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn-secondary-theme btn-sm"
                onClick={() => onOpenAuth("login")}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className="btn-primary-theme btn-sm"
                onClick={() => onOpenAuth("register")}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

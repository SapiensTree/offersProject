"use client";

import { useState } from "react";
import { getPublicClient } from "@/lib/pocketbase-client";

export default function AuthModal({
  mode,
  onClose,
  onSwitchMode,
}: {
  mode: "login" | "register";
  onClose: () => void;
  onSwitchMode: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const pb = getPublicClient();

      if (isLogin) {
        await pb.collection("users").authWithPassword(email, password);
      } else {
        await pb.collection("users").create({
          email,
          password,
          passwordConfirm: password,
          name: name || email.split("@")[0],
        });
        await pb.collection("users").authWithPassword(email, password);
      }

      onClose();
    } catch (err: unknown) {
      const message =
        (err as { response?: { message?: string } })?.response?.message ??
        (err as Error)?.message ??
        "Ha ocurrido un error. Inténtalo de nuevo.";
      setError(message);
    } finally {
      setLoading(false);
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
      <form className="modal-panel auth-panel" onSubmit={handleSubmit} role="dialog" aria-modal="true">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <h2 className="modal-title">{isLogin ? "Iniciar sesión" : "Crear cuenta"}</h2>

        {!isLogin && (
          <input
            type="text"
            className="input-theme auth-input"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          className="input-theme auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="input-theme auth-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="btn-primary-theme auth-submit" disabled={loading}>
          {loading ? "Un momento…" : isLogin ? "Entrar" : "Registrarse"}
        </button>

        <p className="auth-hint">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button type="button" className="auth-switch" onClick={onSwitchMode}>
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </form>
    </div>
  );
}

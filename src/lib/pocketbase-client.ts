"use client";

import PocketBase from "pocketbase";

let instance: PocketBase | null = null;

/**
 * Cliente público de PocketBase para el navegador (login/registro).
 * La sesión se guarda automáticamente en localStorage por el SDK.
 */
export function getPublicClient(): PocketBase {
  if (!instance) {
    instance = new PocketBase(
      process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"
    );
  }
  return instance;
}

"use client";

import { useSyncExternalStore } from "react";
import type { RecordModel } from "pocketbase";
import { getPublicClient } from "./pocketbase-client";

/**
 * El getter `authStore.model` de PocketBase lee y parsea localStorage en cada
 * llamada, por lo que devuelve un objeto nuevo cada vez. Para que
 * `useSyncExternalStore` no entre en bucle, cacheamos la referencia y solo
 * cambiamos cuando el id del usuario (o su ausencia) cambia de verdad.
 */
let cachedUser: RecordModel | null = null;

function getAuthSnapshot(): RecordModel | null {
  const pb = getPublicClient();
  const model = pb.authStore.isValid ? (pb.authStore.model as RecordModel) : null;

  if (!model) {
    cachedUser = null;
    return null;
  }

  if (cachedUser && cachedUser.id === model.id) {
    return cachedUser;
  }

  cachedUser = model;
  return cachedUser;
}

export function useAuthUser(): RecordModel | null {
  const pb = getPublicClient();

  return useSyncExternalStore(
    (callback) => pb.authStore.onChange(callback),
    getAuthSnapshot,
    () => null
  );
}

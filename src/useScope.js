import { fork, serialize } from "effector";
import { useMemo } from "react";

let scope;

if (typeof window !== "undefined") {
  console.info("scope", scope);
}

function initializeScope(initialData) {
  const _scope =
    scope ??
    fork({
      values: {
        ...(scope ? serialize(scope, { onlyChanges: true }) : {}),
        ...initialData
      }
    });

  // For SSG and SSR always create a new scope
  if (typeof window === "undefined") return _scope;
  // Create the scope once in the client
  if (!scope) scope = _scope;

  return _scope;
}

export function useScope(initialState) {
  return useMemo(() => initializeScope(initialState), [initialState]);
}

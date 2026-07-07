import { useMemo } from "react";

export function useMotionPreference() {
  return useMemo(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
}


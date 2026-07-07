import { useMemo } from "react";
import { getTelegramTheme, initTelegramWebApp } from "../services/telegramService.js";

export function useTelegramWebApp() {
  return useMemo(() => {
    const telegram = initTelegramWebApp();
    return {
      colorScheme: getTelegramTheme(),
      telegram,
    };
  }, []);
}


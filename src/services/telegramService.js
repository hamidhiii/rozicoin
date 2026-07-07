export function getTelegramWebApp() {
  return window.Telegram?.WebApp;
}

export function initTelegramWebApp() {
  const telegram = getTelegramWebApp();
  telegram?.ready?.();
  telegram?.expand?.();
  return telegram;
}

export function impact(style = "light") {
  getTelegramWebApp()?.HapticFeedback?.impactOccurred?.(style);
}

export function getTelegramTheme() {
  return getTelegramWebApp()?.colorScheme;
}


import { useCallback, useEffect, useMemo, useState } from "react";
import { amountPreset } from "../services/walletService.js";
import { impact } from "../services/telegramService.js";
import { useMotionPreference } from "./useMotionPreference.js";
import { useTelegramWebApp } from "./useTelegramWebApp.js";

const introSeen = () => sessionStorage.getItem("rozicoin-intro-seen") === "true";
const themeKey = "rozicoin-theme-v2";

export function useAppController(screenRegistry) {
  const motionEnabled = useMotionPreference();
  const { colorScheme } = useTelegramWebApp();

  const [state, setState] = useState(() => ({
    screen: "splash",
    theme: localStorage.getItem(themeKey) || colorScheme || "dark",
    passcodeLength: 0,
    documentType: "Passport",
    network: "TRON",
    token: "USDT",
    sendAmount: "245.00",
    sendRecipient: "TX7a...9Qm2",
    toast: "",
    riskAccepted: false,
    motionEnabled,
    showIntro: !introSeen() && motionEnabled,
  }));

  useEffect(() => {
    setState((current) => ({
      ...current,
      motionEnabled,
      showIntro: motionEnabled ? current.showIntro : false,
    }));
  }, [motionEnabled]);

  const dismissIntro = useCallback(() => {
    sessionStorage.setItem("rozicoin-intro-seen", "true");
    setState((current) => ({ ...current, showIntro: false }));
  }, []);

  useEffect(() => {
    if (!state.showIntro || !state.motionEnabled) return undefined;
    const timer = window.setTimeout(dismissIntro, 3200);
    return () => window.clearTimeout(timer);
  }, [dismissIntro, state.motionEnabled, state.showIntro]);

  const goTo = useCallback((screen, extra = {}) => {
    impact("light");
    setState((current) => ({
      ...current,
      ...extra,
      screen,
      toast: extra.toast ?? "",
    }));
  }, []);

  const goBack = useCallback(() => {
    impact("soft");
    setState((current) => {
      const screen = screenRegistry[current.screen];
      if (!screen?.back) return current;
      return { ...current, screen: screen.back, toast: "" };
    });
  }, [screenRegistry]);

  const goNext = useCallback(() => {
    impact("light");
    setState((current) => {
      const screen = screenRegistry[current.screen];
      if (current.screen === "receive") {
        return { ...current, toast: "Address copied for the demo." };
      }
      if (current.screen === "networkSelector") {
        return {
          ...current,
          screen: screen.next,
          toast: `${current.network} selected.`,
        };
      }
      if (current.screen === "support") {
        return {
          ...current,
          screen: screen.next,
          toast: "Support chat preview opened.",
        };
      }
      if (!screen?.next) return current;
      return { ...current, screen: screen.next, toast: "" };
    });
  }, [screenRegistry]);

  const actions = useMemo(
    () => ({
      clearPin() {
        impact("soft");
        setState((current) => ({ ...current, passcodeLength: 0 }));
      },
      copyAddress() {
        impact("light");
        setState((current) => ({ ...current, toast: "Address copied for the demo." }));
      },
      dismissIntro,
      enterPin() {
        impact("light");
        setState((current) => ({
          ...current,
          passcodeLength: Math.min(4, current.passcodeLength + 1),
        }));
      },
      goBack,
      goNext,
      goTo,
      setAmountPreset(percent) {
        impact("light");
        setState((current) => ({
          ...current,
          sendAmount: amountPreset(percent) || current.sendAmount,
        }));
      },
      setDocumentType(documentType) {
        impact("light");
        setState((current) => ({ ...current, documentType }));
      },
      setNetwork(network) {
        impact("light");
        setState((current) => ({
          ...current,
          network,
          toast: `${network} selected.`,
        }));
      },
      setToken(token) {
        setState((current) => ({ ...current, token }));
      },
      toggleRisk() {
        impact("light");
        setState((current) => ({ ...current, riskAccepted: !current.riskAccepted }));
      },
      toggleTheme() {
        impact("soft");
        setState((current) => {
          const theme = current.theme === "dark" ? "light" : "dark";
          localStorage.setItem(themeKey, theme);
          return { ...current, theme };
        });
      },
    }),
    [dismissIntro, goBack, goNext, goTo],
  );

  return { actions, state };
}

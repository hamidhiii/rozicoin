import { Feature, InfoRow, SwapBox } from "../../components/ui/index.js";
import { CheckCircle2 } from "lucide-react";

export function SwapQuotePage() {
  return (
    <>
      <section className="swap-card">
        <SwapBox label="You pay" amount="250.00" token="USDT" />
        <div className="swap-divider">Swap</div>
        <SwapBox label="You receive" amount="1,941.22" token="TRX" />
      </section>
      <section className="surface-block">
        <InfoRow label="Route" value="USDT -> TRX" />
        <InfoRow label="Rate" value="1 USDT = 7.76 TRX" />
        <InfoRow label="Slippage" value="0.5%" />
        <InfoRow label="Quote expires" value="00:24" />
      </section>
    </>
  );
}

export function SwapConfirmPage() {
  return (
    <>
      <section className="surface-block">
        <h2>Swap 250 USDT to TRX</h2>
        <p className="muted">The demo shows route, fees, and risk copy before signing.</p>
        <InfoRow label="Minimum received" value="1,931.51 TRX" />
        <InfoRow label="Network fee" value="18.20 TRX" />
        <InfoRow label="Provider" value="Rozicoin demo router" />
      </section>
      <section className="surface-block warning">
        <Feature icon="Price">Rates can change before confirmation</Feature>
      </section>
    </>
  );
}

export function SwapSuccessPage() {
  return (
    <>
      <section className="success-panel">
        <span className="icon-badge green">
          <CheckCircle2 size={21} strokeWidth={2.5} />
        </span>
        <h2>1,941.22 TRX received</h2>
        <p>Your wallet balances have been updated in the demo state.</p>
      </section>
      <section className="receipt">
        <InfoRow label="Paid" value="250.00 USDT" />
        <InfoRow label="Received" value="1,941.22 TRX" />
        <InfoRow label="Status" value="Confirmed" />
      </section>
    </>
  );
}

export const swapScreens = {
  swapQuote: {
    title: "Swap",
    eyebrow: "Quote preview",
    mainLabel: "Review swap",
    next: "swapConfirm",
    back: "walletHome",
    Component: SwapQuotePage,
  },
  swapConfirm: {
    title: "Confirm swap",
    eyebrow: "TRON route",
    mainLabel: "Swap now",
    next: "swapSuccess",
    back: "swapQuote",
    Component: SwapConfirmPage,
  },
  swapSuccess: {
    title: "Swap complete",
    eyebrow: "Confirmed",
    mainLabel: "Back to wallet",
    next: "walletHome",
    back: "swapConfirm",
    Component: SwapSuccessPage,
  },
};

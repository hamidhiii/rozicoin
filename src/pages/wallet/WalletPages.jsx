import {
  AssetRow,
  CheckRow,
  Feature,
  InfoRow,
  NetworkOption,
  QuickAction,
  WalletBalance,
  WalletTabs,
} from "../../components/ui/index.js";
import { assets, networks } from "../../services/walletService.js";

function Toast({ message }) {
  return message ? <div className="toast-banner">{message}</div> : null;
}

function QrBlocks() {
  const filledBlocks = [0, 1, 2, 6, 7, 8, 10, 13, 14, 16, 18, 20, 22, 24, 28, 30, 32, 34, 35, 38, 40, 42, 43, 45, 46, 47, 48];
  return (
    <>
      {Array.from({ length: 49 }, (_, index) => (
        <span className={filledBlocks.includes(index) ? "filled" : ""} key={index} />
      ))}
    </>
  );
}

export function WalletLockedPage({ actions }) {
  return (
    <>
      <section className="surface-block locked-card">
        <span className="lock-symbol">LOCK</span>
        <h2>Complete KYC to unlock wallet actions</h2>
        <p>Balance preview is visible, but receive, send, and swap are disabled until review is approved.</p>
      </section>
      <section className="surface-block">
        <Feature icon="View">Read-only asset overview</Feature>
        <Feature icon="KYC">Identity review required for transfers</Feature>
        <Feature icon="Risk">Limits enforced before every payment</Feature>
      </section>
      <WalletTabs actions={actions} active="home" />
    </>
  );
}

export function WalletHomePage({ actions, state }) {
  return (
    <>
      <Toast message={state.toast} />
      <WalletBalance network={state.network} />
      <section className="quick-actions">
        <QuickAction icon="Down" label="Receive" onClick={() => actions.goTo("receive")} />
        <QuickAction icon="Up" label="Send" onClick={() => actions.goTo("sendRecipient")} />
        <QuickAction icon="Swap" label="Swap" onClick={() => actions.goTo("swapQuote")} />
        <QuickAction icon="Grid" label="Network" onClick={() => actions.goTo("networkSelector")} />
      </section>
      <section className="surface-block asset-list">
        <div className="row split">
          <h2>Assets</h2>
          <button className="small-link" onClick={() => actions.goTo("networkSelector")} type="button">
            {state.network}
          </button>
        </div>
        {assets.map((asset) => (
          <AssetRow
            asset={asset}
            key={asset.symbol}
            onOpen={(token) => {
              actions.setToken(token);
              actions.goTo("tokenDetail");
            }}
          />
        ))}
      </section>
      <WalletTabs actions={actions} active="home" />
    </>
  );
}

export function TokenDetailPage({ actions, state }) {
  return (
    <>
      <section className="token-hero">
        <div className="token-mark">{state.token}</div>
        <p>Total balance</p>
        <h2>1,248.40 {state.token}</h2>
        <strong>$1,248.40</strong>
        <div className="mini-chart">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      <section className="quick-actions">
        <QuickAction icon="Down" label="Receive" onClick={() => actions.goTo("receive")} />
        <QuickAction icon="Up" label="Send" onClick={() => actions.goTo("sendRecipient")} />
        <QuickAction icon="Swap" label="Swap" onClick={() => actions.goTo("swapQuote")} />
      </section>
      <section className="surface-block">
        <InfoRow label="Network" value={state.network} />
        <InfoRow label="Contract" value="TR7N...jLj6t" />
        <InfoRow label="Available" value="1,248.40 USDT" />
        <InfoRow label="Pending" value="0.00 USDT" />
      </section>
    </>
  );
}

export function NetworkSelectorPage({ actions, state }) {
  return (
    <>
      <section className="surface-block">
        <h2>Select settlement network</h2>
        <p className="muted">
          TRON is recommended for the demo payment flow because fees are predictable and settlement is fast.
        </p>
        <div className="option-stack network-stack">
          {networks.map((network) => (
            <NetworkOption
              active={state.network === network.name}
              key={network.name}
              onSelect={actions.setNetwork}
              {...network}
            />
          ))}
        </div>
      </section>
      <section className="surface-block compact">
        <CheckRow>Network changes affect receive addresses</CheckRow>
        <CheckRow>Send confirmation repeats the selected network</CheckRow>
      </section>
    </>
  );
}

export function ReceivePage({ actions, state }) {
  return (
    <>
      <Toast message={state.toast} />
      <section className="surface-block center">
        <p className="label">
          Receive {state.token} on {state.network}
        </p>
        <div className="qr-card" aria-label="Demo QR code">
          <QrBlocks />
        </div>
        <code className="address-line">TX7aC2uN9hDemoWallet9Qm2</code>
        <button className="secondary-button" onClick={actions.copyAddress} type="button">
          Copy address
        </button>
      </section>
      <section className="surface-block warning">
        <Feature icon="TRON">Only send TRC20 assets to this address</Feature>
        <Feature icon="Memo">No memo or tag required</Feature>
      </section>
    </>
  );
}

export const walletScreens = {
  walletLocked: {
    title: "Wallet locked",
    eyebrow: "KYC gate",
    mainLabel: "Start verification",
    next: "kycIntro",
    back: "splash",
    Component: WalletLockedPage,
  },
  walletHome: {
    title: "Wallet",
    eyebrow: "Verified client",
    mainLabel: "Receive USDT",
    next: "receive",
    back: "approved",
    Component: WalletHomePage,
  },
  tokenDetail: {
    title: (state) => `${state.token} detail`,
    eyebrow: "Asset",
    mainLabel: "Send token",
    next: "sendRecipient",
    back: "walletHome",
    Component: TokenDetailPage,
  },
  networkSelector: {
    title: "Network",
    eyebrow: "Choose chain",
    mainLabel: "Apply network",
    next: "walletHome",
    back: "walletHome",
    Component: NetworkSelectorPage,
  },
  receive: {
    title: "Receive",
    eyebrow: (state) => `${state.network} address`,
    mainLabel: "Copy address",
    next: "receive",
    back: "walletHome",
    Component: ReceivePage,
  },
};


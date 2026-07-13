import { Consent, Feature, Field } from "../../components/ui/index.js";

export function SplashPage() {
  return (
    <>
      <section className="launch-panel">
        <div className="launch-topline">
          <div className="app-logo">
            <span>R</span>
          </div>
          <span className="status-pill success">Telegram session</span>
        </div>
        <div>
          <p className="label">Client wallet demo</p>
          <h2>Rozicoin Pay</h2>
          <p className="lead">
            TRON payments, USDT transfers, KYC gates, and swap preview in one Mini App flow.
          </p>
        </div>
        <div className="launch-balance">
          <span>Demo portfolio</span>
          <strong>$1,792.12</strong>
          <small>TRON / TRC20 · unlocks after KYC</small>
        </div>
        <div className="launch-actions">
          <span>Receive</span>
          <span>Send</span>
          <span>Swap</span>
          <span>KYC</span>
        </div>
      </section>
      <section className="surface-block launch-session">
        <div className="row split">
          <div>
            <p className="label">Telegram session</p>
            <strong>@demo_client</strong>
          </div>
          <span className="status-pill success">Verified app launch</span>
        </div>
        <div className="divider" />
        <div className="feature-list">
          <Feature icon="Shield">KYC gated wallet access</Feature>
          <Feature icon="TRX">Receive, send, and inspect TRON assets</Feature>
          <Feature icon="USDT">Payment-style checkout confirmation</Feature>
        </div>
      </section>
    </>
  );
}

export function TermsPage({ actions, state }) {
  return (
    <>
      <section className="surface-block">
        <p className="label">Before opening the wallet</p>
        <h2>Confirm the demo terms</h2>
        <div className="consent-list">
          <Consent checked onToggle={actions.toggleRisk}>
            This prototype does not store private keys or move real funds.
          </Consent>
          <Consent checked onToggle={actions.toggleRisk}>
            KYC is required before sending, receiving, swapping, or raising limits.
          </Consent>
          <Consent checked={state.riskAccepted} onToggle={actions.toggleRisk}>
            Telegram account data is used only to prefill the client profile.
          </Consent>
        </div>
      </section>
      <section className="surface-block warning">
        <div className="row">
          <span className="icon-badge amber">!</span>
          <div>
            <strong>Compliance first</strong>
            <p>Wallet actions stay locked until identity review is complete.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function PasscodePage({ actions, state }) {
  return (
    <>
      <section className="surface-block center">
        <span className="icon-badge teal">#</span>
        <h2>Protect this Telegram session</h2>
        <p>Use a 4 digit passcode for local access to the wallet demo.</p>
        <div className="pin-dots">
          {[0, 1, 2, 3].map((dot) => (
            <span className={dot < state.passcodeLength ? "filled" : ""} key={dot} />
          ))}
        </div>
        <div className="number-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={actions.enterPin} type="button">
              {num}
            </button>
          ))}
          <button onClick={actions.clearPin} type="button">
            Clear
          </button>
          <button onClick={actions.enterPin} type="button">
            0
          </button>
          <button onClick={actions.goNext} type="button">
            OK
          </button>
        </div>
      </section>
      <button className="text-action" onClick={() => actions.goTo("restore")} type="button">
        Restore existing wallet
      </button>
    </>
  );
}

export function RestorePage() {
  return (
    <>
      <section className="surface-block">
        <h2>Import read-only demo profile</h2>
        <p className="muted">
          Use this page when the client already has a wallet record connected to Telegram.
        </p>
        <div className="seed-grid">
          {Array.from({ length: 12 }, (_, index) => (
            <input
              aria-label={`Recovery word ${index + 1}`}
              key={index}
              placeholder={`${index + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="surface-block">
        <Feature icon="Safe">Seed fields are visual only in this prototype</Feature>
        <Feature icon="Match">Recovered profiles still pass KYC before wallet actions</Feature>
      </section>
    </>
  );
}

export const authScreens = {
  splash: {
    title: "Welcome to Rozicoin",
    eyebrow: "Telegram Mini App",
    mainLabel: "Continue with Telegram",
    next: "terms",
    Component: SplashPage,
  },
  terms: {
    title: "Risk and consent",
    eyebrow: "Step 1 of 3",
    mainLabel: "Accept and continue",
    next: "passcode",
    back: "splash",
    Component: TermsPage,
  },
  passcode: {
    title: "Create passcode",
    eyebrow: "Security",
    mainLabel: "Save passcode",
    next: "kycIntro",
    back: "terms",
    Component: PasscodePage,
  },
  restore: {
    title: "Restore wallet",
    eyebrow: "Optional",
    mainLabel: "Continue to KYC",
    next: "kycIntro",
    back: "passcode",
    Component: RestorePage,
  },
};

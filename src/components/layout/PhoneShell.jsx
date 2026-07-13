import { ChevronLeft, ShieldCheck, Sparkles, X } from "lucide-react";

export function PhoneShell({ controller, screen }) {
  const Page = screen.Component;
  const { actions, state } = controller;
  const eyebrow = typeof screen.eyebrow === "function" ? screen.eyebrow(state) : screen.eyebrow;
  const title = typeof screen.title === "function" ? screen.title(state) : screen.title;

  return (
    <div className="phone-shell">
      <div className="ambient-layer" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="telegram-chrome">
        <button
          className="chrome-button"
          disabled={!screen.back}
          onClick={actions.goBack}
          type="button"
          aria-label="Back"
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <div className="app-brand">
          <span>R</span>
          <div>
            <strong>Rozicoin</strong>
            <small>Telegram Web App</small>
          </div>
        </div>
        <button className="chrome-button" type="button" aria-label="Close">
          <X size={18} strokeWidth={2.4} />
        </button>
      </div>

      <div className="app-status-strip" aria-label="Wallet status">
        <span>
          <ShieldCheck size={14} strokeWidth={2.4} />
          KYC Tier 1
        </span>
        <span>{state.network}</span>
        <span>
          <Sparkles size={14} strokeWidth={2.4} />
          Demo
        </span>
      </div>

      <article className="phone-screen" data-screen-id={state.screen}>
        <header className="screen-header">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
        </header>
        <div className="screen-body">
          <Page actions={actions} state={state} />
        </div>
      </article>

      <footer className="main-button-bar">
        <button onClick={actions.goNext} type="button">
          <span>{screen.mainLabel}</span>
        </button>
      </footer>
    </div>
  );
}

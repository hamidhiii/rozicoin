export function IntroOverlay({ onDismiss }) {
  return (
    <section className="intro-overlay" aria-label="Rozicoin intro">
      <div className="intro-stage">
        <div className="intro-phone" aria-hidden="true">
          <span className="intro-rail" />
          <span className="intro-rail" />
          <span className="intro-rail" />
          <div className="intro-wallet-card">
            <span>R</span>
            <strong>$1,792.12</strong>
            <small>KYC unlocked</small>
          </div>
        </div>
        <div className="intro-copy">
          <p>Telegram Web App</p>
          <h2>Rozicoin is ready.</h2>
          <div className="intro-tags">
            <span>TRON rails</span>
            <span>Fast KYC</span>
            <span>Secure wallet</span>
          </div>
          <button onClick={onDismiss} type="button">
            Enter demo
          </button>
        </div>
      </div>
    </section>
  );
}


export function WalletBalance({ network }) {
  return (
    <section className="balance-card">
      <div className="row split top">
        <div>
          <p>Total balance</p>
          <h2>$1,792.12</h2>
        </div>
        <span className="status-pill success">KYC Tier 1</span>
      </div>
      <div className="balance-meta">
        <span>24h +1.4%</span>
        <span>{network}</span>
      </div>
    </section>
  );
}


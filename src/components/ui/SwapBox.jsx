export function SwapBox({ amount, label, token }) {
  return (
    <div className="swap-box">
      <span>{label}</span>
      <strong>{amount}</strong>
      <b>{token}</b>
    </div>
  );
}


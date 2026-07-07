export function LimitRow({ label, value }) {
  return (
    <div className="limit-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}


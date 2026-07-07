export function ToggleRow({ enabled, label }) {
  return (
    <div className="toggle-row">
      <div>
        <strong>{label}</strong>
        <small>{enabled ? "Enabled" : "Disabled"}</small>
      </div>
      <button className={`toggle ${enabled ? "enabled" : ""}`} type="button" aria-label={label}>
        <span />
      </button>
    </div>
  );
}


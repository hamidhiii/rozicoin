export function Consent({ checked, children, onToggle }) {
  return (
    <button className={`consent ${checked ? "checked" : ""}`} onClick={onToggle} type="button">
      <span>{checked ? "OK" : ""}</span>
      <p>{children}</p>
    </button>
  );
}


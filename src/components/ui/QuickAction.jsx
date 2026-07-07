export function QuickAction({ icon, label, onClick }) {
  return (
    <button className="quick-action" onClick={onClick} type="button">
      <span>{icon}</span>
      <p>{label}</p>
    </button>
  );
}


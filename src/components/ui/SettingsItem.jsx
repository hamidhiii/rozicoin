export function SettingsItem({ onOpen, title, value }) {
  return (
    <button className="settings-item" onClick={onOpen} type="button">
      <div>
        <strong>{title}</strong>
        <small>{value}</small>
      </div>
      <span>Open</span>
    </button>
  );
}


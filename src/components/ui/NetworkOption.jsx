export function NetworkOption({ active, description, fee, name, onSelect }) {
  return (
    <button className={`option ${active ? "active" : ""}`} onClick={() => onSelect(name)} type="button">
      <span />
      <div>
        <strong>{name}</strong>
        <small>
          {description} - {fee}
        </small>
      </div>
    </button>
  );
}


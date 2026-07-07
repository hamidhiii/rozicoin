export function RecipientRow({ address, name, onSelect }) {
  return (
    <button className="recipient-row" onClick={onSelect} type="button">
      <span>{name.slice(0, 2).toUpperCase()}</span>
      <div>
        <strong>{name}</strong>
        <small>{address}</small>
      </div>
    </button>
  );
}


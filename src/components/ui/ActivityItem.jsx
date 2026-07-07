export function ActivityItem({ item, onOpen }) {
  return (
    <button className="activity-item" onClick={() => onOpen(item.screen)} type="button">
      <span>{item.title.slice(0, 1)}</span>
      <div>
        <strong>{item.title}</strong>
        <small>{item.status}</small>
      </div>
      <b>{item.amount}</b>
    </button>
  );
}


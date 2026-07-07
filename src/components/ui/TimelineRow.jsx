export function TimelineRow({ children, stateName = "" }) {
  return (
    <div className={`timeline-row ${stateName}`}>
      <span />
      <p>{children}</p>
    </div>
  );
}


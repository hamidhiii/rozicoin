export function Feature({ children, icon }) {
  return (
    <div className="feature">
      <span>{icon}</span>
      <p>{children}</p>
    </div>
  );
}


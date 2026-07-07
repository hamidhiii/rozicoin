export function Note({ children, title }) {
  return (
    <div>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}


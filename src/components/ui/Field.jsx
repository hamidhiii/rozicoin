export function Field({ label, value }) {
  return (
    <label>
      <span>{label}</span>
      <input defaultValue={value} />
    </label>
  );
}


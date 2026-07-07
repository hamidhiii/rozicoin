import { Check } from "lucide-react";

export function CheckRow({ children }) {
  return (
    <div className="check-row">
      <span>
        <Check size={15} strokeWidth={2.8} />
      </span>
      <p>{children}</p>
    </div>
  );
}

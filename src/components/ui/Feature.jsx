import { ShieldCheck } from "lucide-react";

export function Feature({ children, icon }) {
  const isNumeric = String(icon).length <= 2 || String(icon).startsWith("Fix");

  return (
    <div className="feature">
      <span>{isNumeric ? icon : <ShieldCheck size={16} strokeWidth={2.4} />}</span>
      <p>{children}</p>
    </div>
  );
}

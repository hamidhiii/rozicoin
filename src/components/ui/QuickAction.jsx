import { ArrowDownToLine, ArrowUpRight, Repeat2, Rows3 } from "lucide-react";

const icons = {
  Down: ArrowDownToLine,
  Grid: Rows3,
  Swap: Repeat2,
  Up: ArrowUpRight,
};

export function QuickAction({ icon, label, onClick }) {
  const Icon = icons[icon] ?? Rows3;

  return (
    <button className="quick-action" onClick={onClick} type="button">
      <span>
        <Icon size={19} strokeWidth={2.3} />
      </span>
      <p>{label}</p>
    </button>
  );
}

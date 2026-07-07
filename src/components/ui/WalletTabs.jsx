import { Clock3, UserRound, Wallet } from "lucide-react";

const tabs = [
  ["home", "walletHome", "Home", Wallet],
  ["activity", "activity", "Activity", Clock3],
  ["profile", "profile", "Profile", UserRound],
];

export function WalletTabs({ actions, active }) {
  return (
    <nav className="wallet-tabs" aria-label="Wallet sections">
      {tabs.map(([id, screen, label, Icon]) => (
        <button
          className={active === id ? "active" : ""}
          key={id}
          onClick={() => actions.goTo(screen)}
          type="button"
        >
          <Icon size={17} strokeWidth={2.3} />
          {label}
        </button>
      ))}
    </nav>
  );
}

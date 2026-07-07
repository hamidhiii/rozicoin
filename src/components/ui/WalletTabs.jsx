const tabs = [
  ["home", "walletHome", "Home"],
  ["activity", "activity", "Activity"],
  ["profile", "profile", "Profile"],
];

export function WalletTabs({ actions, active }) {
  return (
    <nav className="wallet-tabs" aria-label="Wallet sections">
      {tabs.map(([id, screen, label]) => (
        <button
          className={active === id ? "active" : ""}
          key={id}
          onClick={() => actions.goTo(screen)}
          type="button"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}


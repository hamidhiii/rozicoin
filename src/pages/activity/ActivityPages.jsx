import { ActivityItem, Feature, InfoRow, WalletTabs } from "../../components/ui/index.js";
import { activityItems } from "../../services/walletService.js";

export function ActivityPage({ actions }) {
  return (
    <>
      <section className="activity-list">
        {activityItems.map((item) => (
          <ActivityItem item={item} key={item.title} onOpen={actions.goTo} />
        ))}
      </section>
      <WalletTabs actions={actions} active="activity" />
    </>
  );
}

export function TransactionDetailPage({ state }) {
  return (
    <>
      <section className="surface-block">
        <div className="confirm-amount">-245.00 USDT</div>
        <InfoRow label="Status" value="Broadcast" />
        <InfoRow label="Network" value={state.network} />
        <InfoRow label="Hash" value="0x9f4e2a7f...d91a" />
        <InfoRow label="From" value="TX7a...9Qm2" />
        <InfoRow label="To" value="TXa4...129s" />
        <InfoRow label="Submitted" value="Today, 11:12" />
      </section>
      <section className="surface-block">
        <Feature icon="Receipt">Exportable receipt state for the final product</Feature>
        <Feature icon="Explorer">External explorer link can be connected later</Feature>
      </section>
    </>
  );
}

export const activityScreens = {
  activity: {
    title: "Activity",
    eyebrow: "Wallet history",
    mainLabel: "Open transaction",
    next: "transactionDetail",
    back: "walletHome",
    Component: ActivityPage,
  },
  transactionDetail: {
    title: "Transaction",
    eyebrow: "Detail",
    mainLabel: "Contact support",
    next: "support",
    back: "activity",
    Component: TransactionDetailPage,
  },
};


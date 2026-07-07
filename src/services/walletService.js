export const assets = [
  { symbol: "USDT", name: "Tether USD", amount: "1,248.40", value: "$1,248.40", change: "+0.01%" },
  { symbol: "TRX", name: "TRON", amount: "920.12", value: "$118.72", change: "+1.8%" },
  { symbol: "ROZI", name: "Rozicoin demo", amount: "8,500", value: "$425.00", change: "Demo" },
];

export const networks = [
  { name: "TRON", description: "USDT TRC20, TRX fees", fee: "$1.00 estimated fee" },
  { name: "Ethereum", description: "ERC20 assets", fee: "$8.40 estimated fee" },
  { name: "BNB Chain", description: "BEP20 assets", fee: "$0.38 estimated fee" },
  { name: "Polygon", description: "USDT PoS", fee: "$0.05 estimated fee" },
];

export const recentRecipients = [
  { name: "Vendor payout", address: "TXa4...129s" },
  { name: "Exchange deposit", address: "TQL9...8e32" },
  { name: "Team wallet", address: "TJk2...72Pm" },
];

export const activityItems = [
  { title: "Sent USDT", amount: "-245.00 USDT", status: "Broadcast", screen: "transactionDetail" },
  { title: "Received TRX", amount: "+920.12 TRX", status: "Confirmed", screen: "transactionDetail" },
  { title: "Swap USDT to TRX", amount: "250.00 USDT", status: "Confirmed", screen: "transactionDetail" },
  { title: "KYC approved", amount: "Tier 1", status: "System", screen: "profile" },
];

export function amountPreset(percent) {
  return {
    25: "312.10",
    50: "624.20",
    100: "1,248.40",
  }[percent];
}


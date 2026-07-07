export const flows = [
  {
    title: "Auth",
    screens: [
      ["splash", "Telegram Start"],
      ["terms", "Terms + Risk"],
      ["passcode", "Create Passcode"],
      ["restore", "Restore Wallet"],
    ],
  },
  {
    title: "KYC",
    screens: [
      ["kycIntro", "KYC Intro"],
      ["personal", "Personal Details"],
      ["documentType", "Document Type"],
      ["documentScan", "Document Scan"],
      ["selfie", "Selfie Check"],
      ["review", "Review Pending"],
      ["approved", "Approved"],
      ["rejected", "Rejected"],
    ],
  },
  {
    title: "Wallet",
    screens: [
      ["walletLocked", "Locked Wallet"],
      ["walletHome", "Wallet Home"],
      ["tokenDetail", "Token Detail"],
      ["networkSelector", "Network Selector"],
      ["receive", "Receive"],
    ],
  },
  {
    title: "Send",
    screens: [
      ["sendRecipient", "Recipient"],
      ["sendAmount", "Amount"],
      ["confirmTransfer", "Confirm"],
      ["transferSuccess", "Success"],
      ["transferFailed", "Failed"],
    ],
  },
  {
    title: "Swap",
    screens: [
      ["swapQuote", "Quote"],
      ["swapConfirm", "Confirm"],
      ["swapSuccess", "Success"],
    ],
  },
  {
    title: "Activity",
    screens: [
      ["activity", "Activity List"],
      ["transactionDetail", "Transaction Detail"],
    ],
  },
  {
    title: "Settings",
    screens: [
      ["profile", "Profile + KYC"],
      ["security", "Security"],
      ["limits", "Limits"],
      ["support", "Support"],
    ],
  },
];


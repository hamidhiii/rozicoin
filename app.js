const state = {
  screen: "splash",
  theme: localStorage.getItem("rozicoin-theme") || "light",
  passcodeLength: 0,
  documentType: "Passport",
  network: "TRON",
  token: "USDT",
  sendAmount: "245.00",
  sendRecipient: "TX7a...9Qm2",
  toast: "",
  riskAccepted: false,
};

const kycSteps = [
  "Start",
  "Personal",
  "Document",
  "Selfie",
  "Review",
];

const flows = [
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

const screens = {
  splash: {
    group: "Auth",
    title: "Welcome to Rozicoin",
    eyebrow: "Telegram Mini App",
    mainLabel: "Continue with Telegram",
    next: "terms",
    content: () => `
      <section class="hero-panel">
        <div class="app-logo">
          <span>R</span>
        </div>
        <h1>Crypto payments inside Telegram.</h1>
        <p class="lead">A client wallet demo for TRON payments, USDT transfers, swap previews, and compliant onboarding.</p>
        <div class="trust-grid">
          ${metric("Network", "TRON", "Fast settlement")}
          ${metric("KYC", "Required", "Higher limits")}
          ${metric("Demo", "Frontend", "No real funds")}
        </div>
      </section>
      <section class="surface-block">
        <div class="row split">
          <div>
            <p class="label">Telegram session</p>
            <strong>@demo_client</strong>
          </div>
          <span class="status-pill success">Verified app launch</span>
        </div>
        <div class="divider"></div>
        <div class="feature-list">
          ${feature("Shield", "KYC gated wallet access")}
          ${feature("TRX", "Receive, send, and inspect TRON assets")}
          ${feature("USDT", "Payment-style checkout confirmation")}
        </div>
      </section>
    `,
  },
  terms: {
    group: "Auth",
    title: "Risk and consent",
    eyebrow: "Step 1 of 3",
    mainLabel: "Accept and continue",
    next: "passcode",
    back: "splash",
    content: () => `
      <section class="surface-block">
        <p class="label">Before opening the wallet</p>
        <h2>Confirm the demo terms</h2>
        <div class="consent-list">
          ${consent("This prototype does not store private keys or move real funds.", true)}
          ${consent("KYC is required before sending, receiving, swapping, or raising limits.", true)}
          ${consent("Telegram account data is used only to prefill the client profile.", state.riskAccepted)}
        </div>
      </section>
      <section class="surface-block warning">
        <div class="row">
          <span class="icon-badge amber">!</span>
          <div>
            <strong>Compliance first</strong>
            <p>Wallet actions stay locked until identity review is complete.</p>
          </div>
        </div>
      </section>
    `,
  },
  passcode: {
    group: "Auth",
    title: "Create passcode",
    eyebrow: "Security",
    mainLabel: "Save passcode",
    next: "kycIntro",
    back: "terms",
    content: () => `
      <section class="surface-block center">
        <span class="icon-badge teal">#</span>
        <h2>Protect this Telegram session</h2>
        <p>Use a 4 digit passcode for local access to the wallet demo.</p>
        <div class="pin-dots">
          ${[0, 1, 2, 3].map((dot) => `<span class="${dot < state.passcodeLength ? "filled" : ""}"></span>`).join("")}
        </div>
        <div class="number-pad">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => `<button type="button" data-pin="${num}">${num}</button>`).join("")}
          <button type="button" data-pin-clear>Clear</button>
          <button type="button" data-pin="0">0</button>
          <button type="button" data-next>OK</button>
        </div>
      </section>
      <button class="text-action" type="button" data-screen="restore">Restore existing wallet</button>
    `,
  },
  restore: {
    group: "Auth",
    title: "Restore wallet",
    eyebrow: "Optional",
    mainLabel: "Continue to KYC",
    next: "kycIntro",
    back: "passcode",
    content: () => `
      <section class="surface-block">
        <h2>Import read-only demo profile</h2>
        <p class="muted">Use this page when the client already has a wallet record connected to Telegram.</p>
        <div class="seed-grid">
          ${Array.from({ length: 12 }, (_, index) => `<input aria-label="Recovery word ${index + 1}" placeholder="${index + 1}" />`).join("")}
        </div>
      </section>
      <section class="surface-block">
        ${feature("Safe", "Seed fields are visual only in this prototype")}
        ${feature("Match", "Recovered profiles still pass KYC before wallet actions")}
      </section>
    `,
  },
  kycIntro: {
    group: "KYC",
    title: "Verify identity",
    eyebrow: "KYC required",
    mainLabel: "Start KYC",
    next: "personal",
    back: "passcode",
    content: () => `
      <section class="surface-block">
        <div class="row split top">
          <div>
            <p class="label">Current limit</p>
            <h2>$0 daily</h2>
          </div>
          <span class="status-pill pending">Locked</span>
        </div>
        <div class="progress-track">
          <span style="width: 20%"></span>
        </div>
        <div class="feature-list">
          ${feature("1", "Personal details")}
          ${feature("2", "Government document")}
          ${feature("3", "Selfie liveness check")}
          ${feature("4", "Compliance review")}
        </div>
      </section>
      <section class="surface-block limit-card">
        <strong>After approval</strong>
        <div class="limit-row"><span>Daily send</span><b>$10,000</b></div>
        <div class="limit-row"><span>Swap preview</span><b>Enabled</b></div>
        <div class="limit-row"><span>Receive address</span><b>Enabled</b></div>
      </section>
    `,
  },
  personal: {
    group: "KYC",
    title: "Personal details",
    eyebrow: "Step 1 of 4",
    mainLabel: "Continue",
    next: "documentType",
    back: "kycIntro",
    content: () => `
      ${stepper(2)}
      <section class="surface-block">
        <div class="form-grid">
          ${field("Legal first name", "Hamid")}
          ${field("Legal last name", "Demo")}
          ${field("Date of birth", "1997-04-18")}
          ${field("Country", "Uzbekistan")}
          ${field("Residential address", "Tashkent, Yunusabad")}
          ${field("Telegram handle", "@demo_client")}
        </div>
      </section>
    `,
  },
  documentType: {
    group: "KYC",
    title: "Document type",
    eyebrow: "Step 2 of 4",
    mainLabel: "Scan document",
    next: "documentScan",
    back: "personal",
    content: () => `
      ${stepper(3)}
      <section class="surface-block">
        <h2>Select identity document</h2>
        <div class="option-stack">
          ${docOption("Passport")}
          ${docOption("National ID")}
          ${docOption("Driver license")}
        </div>
      </section>
      <section class="document-preview">
        <div>
          <span class="mini-chip">Selected</span>
          <strong>${state.documentType}</strong>
        </div>
        <span class="doc-lines"></span>
      </section>
    `,
  },
  documentScan: {
    group: "KYC",
    title: "Scan document",
    eyebrow: "Step 3 of 4",
    mainLabel: "Use this scan",
    next: "selfie",
    back: "documentType",
    content: () => `
      ${stepper(4)}
      <section class="scan-frame">
        <div class="scan-corners"></div>
        <div class="scan-card">
          <span>${state.documentType}</span>
          <b>Demo Client</b>
          <small>MRZ OK - glare low - all edges visible</small>
        </div>
      </section>
      <section class="surface-block compact">
        ${check("All four corners are visible")}
        ${check("Name matches personal details")}
        ${check("Document is not expired")}
      </section>
    `,
  },
  selfie: {
    group: "KYC",
    title: "Selfie check",
    eyebrow: "Liveness",
    mainLabel: "Submit for review",
    next: "review",
    back: "documentScan",
    content: () => `
      ${stepper(5)}
      <section class="surface-block center">
        <div class="face-ring">
          <span></span>
        </div>
        <h2>Look straight, then turn slightly left</h2>
        <p>Camera permissions are requested by Telegram Web App at runtime.</p>
        <div class="liveness-row">
          ${check("Face centered")}
          ${check("Blink detected")}
        </div>
      </section>
    `,
  },
  review: {
    group: "KYC",
    title: "Review pending",
    eyebrow: "Almost done",
    mainLabel: "See approved state",
    next: "approved",
    back: "selfie",
    content: () => `
      <section class="surface-block center">
        <div class="review-orbit">
          <span></span>
        </div>
        <h2>Identity review in progress</h2>
        <p>Most checks finish in a few minutes. Wallet actions remain limited during review.</p>
      </section>
      <section class="timeline">
        ${timeline("Telegram account linked", "done")}
        ${timeline("Document quality accepted", "done")}
        ${timeline("Sanctions and PEP screening", "active")}
        ${timeline("Wallet limits update", "")}
      </section>
      <button class="text-action danger" type="button" data-screen="rejected">Preview rejected state</button>
    `,
  },
  approved: {
    group: "KYC",
    title: "KYC approved",
    eyebrow: "Verified",
    mainLabel: "Open wallet preview",
    next: "walletHome",
    back: "review",
    content: () => `
      <section class="success-panel">
        <span class="icon-badge green">OK</span>
        <h2>Wallet access unlocked</h2>
        <p>Receive, send, swap, and activity pages can now be enabled in the client frontend.</p>
      </section>
      <section class="surface-block">
        <div class="limit-row"><span>Verification level</span><b>Tier 1</b></div>
        <div class="limit-row"><span>Daily transfer limit</span><b>$10,000</b></div>
        <div class="limit-row"><span>TRON receive address</span><b>Active</b></div>
      </section>
    `,
  },
  rejected: {
    group: "KYC",
    title: "Action required",
    eyebrow: "KYC rejected",
    mainLabel: "Resubmit document",
    next: "documentType",
    back: "review",
    content: () => `
      <section class="surface-block warning">
        <div class="row">
          <span class="icon-badge red">!</span>
          <div>
            <h2>Document could not be verified</h2>
            <p>The scan is cropped and the document number is unreadable.</p>
          </div>
        </div>
      </section>
      <section class="surface-block">
        ${feature("Fix 1", "Use a brighter background")}
        ${feature("Fix 2", "Keep all document corners inside the frame")}
        ${feature("Fix 3", "Upload the original government document")}
      </section>
    `,
  },
  walletLocked: {
    group: "Wallet",
    title: "Wallet locked",
    eyebrow: "KYC gate",
    mainLabel: "Start verification",
    next: "kycIntro",
    back: "splash",
    content: () => `
      <section class="surface-block locked-card">
        <span class="lock-symbol">LOCK</span>
        <h2>Complete KYC to unlock wallet actions</h2>
        <p>Balance preview is visible, but receive, send, and swap are disabled until review is approved.</p>
      </section>
      <section class="surface-block">
        ${feature("View", "Read-only asset overview")}
        ${feature("KYC", "Identity review required for transfers")}
        ${feature("Risk", "Limits enforced before every payment")}
      </section>
      ${walletTabs("home")}
    `,
  },
  walletHome: {
    group: "Wallet",
    title: "Wallet",
    eyebrow: "Verified client",
    mainLabel: "Receive USDT",
    next: "receive",
    back: "approved",
    content: () => `
      ${toast()}
      ${walletBalance()}
      <section class="quick-actions">
        ${quickAction("Receive", "receive", "Down")}
        ${quickAction("Send", "sendRecipient", "Up")}
        ${quickAction("Swap", "swapQuote", "Swap")}
        ${quickAction("Network", "networkSelector", "Grid")}
      </section>
      <section class="surface-block asset-list">
        <div class="row split">
          <h2>Assets</h2>
          <button class="small-link" type="button" data-screen="networkSelector">${state.network}</button>
        </div>
        ${assetRow("USDT", "Tether USD", "1,248.40", "$1,248.40", "+0.01%", "tokenDetail")}
        ${assetRow("TRX", "TRON", "920.12", "$118.72", "+1.8%", "tokenDetail")}
        ${assetRow("ROZI", "Rozicoin demo", "8,500", "$425.00", "Demo", "tokenDetail")}
      </section>
      ${walletTabs("home")}
    `,
  },
  tokenDetail: {
    group: "Wallet",
    title: `${state.token} detail`,
    eyebrow: "Asset",
    mainLabel: "Send token",
    next: "sendRecipient",
    back: "walletHome",
    content: () => `
      <section class="token-hero">
        <div class="token-mark">${state.token}</div>
        <p>Total balance</p>
        <h2>1,248.40 ${state.token}</h2>
        <strong>$1,248.40</strong>
        <div class="mini-chart">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </section>
      <section class="quick-actions">
        ${quickAction("Receive", "receive", "Down")}
        ${quickAction("Send", "sendRecipient", "Up")}
        ${quickAction("Swap", "swapQuote", "Swap")}
      </section>
      <section class="surface-block">
        ${infoRow("Network", state.network)}
        ${infoRow("Contract", "TR7N...jLj6t")}
        ${infoRow("Available", "1,248.40 USDT")}
        ${infoRow("Pending", "0.00 USDT")}
      </section>
    `,
  },
  networkSelector: {
    group: "Wallet",
    title: "Network",
    eyebrow: "Choose chain",
    mainLabel: "Apply network",
    next: "walletHome",
    back: "walletHome",
    content: () => `
      <section class="surface-block">
        <h2>Select settlement network</h2>
        <p class="muted">TRON is recommended for the demo payment flow because fees are predictable and settlement is fast.</p>
        <div class="option-stack network-stack">
          ${networkOption("TRON", "USDT TRC20, TRX fees", "$1.00 estimated fee")}
          ${networkOption("Ethereum", "ERC20 assets", "$8.40 estimated fee")}
          ${networkOption("BNB Chain", "BEP20 assets", "$0.38 estimated fee")}
          ${networkOption("Polygon", "USDT PoS", "$0.05 estimated fee")}
        </div>
      </section>
      <section class="surface-block compact">
        ${check("Network changes affect receive addresses")}
        ${check("Send confirmation repeats the selected network")}
      </section>
    `,
  },
  receive: {
    group: "Wallet",
    title: "Receive",
    eyebrow: `${state.network} address`,
    mainLabel: "Copy address",
    next: "receive",
    back: "walletHome",
    content: () => `
      ${toast()}
      <section class="surface-block center">
        <p class="label">Receive ${state.token} on ${state.network}</p>
        <div class="qr-card" aria-label="Demo QR code">
          ${qrBlocks()}
        </div>
        <code class="address-line">TX7aC2uN9hDemoWallet9Qm2</code>
        <button class="secondary-button" type="button" data-copy>Copy address</button>
      </section>
      <section class="surface-block warning">
        ${feature("TRON", "Only send TRC20 assets to this address")}
        ${feature("Memo", "No memo or tag required")}
      </section>
    `,
  },
  sendRecipient: {
    group: "Send",
    title: "Send",
    eyebrow: "Recipient",
    mainLabel: "Continue",
    next: "sendAmount",
    back: "walletHome",
    content: () => `
      <section class="surface-block">
        <label>
          <span>Recipient address</span>
          <input value="${state.sendRecipient}" />
        </label>
        <button class="secondary-button scan-button" type="button">Scan QR</button>
      </section>
      <section class="surface-block">
        <div class="row split">
          <h2>Recent</h2>
          <span class="mini-chip">Trusted</span>
        </div>
        ${recipient("Vendor payout", "TXa4...129s")}
        ${recipient("Exchange deposit", "TQL9...8e32")}
        ${recipient("Team wallet", "TJk2...72Pm")}
      </section>
    `,
  },
  sendAmount: {
    group: "Send",
    title: "Amount",
    eyebrow: "USDT TRC20",
    mainLabel: "Review transfer",
    next: "confirmTransfer",
    back: "sendRecipient",
    content: () => `
      <section class="amount-panel">
        <p>Sending</p>
        <div class="amount-value">$${state.sendAmount}</div>
        <div class="balance-chip">Balance: 1,248.40 USDT</div>
      </section>
      <section class="amount-shortcuts">
        <button type="button" data-amount="25">25%</button>
        <button type="button" data-amount="50">50%</button>
        <button type="button" data-amount="100">Max</button>
      </section>
      <section class="surface-block">
        ${infoRow("Token", "USDT")}
        ${infoRow("Network", state.network)}
        ${infoRow("Estimated network fee", "13.40 TRX")}
      </section>
    `,
  },
  confirmTransfer: {
    group: "Send",
    title: "Confirm",
    eyebrow: "Final check",
    mainLabel: "Send payment",
    next: "transferSuccess",
    back: "sendAmount",
    content: () => `
      <section class="surface-block">
        <div class="confirm-amount">$${state.sendAmount}</div>
        ${infoRow("To", state.sendRecipient)}
        ${infoRow("Asset", "USDT TRC20")}
        ${infoRow("Network fee", "13.40 TRX")}
        ${infoRow("Total debit", "$245.00 + fee")}
      </section>
      <section class="surface-block warning">
        ${feature("KYC", "Transfer will be logged against verified client profile")}
        ${feature("Risk", "Large transfers can trigger extra review")}
      </section>
      <button class="text-action danger" type="button" data-screen="transferFailed">Preview failed state</button>
    `,
  },
  transferSuccess: {
    group: "Send",
    title: "Sent",
    eyebrow: "Payment complete",
    mainLabel: "View activity",
    next: "activity",
    back: "confirmTransfer",
    content: () => `
      <section class="success-panel">
        <span class="icon-badge green">OK</span>
        <h2>$${state.sendAmount} USDT sent</h2>
        <p>The transaction is pending confirmation on ${state.network}.</p>
      </section>
      <section class="receipt">
        ${infoRow("Hash", "0x9f4...d91a")}
        ${infoRow("Status", "Broadcast")}
        ${infoRow("ETA", "Under 1 minute")}
      </section>
    `,
  },
  transferFailed: {
    group: "Send",
    title: "Transfer failed",
    eyebrow: "Action needed",
    mainLabel: "Edit amount",
    next: "sendAmount",
    back: "confirmTransfer",
    content: () => `
      <section class="surface-block warning">
        <div class="row">
          <span class="icon-badge red">!</span>
          <div>
            <h2>Not enough TRX for network fee</h2>
            <p>Add TRX or reduce the amount before retrying.</p>
          </div>
        </div>
      </section>
      <section class="surface-block">
        ${infoRow("Required fee", "13.40 TRX")}
        ${infoRow("Available TRX", "3.18 TRX")}
        ${infoRow("Suggested action", "Buy or receive TRX")}
      </section>
    `,
  },
  swapQuote: {
    group: "Swap",
    title: "Swap",
    eyebrow: "Quote preview",
    mainLabel: "Review swap",
    next: "swapConfirm",
    back: "walletHome",
    content: () => `
      <section class="swap-card">
        ${swapBox("You pay", "250.00", "USDT")}
        <div class="swap-divider">Swap</div>
        ${swapBox("You receive", "1,941.22", "TRX")}
      </section>
      <section class="surface-block">
        ${infoRow("Route", "USDT -> TRX")}
        ${infoRow("Rate", "1 USDT = 7.76 TRX")}
        ${infoRow("Slippage", "0.5%")}
        ${infoRow("Quote expires", "00:24")}
      </section>
    `,
  },
  swapConfirm: {
    group: "Swap",
    title: "Confirm swap",
    eyebrow: "TRON route",
    mainLabel: "Swap now",
    next: "swapSuccess",
    back: "swapQuote",
    content: () => `
      <section class="surface-block">
        <h2>Swap 250 USDT to TRX</h2>
        <p class="muted">The demo shows route, fees, and risk copy before signing.</p>
        ${infoRow("Minimum received", "1,931.51 TRX")}
        ${infoRow("Network fee", "18.20 TRX")}
        ${infoRow("Provider", "Rozicoin demo router")}
      </section>
      <section class="surface-block warning">
        ${feature("Price", "Rates can change before confirmation")}
      </section>
    `,
  },
  swapSuccess: {
    group: "Swap",
    title: "Swap complete",
    eyebrow: "Confirmed",
    mainLabel: "Back to wallet",
    next: "walletHome",
    back: "swapConfirm",
    content: () => `
      <section class="success-panel">
        <span class="icon-badge green">OK</span>
        <h2>1,941.22 TRX received</h2>
        <p>Your wallet balances have been updated in the demo state.</p>
      </section>
      <section class="receipt">
        ${infoRow("Paid", "250.00 USDT")}
        ${infoRow("Received", "1,941.22 TRX")}
        ${infoRow("Status", "Confirmed")}
      </section>
    `,
  },
  activity: {
    group: "Activity",
    title: "Activity",
    eyebrow: "Wallet history",
    mainLabel: "Open transaction",
    next: "transactionDetail",
    back: "walletHome",
    content: () => `
      <section class="activity-list">
        ${activityItem("Sent USDT", "-245.00 USDT", "Broadcast", "transactionDetail")}
        ${activityItem("Received TRX", "+920.12 TRX", "Confirmed", "transactionDetail")}
        ${activityItem("Swap USDT to TRX", "250.00 USDT", "Confirmed", "transactionDetail")}
        ${activityItem("KYC approved", "Tier 1", "System", "profile")}
      </section>
      ${walletTabs("activity")}
    `,
  },
  transactionDetail: {
    group: "Activity",
    title: "Transaction",
    eyebrow: "Detail",
    mainLabel: "Contact support",
    next: "support",
    back: "activity",
    content: () => `
      <section class="surface-block">
        <div class="confirm-amount">-245.00 USDT</div>
        ${infoRow("Status", "Broadcast")}
        ${infoRow("Network", state.network)}
        ${infoRow("Hash", "0x9f4e2a7f...d91a")}
        ${infoRow("From", "TX7a...9Qm2")}
        ${infoRow("To", "TXa4...129s")}
        ${infoRow("Submitted", "Today, 11:12")}
      </section>
      <section class="surface-block">
        ${feature("Receipt", "Exportable receipt state for the final product")}
        ${feature("Explorer", "External explorer link can be connected later")}
      </section>
    `,
  },
  profile: {
    group: "Settings",
    title: "Profile",
    eyebrow: "Client",
    mainLabel: "View limits",
    next: "limits",
    back: "walletHome",
    content: () => `
      <section class="profile-card">
        <div class="avatar">HD</div>
        <h2>Hamid Demo</h2>
        <p>@demo_client</p>
        <span class="status-pill success">KYC Tier 1</span>
      </section>
      <section class="surface-block">
        ${settingsItem("KYC status", "Approved", "limits")}
        ${settingsItem("Security", "Passcode enabled", "security")}
        ${settingsItem("Support", "Open ticket", "support")}
      </section>
      ${walletTabs("profile")}
    `,
  },
  security: {
    group: "Settings",
    title: "Security",
    eyebrow: "Account",
    mainLabel: "Done",
    next: "profile",
    back: "profile",
    content: () => `
      <section class="surface-block">
        ${toggleRow("Passcode", true)}
        ${toggleRow("Telegram biometric prompt", false)}
        ${toggleRow("Address whitelist", true)}
        ${toggleRow("Large transfer confirmation", true)}
      </section>
      <section class="surface-block warning">
        ${feature("Device", "A new Telegram session would require passcode setup")}
      </section>
    `,
  },
  limits: {
    group: "Settings",
    title: "Limits",
    eyebrow: "Compliance",
    mainLabel: "Back to profile",
    next: "profile",
    back: "profile",
    content: () => `
      <section class="surface-block">
        <div class="limit-meter">
          <span style="width: 18%"></span>
        </div>
        ${infoRow("Daily sent", "$1,845 / $10,000")}
        ${infoRow("Monthly received", "$8,420 / $50,000")}
        ${infoRow("Verification tier", "Tier 1")}
        ${infoRow("Next upgrade", "Proof of address")}
      </section>
      <section class="surface-block">
        ${feature("Audit", "Every transfer is tied to the verified client profile")}
      </section>
    `,
  },
  support: {
    group: "Settings",
    title: "Support",
    eyebrow: "Help",
    mainLabel: "Back to wallet",
    next: "walletHome",
    back: "profile",
    content: () => `
      <section class="surface-block">
        ${settingsItem("KYC review help", "Average answer 12 min", "support")}
        ${settingsItem("Missing deposit", "Prepare hash", "support")}
        ${settingsItem("Transfer issue", "Attach receipt", "support")}
      </section>
      <section class="chat-preview">
        <div class="chat-bubble support">Hi, send us the transaction hash and we will check the route.</div>
        <div class="chat-bubble client">0x9f4e2a7f...d91a</div>
      </section>
    `,
  },
};

function render() {
  const screen = screens[state.screen];
  const app = document.querySelector("#app");
  document.documentElement.dataset.theme = state.theme;
  app.innerHTML = `
    <div class="workspace">
      <aside class="flow-panel" aria-label="Prototype screens">
        <div class="brand-row">
          <span class="brand-mark">R</span>
          <div>
            <strong>Rozicoin</strong>
            <small>Telegram client demo</small>
          </div>
        </div>
        <div class="flow-list">
          ${flows.map(renderFlowGroup).join("")}
        </div>
        <button class="theme-button" type="button" data-theme-toggle>${state.theme === "dark" ? "Light mode" : "Dark mode"}</button>
      </aside>

      <main class="phone-stage">
        <div class="phone-shell">
          <div class="telegram-chrome">
            <button class="chrome-button" type="button" data-back ${screen.back ? "" : "disabled"}>Back</button>
            <div>
              <strong>Rozicoin</strong>
              <small>bot</small>
            </div>
            <button class="chrome-button" type="button">Close</button>
          </div>
          <article class="phone-screen">
            <header class="screen-header">
              <p>${screen.eyebrow}</p>
              <h1>${screen.title}</h1>
            </header>
            <div class="screen-body">
              ${screen.content()}
            </div>
          </article>
          <footer class="main-button-bar">
            <button type="button" data-next>${screen.mainLabel}</button>
          </footer>
        </div>
      </main>

      <aside class="notes-panel">
        <p class="label">Prototype goal</p>
        <h2>Client-side Telegram Web App flow</h2>
        <p>Designed from Trust Wallet-style mobile patterns, adapted for regulated payment onboarding and KYC gating.</p>
        <div class="note-list">
          ${note("Telegram-aware shell", "Back and main actions stay fixed like a Mini App.")}
          ${note("KYC before wallet", "Every money action is gated by identity review.")}
          ${note("Frontend only", "Demo screens use mock data and local UI state.")}
        </div>
      </aside>
    </div>
  `;
}

function renderFlowGroup(group) {
  return `
    <section>
      <p>${group.title}</p>
      ${group.screens
        .map(([id, label]) => {
          const active = id === state.screen ? "active" : "";
          return `<button class="${active}" type="button" data-screen="${id}">${label}</button>`;
        })
        .join("")}
    </section>
  `;
}

function metric(label, value, hint) {
  return `
    <div class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${hint}</small>
    </div>
  `;
}

function feature(icon, text) {
  return `
    <div class="feature">
      <span>${icon}</span>
      <p>${text}</p>
    </div>
  `;
}

function consent(text, checked) {
  return `
    <button class="consent ${checked ? "checked" : ""}" type="button" data-risk-toggle>
      <span>${checked ? "OK" : ""}</span>
      <p>${text}</p>
    </button>
  `;
}

function field(label, value) {
  return `
    <label>
      <span>${label}</span>
      <input value="${value}" />
    </label>
  `;
}

function docOption(type) {
  const active = state.documentType === type ? "active" : "";
  return `
    <button class="option ${active}" type="button" data-doc="${type}">
      <span></span>
      <div>
        <strong>${type}</strong>
        <small>${type === "Passport" ? "Best for international clients" : "Accepted for local verification"}</small>
      </div>
    </button>
  `;
}

function stepper(activeIndex) {
  return `
    <div class="kyc-stepper">
      ${kycSteps
        .map((label, index) => `<span class="${index + 1 <= activeIndex ? "active" : ""}">${label}</span>`)
        .join("")}
    </div>
  `;
}

function check(text) {
  return `<div class="check-row"><span>OK</span><p>${text}</p></div>`;
}

function timeline(text, stateName) {
  return `
    <div class="timeline-row ${stateName}">
      <span></span>
      <p>${text}</p>
    </div>
  `;
}

function toast() {
  if (!state.toast) return "";
  return `<div class="toast-banner">${state.toast}</div>`;
}

function walletBalance() {
  return `
    <section class="balance-card">
      <div class="row split top">
        <div>
          <p>Total balance</p>
          <h2>$1,792.12</h2>
        </div>
        <span class="status-pill success">KYC Tier 1</span>
      </div>
      <div class="balance-meta">
        <span>24h +1.4%</span>
        <span>${state.network}</span>
      </div>
    </section>
  `;
}

function quickAction(label, screen, icon) {
  return `
    <button class="quick-action" type="button" data-screen="${screen}">
      <span>${icon}</span>
      <p>${label}</p>
    </button>
  `;
}

function assetRow(symbol, name, amount, value, change, screen) {
  return `
    <button class="asset-row" type="button" data-token="${symbol}" data-screen="${screen}">
      <span class="asset-icon">${symbol.slice(0, 2)}</span>
      <div>
        <strong>${symbol}</strong>
        <small>${name}</small>
      </div>
      <div>
        <strong>${amount}</strong>
        <small>${value} - ${change}</small>
      </div>
    </button>
  `;
}

function walletTabs(active) {
  const tabs = [
    ["home", "walletHome", "Home"],
    ["activity", "activity", "Activity"],
    ["profile", "profile", "Profile"],
  ];

  return `
    <nav class="wallet-tabs" aria-label="Wallet sections">
      ${tabs
        .map(([id, screen, label]) => `<button class="${active === id ? "active" : ""}" type="button" data-screen="${screen}">${label}</button>`)
        .join("")}
    </nav>
  `;
}

function infoRow(label, value) {
  return `
    <div class="info-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function networkOption(name, description, fee) {
  const active = state.network === name ? "active" : "";
  return `
    <button class="option ${active}" type="button" data-network="${name}">
      <span></span>
      <div>
        <strong>${name}</strong>
        <small>${description} - ${fee}</small>
      </div>
    </button>
  `;
}

function qrBlocks() {
  return Array.from({ length: 49 }, (_, index) => {
    const filled = [0, 1, 2, 6, 7, 8, 10, 13, 14, 16, 18, 20, 22, 24, 28, 30, 32, 34, 35, 38, 40, 42, 43, 45, 46, 47, 48].includes(index);
    return `<span class="${filled ? "filled" : ""}"></span>`;
  }).join("");
}

function recipient(name, address) {
  return `
    <button class="recipient-row" type="button" data-screen="sendAmount">
      <span>${name.slice(0, 2).toUpperCase()}</span>
      <div>
        <strong>${name}</strong>
        <small>${address}</small>
      </div>
    </button>
  `;
}

function swapBox(label, amount, token) {
  return `
    <div class="swap-box">
      <span>${label}</span>
      <strong>${amount}</strong>
      <b>${token}</b>
    </div>
  `;
}

function activityItem(title, amount, status, screen) {
  return `
    <button class="activity-item" type="button" data-screen="${screen}">
      <span>${title.slice(0, 1)}</span>
      <div>
        <strong>${title}</strong>
        <small>${status}</small>
      </div>
      <b>${amount}</b>
    </button>
  `;
}

function settingsItem(title, value, screen) {
  return `
    <button class="settings-item" type="button" data-screen="${screen}">
      <div>
        <strong>${title}</strong>
        <small>${value}</small>
      </div>
      <span>Open</span>
    </button>
  `;
}

function toggleRow(label, enabled) {
  return `
    <div class="toggle-row">
      <div>
        <strong>${label}</strong>
        <small>${enabled ? "Enabled" : "Disabled"}</small>
      </div>
      <button class="toggle ${enabled ? "enabled" : ""}" type="button" aria-label="${label}">
        <span></span>
      </button>
    </div>
  `;
}

function note(title, body) {
  return `
    <div>
      <strong>${title}</strong>
      <p>${body}</p>
    </div>
  `;
}

function goNext() {
  const screen = screens[state.screen];
  if (screen.next) {
    state.screen = screen.next;
    render();
  }
}

function goBack() {
  const screen = screens[state.screen];
  if (screen.back) {
    state.screen = screen.back;
    render();
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.copy !== undefined) {
    state.toast = "Address copied for the demo.";
    render();
    return;
  }

  if (target.dataset.amount) {
    const presets = {
      25: "312.10",
      50: "624.20",
      100: "1,248.40",
    };
    state.sendAmount = presets[target.dataset.amount] || state.sendAmount;
    render();
    return;
  }

  if (target.dataset.network) {
    state.network = target.dataset.network;
    state.toast = `${state.network} selected.`;
    render();
    return;
  }

  if (target.dataset.token) {
    state.token = target.dataset.token;
  }

  if (target.dataset.screen) {
    state.screen = target.dataset.screen;
    if (!target.dataset.copy) {
      state.toast = "";
    }
    render();
    return;
  }

  if (target.dataset.next !== undefined) {
    goNext();
    return;
  }

  if (target.dataset.back !== undefined) {
    goBack();
    return;
  }

  if (target.dataset.themeToggle !== undefined) {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("rozicoin-theme", state.theme);
    render();
    return;
  }

  if (target.dataset.riskToggle !== undefined) {
    state.riskAccepted = !state.riskAccepted;
    render();
    return;
  }

  if (target.dataset.doc) {
    state.documentType = target.dataset.doc;
    render();
    return;
  }

  if (target.dataset.pin !== undefined) {
    state.passcodeLength = Math.min(4, state.passcodeLength + 1);
    render();
    return;
  }

  if (target.dataset.pinClear !== undefined) {
    state.passcodeLength = 0;
    render();
  }
});

render();

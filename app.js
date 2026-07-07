const state = {
  screen: "splash",
  theme: localStorage.getItem("rozicoin-theme") || "light",
  passcodeLength: 0,
  documentType: "Passport",
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
    next: "approved",
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

  if (target.dataset.screen) {
    state.screen = target.dataset.screen;
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


import {
  CheckRow,
  Feature,
  Field,
  KycStepper,
  LimitRow,
  TimelineRow,
} from "../../components/ui/index.js";

function DocOption({ active, children, onSelect }) {
  return (
    <button className={`option ${active ? "active" : ""}`} onClick={onSelect} type="button">
      <span />
      <div>
        <strong>{children}</strong>
        <small>
          {children === "Passport" ? "Best for international clients" : "Accepted for local verification"}
        </small>
      </div>
    </button>
  );
}

export function KycIntroPage() {
  return (
    <>
      <section className="surface-block">
        <div className="row split top">
          <div>
            <p className="label">Current limit</p>
            <h2>$0 daily</h2>
          </div>
          <span className="status-pill pending">Locked</span>
        </div>
        <div className="progress-track">
          <span style={{ width: "20%" }} />
        </div>
        <div className="feature-list">
          <Feature icon="1">Personal details</Feature>
          <Feature icon="2">Government document</Feature>
          <Feature icon="3">Selfie liveness check</Feature>
          <Feature icon="4">Compliance review</Feature>
        </div>
      </section>
      <section className="surface-block limit-card">
        <strong>After approval</strong>
        <LimitRow label="Daily send" value="$10,000" />
        <LimitRow label="Swap preview" value="Enabled" />
        <LimitRow label="Receive address" value="Enabled" />
      </section>
    </>
  );
}

export function PersonalPage() {
  return (
    <>
      <KycStepper activeIndex={2} />
      <section className="surface-block">
        <div className="form-grid">
          <Field label="Legal first name" value="Hamid" />
          <Field label="Legal last name" value="Demo" />
          <Field label="Date of birth" value="1997-04-18" />
          <Field label="Country" value="Uzbekistan" />
          <Field label="Residential address" value="Tashkent, Yunusabad" />
          <Field label="Telegram handle" value="@demo_client" />
        </div>
      </section>
    </>
  );
}

export function DocumentTypePage({ actions, state }) {
  return (
    <>
      <KycStepper activeIndex={3} />
      <section className="surface-block">
        <h2>Select identity document</h2>
        <div className="option-stack">
          {["Passport", "National ID", "Driver license"].map((type) => (
            <DocOption
              active={state.documentType === type}
              key={type}
              onSelect={() => actions.setDocumentType(type)}
            >
              {type}
            </DocOption>
          ))}
        </div>
      </section>
      <section className="document-preview">
        <div>
          <span className="mini-chip">Selected</span>
          <strong>{state.documentType}</strong>
        </div>
        <span className="doc-lines" />
      </section>
    </>
  );
}

export function DocumentScanPage({ state }) {
  return (
    <>
      <KycStepper activeIndex={4} />
      <section className="scan-frame">
        <div className="scan-corners" />
        <div className="scan-card">
          <span>{state.documentType}</span>
          <b>Demo Client</b>
          <small>MRZ OK - glare low - all edges visible</small>
        </div>
      </section>
      <section className="surface-block compact">
        <CheckRow>All four corners are visible</CheckRow>
        <CheckRow>Name matches personal details</CheckRow>
        <CheckRow>Document is not expired</CheckRow>
      </section>
    </>
  );
}

export function SelfiePage() {
  return (
    <>
      <KycStepper activeIndex={5} />
      <section className="surface-block center">
        <div className="face-ring">
          <span />
        </div>
        <h2>Look straight, then turn slightly left</h2>
        <p>Camera permissions are requested by Telegram Web App at runtime.</p>
        <div className="liveness-row">
          <CheckRow>Face centered</CheckRow>
          <CheckRow>Blink detected</CheckRow>
        </div>
      </section>
    </>
  );
}

export function ReviewPage({ actions }) {
  return (
    <>
      <section className="surface-block center">
        <div className="review-orbit">
          <span />
        </div>
        <h2>Identity review in progress</h2>
        <p>Most checks finish in a few minutes. Wallet actions remain limited during review.</p>
      </section>
      <section className="timeline">
        <TimelineRow stateName="done">Telegram account linked</TimelineRow>
        <TimelineRow stateName="done">Document quality accepted</TimelineRow>
        <TimelineRow stateName="active">Sanctions and PEP screening</TimelineRow>
        <TimelineRow>Wallet limits update</TimelineRow>
      </section>
      <button className="text-action danger" onClick={() => actions.goTo("rejected")} type="button">
        Preview rejected state
      </button>
    </>
  );
}

export function ApprovedPage() {
  return (
    <>
      <section className="success-panel">
        <span className="icon-badge green">OK</span>
        <h2>Wallet access unlocked</h2>
        <p>Receive, send, swap, and activity pages can now be enabled in the client frontend.</p>
      </section>
      <section className="surface-block">
        <LimitRow label="Verification level" value="Tier 1" />
        <LimitRow label="Daily transfer limit" value="$10,000" />
        <LimitRow label="TRON receive address" value="Active" />
      </section>
    </>
  );
}

export function RejectedPage() {
  return (
    <>
      <section className="surface-block warning">
        <div className="row">
          <span className="icon-badge red">!</span>
          <div>
            <h2>Document could not be verified</h2>
            <p>The scan is cropped and the document number is unreadable.</p>
          </div>
        </div>
      </section>
      <section className="surface-block">
        <Feature icon="Fix 1">Use a brighter background</Feature>
        <Feature icon="Fix 2">Keep all document corners inside the frame</Feature>
        <Feature icon="Fix 3">Upload the original government document</Feature>
      </section>
    </>
  );
}

export const kycScreens = {
  kycIntro: {
    title: "Verify identity",
    eyebrow: "KYC required",
    mainLabel: "Start KYC",
    next: "personal",
    back: "passcode",
    Component: KycIntroPage,
  },
  personal: {
    title: "Personal details",
    eyebrow: "Step 1 of 4",
    mainLabel: "Continue",
    next: "documentType",
    back: "kycIntro",
    Component: PersonalPage,
  },
  documentType: {
    title: "Document type",
    eyebrow: "Step 2 of 4",
    mainLabel: "Scan document",
    next: "documentScan",
    back: "personal",
    Component: DocumentTypePage,
  },
  documentScan: {
    title: "Scan document",
    eyebrow: "Step 3 of 4",
    mainLabel: "Use this scan",
    next: "selfie",
    back: "documentType",
    Component: DocumentScanPage,
  },
  selfie: {
    title: "Selfie check",
    eyebrow: "Liveness",
    mainLabel: "Submit for review",
    next: "review",
    back: "documentScan",
    Component: SelfiePage,
  },
  review: {
    title: "Review pending",
    eyebrow: "Almost done",
    mainLabel: "See approved state",
    next: "approved",
    back: "selfie",
    Component: ReviewPage,
  },
  approved: {
    title: "KYC approved",
    eyebrow: "Verified",
    mainLabel: "Open wallet preview",
    next: "walletHome",
    back: "review",
    Component: ApprovedPage,
  },
  rejected: {
    title: "Action required",
    eyebrow: "KYC rejected",
    mainLabel: "Resubmit document",
    next: "documentType",
    back: "review",
    Component: RejectedPage,
  },
};


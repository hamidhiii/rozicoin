import {
  Feature,
  InfoRow,
  SettingsItem,
  ToggleRow,
  WalletTabs,
} from "../../components/ui/index.js";

export function ProfilePage({ actions }) {
  return (
    <>
      <section className="profile-card">
        <div className="avatar">HD</div>
        <h2>Hamid Demo</h2>
        <p>@demo_client</p>
        <span className="status-pill success">KYC Tier 1</span>
      </section>
      <section className="surface-block">
        <SettingsItem title="KYC status" value="Approved" onOpen={() => actions.goTo("limits")} />
        <SettingsItem title="Security" value="Passcode enabled" onOpen={() => actions.goTo("security")} />
        <SettingsItem title="Support" value="Open ticket" onOpen={() => actions.goTo("support")} />
      </section>
      <WalletTabs actions={actions} active="profile" />
    </>
  );
}

export function SecurityPage() {
  return (
    <>
      <section className="surface-block">
        <ToggleRow label="Passcode" enabled />
        <ToggleRow label="Telegram biometric prompt" enabled={false} />
        <ToggleRow label="Address whitelist" enabled />
        <ToggleRow label="Large transfer confirmation" enabled />
      </section>
      <section className="surface-block warning">
        <Feature icon="Device">A new Telegram session would require passcode setup</Feature>
      </section>
    </>
  );
}

export function LimitsPage() {
  return (
    <>
      <section className="surface-block">
        <div className="limit-meter">
          <span style={{ width: "18%" }} />
        </div>
        <InfoRow label="Daily sent" value="$1,845 / $10,000" />
        <InfoRow label="Monthly received" value="$8,420 / $50,000" />
        <InfoRow label="Verification tier" value="Tier 1" />
        <InfoRow label="Next upgrade" value="Proof of address" />
      </section>
      <section className="surface-block">
        <Feature icon="Audit">Every transfer is tied to the verified client profile</Feature>
      </section>
    </>
  );
}

export function SupportPage() {
  return (
    <>
      <section className="surface-block">
        <SettingsItem title="KYC review help" value="Average answer 12 min" onOpen={() => {}} />
        <SettingsItem title="Missing deposit" value="Prepare hash" onOpen={() => {}} />
        <SettingsItem title="Transfer issue" value="Attach receipt" onOpen={() => {}} />
      </section>
      <section className="chat-preview">
        <div className="chat-bubble support">
          Hi, send us the transaction hash and we will check the route.
        </div>
        <div className="chat-bubble client">0x9f4e2a7f...d91a</div>
      </section>
    </>
  );
}

export const settingsScreens = {
  profile: {
    title: "Profile",
    eyebrow: "Client",
    mainLabel: "View limits",
    next: "limits",
    back: "walletHome",
    Component: ProfilePage,
  },
  security: {
    title: "Security",
    eyebrow: "Account",
    mainLabel: "Done",
    next: "profile",
    back: "profile",
    Component: SecurityPage,
  },
  limits: {
    title: "Limits",
    eyebrow: "Compliance",
    mainLabel: "Back to profile",
    next: "profile",
    back: "profile",
    Component: LimitsPage,
  },
  support: {
    title: "Support",
    eyebrow: "Help",
    mainLabel: "Back to wallet",
    next: "walletHome",
    back: "profile",
    Component: SupportPage,
  },
};


import { Feature, InfoRow, RecipientRow } from "../../components/ui/index.js";
import { recentRecipients } from "../../services/walletService.js";

export function SendRecipientPage({ actions, state }) {
  return (
    <>
      <section className="surface-block">
        <label>
          <span>Recipient address</span>
          <input defaultValue={state.sendRecipient} />
        </label>
        <button className="secondary-button scan-button" type="button">
          Scan QR
        </button>
      </section>
      <section className="surface-block">
        <div className="row split">
          <h2>Recent</h2>
          <span className="mini-chip">Trusted</span>
        </div>
        {recentRecipients.map((recipient) => (
          <RecipientRow
            {...recipient}
            key={recipient.address}
            onSelect={() => actions.goTo("sendAmount")}
          />
        ))}
      </section>
    </>
  );
}

export function SendAmountPage({ actions, state }) {
  return (
    <>
      <section className="amount-panel">
        <p>Sending</p>
        <div className="amount-value">${state.sendAmount}</div>
        <div className="balance-chip">Balance: 1,248.40 USDT</div>
      </section>
      <section className="amount-shortcuts">
        <button onClick={() => actions.setAmountPreset(25)} type="button">
          25%
        </button>
        <button onClick={() => actions.setAmountPreset(50)} type="button">
          50%
        </button>
        <button onClick={() => actions.setAmountPreset(100)} type="button">
          Max
        </button>
      </section>
      <section className="surface-block">
        <InfoRow label="Token" value="USDT" />
        <InfoRow label="Network" value={state.network} />
        <InfoRow label="Estimated network fee" value="13.40 TRX" />
      </section>
    </>
  );
}

export function ConfirmTransferPage({ actions, state }) {
  return (
    <>
      <section className="surface-block">
        <div className="confirm-amount">${state.sendAmount}</div>
        <InfoRow label="To" value={state.sendRecipient} />
        <InfoRow label="Asset" value="USDT TRC20" />
        <InfoRow label="Network fee" value="13.40 TRX" />
        <InfoRow label="Total debit" value="$245.00 + fee" />
      </section>
      <section className="surface-block warning">
        <Feature icon="KYC">Transfer will be logged against verified client profile</Feature>
        <Feature icon="Risk">Large transfers can trigger extra review</Feature>
      </section>
      <button className="text-action danger" onClick={() => actions.goTo("transferFailed")} type="button">
        Preview failed state
      </button>
    </>
  );
}

export function TransferSuccessPage({ state }) {
  return (
    <>
      <section className="success-panel">
        <span className="icon-badge green">OK</span>
        <h2>${state.sendAmount} USDT sent</h2>
        <p>The transaction is pending confirmation on {state.network}.</p>
      </section>
      <section className="receipt">
        <InfoRow label="Hash" value="0x9f4...d91a" />
        <InfoRow label="Status" value="Broadcast" />
        <InfoRow label="ETA" value="Under 1 minute" />
      </section>
    </>
  );
}

export function TransferFailedPage() {
  return (
    <>
      <section className="surface-block warning">
        <div className="row">
          <span className="icon-badge red">!</span>
          <div>
            <h2>Not enough TRX for network fee</h2>
            <p>Add TRX or reduce the amount before retrying.</p>
          </div>
        </div>
      </section>
      <section className="surface-block">
        <InfoRow label="Required fee" value="13.40 TRX" />
        <InfoRow label="Available TRX" value="3.18 TRX" />
        <InfoRow label="Suggested action" value="Buy or receive TRX" />
      </section>
    </>
  );
}

export const sendScreens = {
  sendRecipient: {
    title: "Send",
    eyebrow: "Recipient",
    mainLabel: "Continue",
    next: "sendAmount",
    back: "walletHome",
    Component: SendRecipientPage,
  },
  sendAmount: {
    title: "Amount",
    eyebrow: "USDT TRC20",
    mainLabel: "Review transfer",
    next: "confirmTransfer",
    back: "sendRecipient",
    Component: SendAmountPage,
  },
  confirmTransfer: {
    title: "Confirm",
    eyebrow: "Final check",
    mainLabel: "Send payment",
    next: "transferSuccess",
    back: "sendAmount",
    Component: ConfirmTransferPage,
  },
  transferSuccess: {
    title: "Sent",
    eyebrow: "Payment complete",
    mainLabel: "View activity",
    next: "activity",
    back: "confirmTransfer",
    Component: TransferSuccessPage,
  },
  transferFailed: {
    title: "Transfer failed",
    eyebrow: "Action needed",
    mainLabel: "Edit amount",
    next: "sendAmount",
    back: "confirmTransfer",
    Component: TransferFailedPage,
  },
};


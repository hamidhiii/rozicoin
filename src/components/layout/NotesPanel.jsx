import { Note } from "../ui/Note.jsx";

export function NotesPanel() {
  return (
    <aside className="notes-panel">
      <p className="label">Prototype goal</p>
      <h2>Client-side Telegram Web App flow</h2>
      <p>
        Designed from Trust Wallet-style mobile patterns, adapted for regulated payment
        onboarding and KYC gating.
      </p>
      <div className="note-list">
        <Note title="Telegram-aware shell">
          Back and main actions stay fixed like a Mini App.
        </Note>
        <Note title="KYC before wallet">
          Every money action is gated by identity review.
        </Note>
        <Note title="Frontend only">Demo screens use mock data and local UI state.</Note>
      </div>
    </aside>
  );
}


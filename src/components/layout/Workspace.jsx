import { FlowPanel } from "./FlowPanel.jsx";
import { NotesPanel } from "./NotesPanel.jsx";
import { PhoneShell } from "./PhoneShell.jsx";

export function Workspace({ controller, flows, isIntroActive, screen }) {
  return (
    <div className={`workspace ${isIntroActive ? "is-intro-active" : ""}`}>
      <FlowPanel controller={controller} flows={flows} />
      <main className="phone-stage">
        <PhoneShell controller={controller} screen={screen} />
      </main>
      <NotesPanel />
    </div>
  );
}


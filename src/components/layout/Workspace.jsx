import { FlowPanel } from "./FlowPanel.jsx";
import { PhoneShell } from "./PhoneShell.jsx";

export function Workspace({ controller, flows, isIntroActive, screen }) {
  return (
    <div className={`workspace ${isIntroActive ? "is-intro-active" : ""}`}>
      <main className="phone-stage">
        <PhoneShell controller={controller} screen={screen} />
      </main>
      <FlowPanel controller={controller} flows={flows} />
    </div>
  );
}

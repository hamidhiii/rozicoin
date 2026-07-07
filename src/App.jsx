import { useEffect } from "react";
import { IntroOverlay } from "./components/intro/IntroOverlay.jsx";
import { Workspace } from "./components/layout/Workspace.jsx";
import { flows } from "./data/flows.js";
import { useAppController } from "./hooks/useAppController.js";
import { screenRegistry } from "./pages/index.js";

export default function App() {
  const controller = useAppController(screenRegistry);
  const { state, actions } = controller;
  const screen = screenRegistry[state.screen] ?? screenRegistry.splash;

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.motion = state.motionEnabled ? "on" : "reduced";
  }, [state.motionEnabled, state.theme]);

  return (
    <>
      {state.showIntro ? <IntroOverlay onDismiss={actions.dismissIntro} /> : null}
      <Workspace
        controller={controller}
        flows={flows}
        isIntroActive={state.showIntro}
        screen={screen}
      />
    </>
  );
}


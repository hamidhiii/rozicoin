export function FlowPanel({ controller, flows }) {
  const { actions, state } = controller;
  const activeGroup = flows.find((group) =>
    group.screens.some(([id]) => id === state.screen),
  );

  return (
    <aside className="flow-panel" aria-label="Prototype screens">
      <div className="brand-row">
        <span className="brand-mark">R</span>
        <div>
          <strong>Demo map</strong>
          <small>{activeGroup?.title ?? "Rozicoin"} flow</small>
        </div>
      </div>

      <div className="flow-list">
        {flows.map((group) => (
          <section
            className={group.title === activeGroup?.title ? "active-group" : ""}
            key={group.title}
          >
            <p>{group.title}</p>
            <div>
              {group.screens.map(([id, label]) => (
                <button
                  className={id === state.screen ? "active" : ""}
                  key={id}
                  onClick={() => actions.goTo(id)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <button className="theme-button" onClick={actions.toggleTheme} type="button">
        {state.theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  );
}

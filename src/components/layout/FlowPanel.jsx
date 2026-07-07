export function FlowPanel({ controller, flows }) {
  const { actions, state } = controller;

  return (
    <aside className="flow-panel" aria-label="Prototype screens">
      <div className="brand-row">
        <span className="brand-mark">R</span>
        <div>
          <strong>Rozicoin</strong>
          <small>Telegram client demo</small>
        </div>
      </div>

      <div className="flow-list">
        {flows.map((group) => (
          <section key={group.title}>
            <p>{group.title}</p>
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
          </section>
        ))}
      </div>

      <button className="theme-button" onClick={actions.toggleTheme} type="button">
        {state.theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  );
}


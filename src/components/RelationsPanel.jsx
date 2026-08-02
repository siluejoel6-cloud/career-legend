function MiniBar({ value, color }) {
  return (
    <div className="stat-bar w-24">
      <span style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export default function RelationsPanel({ relations }) {
  const { agent, coach, rival, coequipiers } = relations;

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5">
      <h3 className="font-head text-sm tracking-wide text-[var(--ink-dim)] mb-4">TON ENTOURAGE</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-head">{agent.nom}</p>
            <p className="text-[11px] text-[var(--ink-dim)]">Agent</p>
          </div>
          <MiniBar value={agent.confiance} color="var(--pitch-light)" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-head">{coach.nom}</p>
            <p className="text-[11px] text-[var(--ink-dim)]">Coach</p>
          </div>
          <MiniBar value={coach.confiance} color="var(--pitch-light)" />
        </div>

        {coequipiers.map((c, i) => (
          <div className="flex items-center justify-between" key={i}>
            <div>
              <p className="text-sm font-head">{c.nom}</p>
              <p className="text-[11px] text-[var(--ink-dim)]">Coéquipier</p>
            </div>
            <MiniBar value={c.complicite} color="var(--floodlight)" />
          </div>
        ))}

        <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
          <div>
            <p className="text-sm font-head text-[var(--hot)]">{rival.nom}</p>
            <p className="text-[11px] text-[var(--ink-dim)]">
              Rival · {rival.titresRival} titre{rival.titresRival !== 1 ? "s" : ""}
            </p>
          </div>
          <MiniBar value={rival.tension} color="var(--hot)" />
        </div>
      </div>
    </div>
  );
}

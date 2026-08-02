export default function Ticker({ items }) {
  const content = items.length ? items : ["En attente des premières informations sur ta carrière..."];
  const doubled = [...content, ...content];

  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--surface)] whitespace-nowrap">
      <div className="ticker-track inline-flex py-2">
        {doubled.map((t, i) => (
          <span key={i} className="font-mono text-xs text-[var(--ink-dim)] px-6 inline-flex items-center gap-2">
            <span className="text-[var(--floodlight)]">●</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

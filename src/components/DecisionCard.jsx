export default function DecisionCard({ texte, choix, onChoisir, badge }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--floodlight)]/40 rounded-2xl p-6 shadow-2xl">
        {badge && (
          <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--floodlight)] mb-3">{badge}</p>
        )}
        <p className="font-head text-lg leading-snug mb-6">{texte}</p>
        <div className="space-y-2">
          {choix.map((c, i) => (
            <button
              key={i}
              onClick={() => onChoisir(i)}
              className="w-full text-left rounded-lg px-4 py-3 border border-[var(--line)] hover:border-[var(--floodlight)] hover:bg-[var(--floodlight)]/5 transition-colors"
            >
              {c.texte}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

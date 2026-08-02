export default function SocialFeed({ posts }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5 h-full flex flex-col">
      <h3 className="font-head text-sm tracking-wide text-[var(--ink-dim)] mb-3">RÉSEAUX · PICSTAR &amp; PULSE</h3>
      <div className="space-y-2 overflow-y-auto feed-scroll pr-1 flex-1 max-h-72">
        {posts.length === 0 && (
          <p className="text-sm text-[var(--ink-dim)] italic">Aucune activité pour le moment.</p>
        )}
        {posts.map((p) => (
          <div
            key={p.id}
            className={`rounded-lg px-3 py-2 text-sm border-l-2 ${
              p.type === "hater"
                ? "border-[var(--hot)] bg-[var(--hot)]/5"
                : "border-[var(--pitch-light)] bg-[var(--pitch-light)]/5"
            }`}
          >
            <p className="text-[var(--ink)]">{p.texte}</p>
            <p className="font-mono text-[10px] text-[var(--ink-dim)] mt-1">Saison {p.saison}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PressFeed({ articles }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5 h-full flex flex-col">
      <h3 className="font-head text-sm tracking-wide text-[var(--ink-dim)] mb-3">PRESSE &amp; MÉDIAS</h3>
      <div className="space-y-3 overflow-y-auto feed-scroll pr-1 flex-1 max-h-72">
        {articles.length === 0 && (
          <p className="text-sm text-[var(--ink-dim)] italic">Aucun article pour le moment.</p>
        )}
        {articles.map((a) => (
          <div key={a.id} className="border border-[var(--line)] rounded-lg px-3 py-2">
            <p className="font-head text-sm">{a.texte}</p>
            <p className="font-mono text-[10px] text-[var(--ink-dim)] mt-1">{a.role} — Saison {a.saison}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

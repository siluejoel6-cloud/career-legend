export default function PalmaresPanel({ historique }) {
  const { statistiquesParSaison = [], titres = [] } = historique;

  const totaux = statistiquesParSaison.reduce(
    (acc, s) => ({
      matchs: acc.matchs + s.matchsJoues,
      buts: acc.buts + s.buts,
      passes: acc.passes + s.passes,
      sommeNotes: acc.sommeNotes + (s.note ?? 0),
    }),
    { matchs: 0, buts: 0, passes: 0, sommeNotes: 0 }
  );
  const derniere = statistiquesParSaison[statistiquesParSaison.length - 1];
  const noteMoyenne = statistiquesParSaison.length > 0 ? (totaux.sommeNotes / statistiquesParSaison.length).toFixed(1) : "—";

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5">
      <h3 className="font-head text-sm tracking-wide text-[var(--ink-dim)] mb-4">CARRIÈRE EN CHIFFRES</h3>

      <div className="grid grid-cols-4 gap-2 text-center font-mono mb-5">
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-lg">{totaux.matchs}</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">MATCHS</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-lg text-[var(--floodlight)]">{totaux.buts}</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">BUTS</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-lg text-[var(--pitch-light)]">{totaux.passes}</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">PASSES D.</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-lg">{noteMoyenne}</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">NOTE MOY.</p>
        </div>
      </div>

      {derniere && (
        <p className="text-xs text-[var(--ink-dim)] mb-4">
          Dernière saison : note {derniere.note}/10 {derniere.note >= 7.3 ? "— forme idéale pour attirer les gros clubs 🔥" : derniere.note < 5.5 ? "— les recruteurs se font discrets" : ""}
        </p>
      )}

      <p className="text-xs text-[var(--ink-dim)] mb-2 font-head">Palmarès</p>
      {titres.length === 0 && (
        <p className="text-sm text-[var(--ink-dim)] italic">Aucun titre pour l'instant.</p>
      )}
      {titres.length > 0 && (
        <div className="space-y-1.5 max-h-32 overflow-y-auto feed-scroll pr-1">
          {[...titres].reverse().map((t, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>🏆 {t.nom}</span>
              <span className="font-mono text-[var(--ink-dim)] text-xs">S{t.saison}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

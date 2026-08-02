import { BIENS_DISPONIBLES } from "../data/gameData";

export default function FinanceFamillePanel({ state, onAcheter, onViePerso }) {
  const { finances, viePerso } = state;
  const biensPossedes = new Set(finances.biens.map((b) => b.id));

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5">
      <h3 className="font-head text-sm tracking-wide text-[var(--ink-dim)] mb-4">PATRIMOINE &amp; VIE PRIVÉE</h3>

      <div className="mb-5">
        <p className="text-xs text-[var(--ink-dim)] mb-2 font-head">Biens à acquérir</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BIENS_DISPONIBLES.map((b) => {
            const possede = biensPossedes.has(b.id);
            const abordable = finances.argent >= b.prix;
            return (
              <button
                key={b.id}
                disabled={possede || !abordable}
                onClick={() => onAcheter(b)}
                className={`text-left rounded-lg px-3 py-2 border text-sm transition-colors ${
                  possede
                    ? "border-[var(--pitch-light)] bg-[var(--pitch-light)]/10 text-[var(--pitch-light)] cursor-default"
                    : abordable
                    ? "border-[var(--line)] hover:border-[var(--floodlight)]"
                    : "border-[var(--line)] opacity-40 cursor-not-allowed"
                }`}
              >
                <p className="font-head">{b.nom}</p>
                <p className="font-mono text-[11px] text-[var(--ink-dim)]">
                  {possede ? "Acquis" : `${b.prix.toLocaleString("fr-FR")} €`}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {finances.sponsors.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-[var(--ink-dim)] mb-2 font-head">Sponsors actifs</p>
          <div className="flex flex-wrap gap-2">
            {finances.sponsors.map((s, i) => (
              <span key={i} className="font-mono text-[11px] bg-[var(--surface-2)] rounded-full px-3 py-1">
                {s.nom} · {s.montant.toLocaleString("fr-FR")}€
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs text-[var(--ink-dim)] mb-2 font-head">Vie privée</p>
        <div className="flex flex-wrap gap-2">
          {!viePerso.enCouple && (
            <button
              onClick={() => onViePerso("mise_en_couple")}
              className="text-sm rounded-lg px-3 py-2 border border-[var(--line)] hover:border-[var(--floodlight)]"
            >
              Officialiser une relation
            </button>
          )}
          {viePerso.enCouple && (
            <button
              onClick={() => onViePerso("enfant")}
              className="text-sm rounded-lg px-3 py-2 border border-[var(--line)] hover:border-[var(--floodlight)]"
            >
              Agrandir la famille ({viePerso.enfants} enfant{viePerso.enfants > 1 ? "s" : ""})
            </button>
          )}
          {viePerso.enCouple && (
            <span className="text-sm rounded-lg px-3 py-2 bg-[var(--surface-2)] text-[var(--ink-dim)]">
              En couple
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

import { ENFANCES, NATIONALITES } from "../data/gameData";

const BARRES = [
  { key: "technique", label: "Technique", couleur: "var(--pitch-light)" },
  { key: "physique", label: "Physique", couleur: "var(--pitch-light)" },
  { key: "mental", label: "Mental", couleur: "var(--pitch-light)" },
  { key: "forme", label: "Forme", couleur: "var(--floodlight)" },
  { key: "reputation", label: "Réputation", couleur: "var(--floodlight)" },
];

export default function StatsPanel({ state }) {
  const { identite, age, saison, stats, finances, viePerso, blessureActuelle, historique } = state;
  const enfance = ENFANCES.find((e) => e.id === historique?.enfance);
  const nationalite = NATIONALITES.find((n) => n.id === identite.nationalite);

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-display text-2xl">{identite.nom}</h2>
        <span className="font-mono text-xs text-[var(--ink-dim)]">S{saison} · {age} ANS</span>
      </div>
      <p className="text-sm text-[var(--ink-dim)]">{nationalite?.drapeau} {identite.club}</p>
      {enfance && (
        <p className="text-xs text-[var(--ink-dim)] italic mb-4">{enfance.label}</p>
      )}
      {!enfance && <div className="mb-4" />}

      {blessureActuelle && (
        <div className="mb-4 rounded-lg border border-[var(--hot)]/40 bg-[var(--hot)]/10 px-3 py-2">
          <p className="font-head text-sm text-[var(--hot)]">🩹 {blessureActuelle.nom}</p>
          <p className="font-mono text-[11px] text-[var(--ink-dim)]">
            Indisponible {blessureActuelle.saisonsRestantes} saison{blessureActuelle.saisonsRestantes > 1 ? "s" : ""} de plus
          </p>
        </div>
      )}

      <div className="space-y-3 mb-5">
        {BARRES.map((b) => (
          <div key={b.key}>
            <div className="flex justify-between text-xs font-head mb-1">
              <span className="text-[var(--ink-dim)]">{b.label}</span>
              <span className="font-mono">{Math.round(stats[b.key])}</span>
            </div>
            <div className="stat-bar">
              <span style={{ width: `${stats[b.key]}%`, background: b.couleur }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center font-mono">
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-[var(--floodlight)] text-lg">{Math.round(stats.followers).toLocaleString("fr-FR")}</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">FOLLOWERS</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-[var(--hot)] text-lg">{Math.round(stats.hateRatio)}%</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">HATE RATIO</p>
        </div>
        <div className="bg-[var(--surface-2)] rounded-lg py-3">
          <p className="text-[var(--pitch-light)] text-lg">{finances.argent.toLocaleString("fr-FR")}€</p>
          <p className="text-[10px] text-[var(--ink-dim)] mt-1">FORTUNE</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--line)] flex justify-between text-xs font-head text-[var(--ink-dim)]">
        <span>Stabilité perso</span>
        <span className="font-mono text-[var(--ink)]">{Math.round(viePerso.stabilite)}/100</span>
      </div>
    </div>
  );
}

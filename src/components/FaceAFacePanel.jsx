export default function FaceAFacePanel({ state, rivalStats, totaux }) {
  const vousOVR = Math.round((state.stats.technique + state.stats.physique + state.stats.mental + state.stats.reputation) / 4);
  const vousGagne = totaux.buts >= rivalStats.buts;

  let verdict;
  if (Math.abs(totaux.buts - rivalStats.buts) < 5) {
    verdict = `Un face-à-face aussi serré que la rivalité elle-même : difficile de départager ${state.identite.nom} et ${rivalStats.nom}.`;
  } else if (vousGagne) {
    verdict = `Tu surpasses largement ${rivalStats.nom} sur cette carrière : cette rivalité n'en aura jamais vraiment été une.`;
  } else {
    verdict = `${rivalStats.nom} termine devant toi sur cette carrière. Le duel de toute une vie, tranché par les chiffres.`;
  }

  const lignes = [
    { label: "OVR max", vous: vousOVR, rival: rivalStats.ovrMax },
    { label: "Matchs", vous: totaux.matchs, rival: rivalStats.matchs },
    { label: "Buts", vous: totaux.buts, rival: rivalStats.buts },
    { label: "Titres", vous: state.historique.titres.length, rival: rivalStats.titres },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-5 text-left">
      <h3 className="font-head text-sm tracking-wide text-[var(--ink-dim)] mb-4 text-center">FACE À FACE · TOUTE UNE CARRIÈRE</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-head text-sm mb-2">{state.identite.nom}</p>
          {lignes.map((l) => (
            <div key={l.label} className="flex justify-between text-sm py-1 border-b border-[var(--line)]/50">
              <span className="text-[var(--ink-dim)]">{l.label}</span>
              <span className={`font-mono ${l.vous >= l.rival ? "text-[var(--floodlight)]" : ""}`}>{l.vous}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="font-head text-sm mb-2 text-[var(--hot)]">{rivalStats.nom}</p>
          {lignes.map((l) => (
            <div key={l.label} className="flex justify-between text-sm py-1 border-b border-[var(--line)]/50">
              <span className="text-[var(--ink-dim)] opacity-0">{l.label}</span>
              <span className={`font-mono ${l.rival > l.vous ? "text-[var(--hot)]" : ""}`}>{l.rival}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-[var(--ink-dim)] italic text-center">{verdict}</p>
    </div>
  );
}

import { useState } from "react";
import { POSTES, PERSONNALITES, CLUBS_DEPART, ENFANCES } from "../data/gameData";

export default function CharacterCreation({ onStart, onContinue, hasSave, chargementEnCours }) {
  const [nom, setNom] = useState("");
  const [poste, setPoste] = useState(POSTES[2].id);
  const [personnalite, setPersonnalite] = useState(PERSONNALITES[0].id);
  const [club, setClub] = useState(CLUBS_DEPART[0]);
  const [enfance, setEnfance] = useState(ENFANCES[1].id);

  const pers = PERSONNALITES.find((p) => p.id === personnalite);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nom.trim()) return;
    onStart({
      nom: nom.trim(),
      poste,
      personnalite,
      club,
      enfance,
      followersInit: pers?.effets.followers ? 300 + pers.effets.followers : 300,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <p className="font-mono text-xs tracking-[0.3em] text-[var(--floodlight)] mb-2">SAISON 1 · ÂGE 16 ANS</p>
        <h1 className="font-display text-4xl sm:text-5xl mb-1 leading-none">CRÉE TA LÉGENDE</h1>
        <p className="text-[var(--ink-dim)] mb-8">Chaque choix compte. Sur le terrain, sur les réseaux, à la maison.</p>

        {hasSave && (
          <button
            type="button"
            onClick={onContinue}
            disabled={chargementEnCours}
            className="w-full mb-6 font-head text-base bg-[var(--surface)] border border-[var(--floodlight)] text-[var(--floodlight)] rounded-lg py-3 hover:bg-[var(--floodlight)]/10 transition-colors disabled:opacity-50"
          >
            {chargementEnCours ? "Chargement..." : "Reprendre la carrière en cours →"}
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6">
          <div>
            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Nom de joueur</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex : Ismaël Koné"
              className="w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-4 py-3 outline-none focus:border-[var(--floodlight)] transition-colors"
              maxLength={30}
            />
          </div>

          <div>
            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Poste</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {POSTES.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPoste(p.id)}
                  className={`rounded-lg px-3 py-2 text-sm border transition-colors ${
                    poste === p.id
                      ? "border-[var(--floodlight)] bg-[var(--floodlight)]/10 text-[var(--floodlight)]"
                      : "border-[var(--line)] text-[var(--ink-dim)] hover:border-[var(--ink-dim)]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Personnalité</label>
            <div className="space-y-2">
              {PERSONNALITES.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPersonnalite(p.id)}
                  className={`w-full text-left rounded-lg px-4 py-3 border transition-colors ${
                    personnalite === p.id
                      ? "border-[var(--floodlight)] bg-[var(--floodlight)]/10"
                      : "border-[var(--line)] hover:border-[var(--ink-dim)]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Ton enfance</label>
            <div className="space-y-2">
              {ENFANCES.map((e) => (
                <button
                  type="button"
                  key={e.id}
                  onClick={() => setEnfance(e.id)}
                  className={`w-full text-left rounded-lg px-4 py-3 border transition-colors ${
                    enfance === e.id
                      ? "border-[var(--floodlight)] bg-[var(--floodlight)]/10"
                      : "border-[var(--line)] hover:border-[var(--ink-dim)]"
                  }`}
                >
                  <p className="font-head text-sm">{e.label}</p>
                  <p className="text-xs text-[var(--ink-dim)] mt-0.5">{e.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Club formateur</label>
            <select
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-4 py-3 outline-none focus:border-[var(--floodlight)]"
            >
              {CLUBS_DEPART.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full font-head text-lg tracking-wide bg-[var(--floodlight)] text-[#14140f] rounded-lg py-3 font-semibold hover:brightness-110 transition-all"
          >
            Démarrer la carrière
          </button>
        </form>
      </div>
    </div>
  );
}

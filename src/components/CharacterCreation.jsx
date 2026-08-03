import { useState } from "react";
import {
  POSTES,
  PERSONNALITES,
  CLUBS_DEPART,
  ENFANCES,
  ADOLESCENCES,
  ENTOURAGES,
  NATIONALITES,
} from "../data/gameData";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Étapes du parcours de création. "nom" et "club" sont gérées à part
// (saisie libre / sélection finale), les autres sont des étapes à cartes.
const ETAPES_CARTES = [
  { key: "nationalite", titre: "Votre nationalité", sous: "Le pays qui te verra grandir sur les terrains.", options: NATIONALITES, grille: true },
  { key: "poste", titre: "Votre poste", sous: "Il façonnera tes statistiques, tes événements et ta légende.", options: POSTES },
  { key: "personnalite", titre: "Votre personnalité", sous: "Ce trait influencera chaque grande décision de ta carrière.", options: PERSONNALITES },
  { key: "enfance", titre: "Votre origine", sous: "D'où viens-tu, avant les projecteurs ?", options: ENFANCES },
  { key: "adolescence", titre: "Votre adolescence", sous: "Le mode de vie qui a forgé ta discipline... et ta réputation.", options: ADOLESCENCES },
  { key: "entourage", titre: "Votre entourage", sous: "Qui gère tes intérêts avant même ton premier contrat ?", options: ENTOURAGES },
];

const TOTAL_ETAPES = 2 + ETAPES_CARTES.length; // nom + [cartes] + club

export default function CharacterCreation({ onStart, onContinue, hasSave, chargementEnCours }) {
  const [etape, setEtape] = useState(0);
  const [nom, setNom] = useState("");
  const [club, setClub] = useState(CLUBS_DEPART[0]);
  const [choix, setChoix] = useState({
    nationalite: NATIONALITES[0].id,
    poste: POSTES[2].id,
    personnalite: PERSONNALITES[0].id,
    enfance: ENFANCES[1].id,
    adolescence: ADOLESCENCES[1].id,
    entourage: ENTOURAGES[0].id,
  });

  function selectionner(cle, valeur) {
    setChoix((c) => ({ ...c, [cle]: valeur }));
  }

  function toutAleatoire() {
    setChoix({
      nationalite: pick(NATIONALITES).id,
      poste: pick(POSTES).id,
      personnalite: pick(PERSONNALITES).id,
      enfance: pick(ENFANCES).id,
      adolescence: pick(ADOLESCENCES).id,
      entourage: pick(ENTOURAGES).id,
    });
    setClub(pick(CLUBS_DEPART));
    setEtape(TOTAL_ETAPES - 1);
  }

  function suivant() {
    setEtape((e) => Math.min(e + 1, TOTAL_ETAPES - 1));
  }
  function precedent() {
    setEtape((e) => Math.max(e - 1, 0));
  }

  function lancerCarriere() {
    if (!nom.trim()) return;
    const pers = PERSONNALITES.find((p) => p.id === choix.personnalite);
    onStart({
      nom: nom.trim(),
      club,
      ...choix,
      followersInit: pers?.effets.followers ? 300 + pers.effets.followers : 300,
    });
  }

  const estEtapeNom = etape === 0;
  const estEtapeClub = etape === TOTAL_ETAPES - 1;
  const etapeCarte = !estEtapeNom && !estEtapeClub ? ETAPES_CARTES[etape - 1] : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Barre de progression + tout aléatoire */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_ETAPES }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-6 rounded-full transition-colors"
                style={{ background: i === etape ? "var(--floodlight)" : i < etape ? "var(--pitch-light)" : "var(--line)" }}
              />
            ))}
          </div>
          {hasSave ? (
            <button
              type="button"
              onClick={onContinue}
              disabled={chargementEnCours}
              className="font-mono text-xs text-[var(--floodlight)] hover:underline disabled:opacity-50"
            >
              {chargementEnCours ? "Chargement..." : "Reprendre ma carrière →"}
            </button>
          ) : (
            <button type="button" onClick={toutAleatoire} className="font-mono text-xs text-[var(--ink-dim)] hover:text-[var(--floodlight)]">
              🎲 Tout aléatoire
            </button>
          )}
        </div>

        {/* Étape : Nom */}
        {estEtapeNom && (
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-[var(--floodlight)] mb-2">SAISON 1 · ÂGE 16 ANS</p>
            <h1 className="font-display text-4xl sm:text-5xl mb-1 leading-none">CRÉE TA LÉGENDE</h1>
            <p className="text-[var(--ink-dim)] mb-8">Chaque choix compte. Sur le terrain, sur les réseaux, à la maison.</p>
            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Ton nom de joueur</label>
            <input
              autoFocus
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && nom.trim() && suivant()}
              placeholder="Ex : Ismaël Koné"
              className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-lg px-4 py-3 outline-none focus:border-[var(--floodlight)] transition-colors mb-6"
              maxLength={30}
            />
            <button
              onClick={suivant}
              disabled={!nom.trim()}
              className="w-full font-head text-lg bg-[var(--floodlight)] text-[#14140f] rounded-lg py-3 font-semibold hover:brightness-110 disabled:opacity-40 transition-all"
            >
              Suivant →
            </button>
          </div>
        )}

        {/* Étapes à cartes */}
        {etapeCarte && (
          <div>
            <h1 className="font-display text-3xl sm:text-4xl mb-1 leading-tight">{etapeCarte.titre.toUpperCase()}</h1>
            <p className="text-[var(--ink-dim)] mb-6">{etapeCarte.sous}</p>

            {etapeCarte.grille ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                {etapeCarte.options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => selectionner(etapeCarte.key, o.id)}
                    className={`rounded-lg py-3 px-2 border text-center transition-colors ${
                      choix[etapeCarte.key] === o.id
                        ? "border-[var(--floodlight)] bg-[var(--floodlight)]/10"
                        : "border-[var(--line)] hover:border-[var(--ink-dim)]"
                    }`}
                  >
                    <div className="text-2xl mb-1">{o.drapeau}</div>
                    <div className="text-xs">{o.label}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {etapeCarte.options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => selectionner(etapeCarte.key, o.id)}
                    className={`w-full text-left rounded-lg px-4 py-3 border transition-colors ${
                      choix[etapeCarte.key] === o.id
                        ? "border-[var(--floodlight)] bg-[var(--floodlight)]/10"
                        : "border-[var(--line)] hover:border-[var(--ink-dim)]"
                    }`}
                  >
                    <p className="font-head text-sm">{o.label}</p>
                    {o.description && <p className="text-xs text-[var(--ink-dim)] mt-0.5">{o.description}</p>}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={precedent} className="font-head text-sm border border-[var(--line)] rounded-lg px-4 py-3 text-[var(--ink-dim)] hover:border-[var(--ink-dim)]">
                ← Retour
              </button>
              <button onClick={suivant} className="flex-1 font-head text-lg bg-[var(--floodlight)] text-[#14140f] rounded-lg py-3 font-semibold hover:brightness-110 transition-all">
                Suivant →
              </button>
            </div>
          </div>
        )}

        {/* Étape finale : club + récap */}
        {estEtapeClub && (
          <div>
            <h1 className="font-display text-3xl sm:text-4xl mb-1 leading-tight">DERNIÈRE ÉTAPE</h1>
            <p className="text-[var(--ink-dim)] mb-6">Choisis ton club formateur pour démarrer l'aventure.</p>

            <label className="font-head text-sm text-[var(--ink-dim)] block mb-2">Club formateur</label>
            <select
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-lg px-4 py-3 outline-none focus:border-[var(--floodlight)] mb-6"
            >
              {CLUBS_DEPART.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4 mb-6 text-sm text-[var(--ink-dim)] space-y-1">
              <p><span className="text-[var(--ink)]">{nom || "Ton joueur"}</span> · {NATIONALITES.find((n) => n.id === choix.nationalite)?.drapeau} {NATIONALITES.find((n) => n.id === choix.nationalite)?.label}</p>
              <p>{POSTES.find((p) => p.id === choix.poste)?.label} · {PERSONNALITES.find((p) => p.id === choix.personnalite)?.label}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={precedent} className="font-head text-sm border border-[var(--line)] rounded-lg px-4 py-3 text-[var(--ink-dim)] hover:border-[var(--ink-dim)]">
                ← Retour
              </button>
              <button
                onClick={lancerCarriere}
                disabled={!nom.trim()}
                className="flex-1 font-head text-lg bg-[var(--floodlight)] text-[#14140f] rounded-lg py-3 font-semibold hover:brightness-110 disabled:opacity-40 transition-all"
              >
                Démarrer la carrière
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

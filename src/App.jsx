import { useState, useEffect } from "react";
import CharacterCreation from "./components/CharacterCreation";
import Ticker from "./components/Ticker";
import StatsPanel from "./components/StatsPanel";
import RelationsPanel from "./components/RelationsPanel";
import SocialFeed from "./components/SocialFeed";
import PressFeed from "./components/PressFeed";
import FinanceFamillePanel from "./components/FinanceFamillePanel";
import PalmaresPanel from "./components/PalmaresPanel";
import FaceAFacePanel from "./components/FaceAFacePanel";
import DecisionCard from "./components/DecisionCard";
import { RECONVERSIONS } from "./data/gameData";
import {
  createInitialState,
  getDecisionDisponible,
  resoudreDecision,
  tirerEvenement,
  resoudreEvenement,
  avancerSaison,
  genererReactionsAutomatiques,
  acheterBien,
  evenementViePerso,
  scoreCarriere,
  genererStatsRivalFinal,
} from "./engine/gameEngine";
import {
  sauvegarder,
  chargerSauvegarde,
  effacerSauvegarde,
  aUneSauvegarde,
  enregistrerCarriereTerminee,
  calculerPercentile,
} from "./engine/saveSystem";

export default function App() {
  const [state, setState] = useState(null);
  const [pending, setPending] = useState(null); // { type: 'decision' | 'evenement', data }
  const [hasSave, setHasSave] = useState(aUneSauvegarde());
  const [chargementEnCours, setChargementEnCours] = useState(false);
  const [percentile, setPercentile] = useState(null);
  const [carriereEnregistree, setCarriereEnregistree] = useState(false);

  // Au démarrage, vérifie s'il existe une sauvegarde cloud (autre appareil par ex.)
  useEffect(() => {
    chargerSauvegarde().then((save) => {
      if (save) setHasSave(true);
    });
  }, []);

  // Sauvegarde automatique (locale + cloud) à chaque changement de state
  useEffect(() => {
    if (state && state.enCarriere) {
      sauvegarder(state);
      setHasSave(true);
    }
  }, [state]);

  // À la fin d'une carrière : enregistrement pour le classement + calcul du percentile réel
  useEffect(() => {
    if (state && !state.enCarriere && !carriereEnregistree) {
      setCarriereEnregistree(true);
      const score = scoreCarriere(state);
      enregistrerCarriereTerminee(state, score);
      calculerPercentile(score).then(setPercentile);
    }
  }, [state, carriereEnregistree]);

  function handleStart(profile) {
    effacerSauvegarde();
    setCarriereEnregistree(false);
    setPercentile(null);
    setState(createInitialState(profile));
  }

  async function handleContinuer() {
    setChargementEnCours(true);
    const save = await chargerSauvegarde();
    setChargementEnCours(false);
    if (save) {
      setState(save);
      checkNext(save);
    }
  }

  // Cherche la prochaine chose a resoudre : decision de saison en attente, sinon evenement aleatoire
  function checkNext(current) {
    const decision = getDecisionDisponible(current);
    if (decision) {
      setPending({ type: "decision", data: decision });
      return;
    }
    const evenement = tirerEvenement(current);
    if (evenement) {
      setPending({ type: "evenement", data: evenement });
      return;
    }
    setPending(null);
  }

  function handleChoix(index) {
    let next;
    if (pending.type === "decision") {
      next = resoudreDecision(state, pending.data, index);
    } else {
      next = resoudreEvenement(state, pending.data, index);
    }
    setState(next);
    setPending(null);
    checkNext(next);
  }

  function handleAvancerSaison() {
    let next = avancerSaison(state);
    next = genererReactionsAutomatiques(next);
    setState(next);
    checkNext(next);
  }

  function handleAcheter(bien) {
    setState((s) => acheterBien(s, bien));
  }

  function handleViePerso(action) {
    setState((s) => evenementViePerso(s, action));
  }

  if (!state) {
    return (
      <CharacterCreation
        onStart={handleStart}
        onContinue={handleContinuer}
        hasSave={hasSave}
        chargementEnCours={chargementEnCours}
      />
    );
  }

  const tickerItems = state.feedPresse.slice(0, 8).map((a) => a.texte.replace(/^[^:]+: /, ""));

  if (!state.enCarriere) {
    const score = scoreCarriere(state);
    const reconversion = RECONVERSIONS.find((r) => r.id === state.historique.reconversion);
    const totaux = (state.historique.statistiquesParSaison ?? []).reduce(
      (acc, s) => ({ buts: acc.buts + s.buts, passes: acc.passes + s.passes, matchs: acc.matchs + s.matchsJoues }),
      { buts: 0, passes: 0, matchs: 0 }
    );
    const rivalStats = genererStatsRivalFinal(state);
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="max-w-lg w-full text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-[var(--floodlight)] mb-3">CARRIERE TERMINEE</p>
          <h1 className="font-display text-5xl mb-4">{state.identite.nom}</h1>
          <p className="text-[var(--ink-dim)] mb-2">
            {state.saison - 1} saisons professionnelles, retraite a {state.age} ans.
          </p>
          <p className="text-[var(--ink-dim)] mb-8 font-mono text-sm">
            {totaux.buts} buts · {totaux.passes} passes décisives · {state.historique.titres.length} titre{state.historique.titres.length !== 1 ? "s" : ""}
          </p>
          <div className="bg-[var(--surface)] border border-[var(--floodlight)]/40 rounded-2xl py-8 mb-3">
            <p className="font-mono text-xs text-[var(--ink-dim)] mb-2">SCORE DE CARRIERE</p>
            <p className="font-display text-6xl text-[var(--floodlight)]">{score}</p>
            <p className="font-mono text-xs text-[var(--ink-dim)] mt-1">/ 100</p>
          </div>
          {percentile !== null && (
            <p className="text-sm text-[var(--pitch-light)] mb-6">
              🌍 Meilleure carrière que <span className="font-mono">{percentile}%</span> des destins simulés
            </p>
          )}
          {reconversion && (
            <p className="text-sm text-[var(--ink-dim)] mb-6 italic">
              {state.identite.nom} {reconversion.texteFin}
            </p>
          )}

          <div className="mb-8">
            <FaceAFacePanel state={state} rivalStats={rivalStats} totaux={totaux} />
          </div>

          <button
            onClick={() => { effacerSauvegarde(); setHasSave(false); setState(null); setPending(null); }}
            className="font-head bg-[var(--floodlight)] text-[#14140f] rounded-lg px-6 py-3 font-semibold hover:brightness-110"
          >
            Nouvelle carriere
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Ticker items={tickerItems} />

      <header className="px-4 sm:px-8 pt-8 pb-6 max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] text-[var(--floodlight)] mb-1">
          CAREER LEGEND · SAISON {state.saison}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl">{state.identite.nom}</h1>
      </header>

      <main className="px-4 sm:px-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-5">
          <StatsPanel state={state} />
          <RelationsPanel relations={state.relations} />
          {!pending && (
            <button
              onClick={handleAvancerSaison}
              className="w-full font-head text-lg bg-[var(--floodlight)] text-[#14140f] rounded-xl py-4 font-semibold hover:brightness-110 transition-all"
            >
              Passer a la saison {state.saison + 1} →
            </button>
          )}
        </div>

        <div className="lg:col-span-1">
          <SocialFeed posts={state.feedSocial} />
        </div>

        <div className="lg:col-span-1">
          <PressFeed articles={state.feedPresse} />
        </div>

        <div className="lg:col-span-1">
          <PalmaresPanel historique={state.historique} />
        </div>

        <div className="lg:col-span-2">
          <FinanceFamillePanel state={state} onAcheter={handleAcheter} onViePerso={handleViePerso} />
        </div>
      </main>

      {pending && (
        <DecisionCard
          badge={pending.type === "decision" ? "DECISION DE CARRIERE" : "EVENEMENT"}
          texte={pending.data.texte(state)}
          choix={pending.data.choix}
          onChoisir={handleChoix}
        />
      )}
    </div>
  );
}

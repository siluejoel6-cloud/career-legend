import {
  EVENEMENTS_PONCTUELS,
  DECISIONS_SAISON,
  JOURNALISTES,
  MARQUES_SPONSORS,
  TEMPLATES_FANS,
  TEMPLATES_HATERS,
  ENFANCES,
  ADOLESCENCES,
  ENTOURAGES,
  NATIONALITES,
  TYPES_BLESSURES,
  TROPHEES_POSSIBLES,
} from "../data/gameData";
import { genererPersonnages, genererNomUnique } from "../data/personnages";

// ============================================================
// STATE INITIAL
// ============================================================
export function createInitialState(profile) {
  const perso = genererPersonnages();
  const enfance = ENFANCES.find((e) => e.id === profile.enfance) ?? ENFANCES[0];
  const adolescence = ADOLESCENCES.find((a) => a.id === profile.adolescence) ?? ADOLESCENCES[1];
  const entourage = ENTOURAGES.find((e) => e.id === profile.entourage) ?? ENTOURAGES[0];
  const nationalite = NATIONALITES.find((n) => n.id === profile.nationalite) ?? NATIONALITES[0];

  let s = {
    identite: {
      nom: profile.nom,
      poste: profile.poste,
      personnalite: profile.personnalite,
      club: profile.club,
      nationalite: nationalite.id,
    },
    age: 16,
    saison: 1,
    enCarriere: true,
    stats: {
      technique: 30,
      physique: 40,
      mental: 35,
      forme: 80,
      reputation: 15,
      followers: profile.followersInit ?? 300,
      hateRatio: 10, // % d'avis négatifs dans le feed
    },
    relations: {
      agent: { nom: perso.agent, confiance: entourage.agentConfianceInit },
      coach: { nom: perso.coach, confiance: 50 },
      rival: { nom: perso.rival, tension: 25, titresRival: 0 },
      coequipiers: [
        { nom: perso.coequipier1, complicite: 50 },
        { nom: perso.coequipier2, complicite: 50 },
      ],
    },
    finances: {
      argent: 5000,
      salaireAnnuel: 12000,
      biens: [],
      sponsors: [],
    },
    viePerso: {
      enCouple: false,
      enfants: 0,
      stabilite: 60,
    },
    blessureActuelle: null,
    historique: {
      clubs: [profile.club],
      titres: [],
      statistiquesParSaison: [],
      enfance: enfance.id,
      adolescence: adolescence.id,
      entourage: entourage.id,
      reconversion: null,
    },
    feedSocial: [],
    feedPresse: [],
    decisionCourante: null,
    log: [
      `Enfance : ${enfance.label.toLowerCase()}.`,
      `Début de carrière à ${profile.club}, à seulement 16 ans.`,
    ],
  };

  s = applyEffets(s, enfance.effets);
  s = applyEffets(s, adolescence.effets);
  s = applyEffets(s, entourage.effets);
  return s;
}

// ============================================================
// UTILITAIRES
// ============================================================
function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function pickJournaliste(id) {
  return JOURNALISTES.find((j) => j.id === id) ?? JOURNALISTES[0];
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Applique un objet d'effets { technique, physique, ..., argent, followers... } au state
function applyEffets(state, effets = {}) {
  const s = structuredClone(state);
  const statKeys = ["technique", "physique", "mental", "forme", "reputation", "followers", "hateRatio"];
  for (const key of statKeys) {
    if (effets[key] !== undefined) {
      const max = key === "followers" ? Infinity : 100;
      s.stats[key] = clamp((s.stats[key] ?? 0) + effets[key], 0, max);
    }
  }
  if (effets.argent) s.finances.argent += effets.argent;
  if (effets.stabilite) s.viePerso.stabilite = clamp(s.viePerso.stabilite + effets.stabilite, 0, 100);

  if (effets.agentConfiance) s.relations.agent.confiance = clamp(s.relations.agent.confiance + effets.agentConfiance, 0, 100);
  if (effets.coachConfiance) s.relations.coach.confiance = clamp(s.relations.coach.confiance + effets.coachConfiance, 0, 100);
  if (effets.coachConfianceReset !== undefined) s.relations.coach.confiance = clamp(effets.coachConfianceReset, 0, 100);
  if (effets.rivalTension) s.relations.rival.tension = clamp(s.relations.rival.tension + effets.rivalTension, 0, 100);
  if (effets.coequipierComplicite !== undefined) {
    const idx = effets.coequipierIndex ?? 0;
    if (s.relations.coequipiers[idx]) {
      s.relations.coequipiers[idx].complicite = clamp(
        s.relations.coequipiers[idx].complicite + effets.coequipierComplicite,
        0,
        100
      );
    }
  }

  if (effets.flag) s.historique[effets.flag] = true;
  if (effets.reconversion) s.historique.reconversion = effets.reconversion;

  return s;
}

function pushSocial(state, texte, type = "fan") {
  state.feedSocial = [{ id: crypto.randomUUID(), texte, type, saison: state.saison }, ...state.feedSocial].slice(0, 30);
}

function pushPresse(state, journalisteId, texte) {
  const j = pickJournaliste(journalisteId);
  state.feedPresse = [
    { id: crypto.randomUUID(), journaliste: j.nom, role: j.role, texte: j.signature(texte), saison: state.saison },
    ...state.feedPresse,
  ].slice(0, 30);
}

// Génère automatiquement quelques réactions fans/haters selon le ratio actuel
export function genererReactionsAutomatiques(state) {
  const s = structuredClone(state);
  const nom = s.identite.nom;
  const nbPosts = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < nbPosts; i++) {
    const isHater = Math.random() * 100 < s.stats.hateRatio;
    const template = pick(isHater ? TEMPLATES_HATERS : TEMPLATES_FANS);
    pushSocial(s, template(nom), isHater ? "hater" : "fan");
  }
  return s;
}

// ============================================================
// DÉCISIONS DE SAISON
// ============================================================
export function getDecisionDisponible(state) {
  return DECISIONS_SAISON.find(
    (d) => (!d.condition || d.condition(state)) && !state.historique.decisionsVues?.includes(d.id)
  );
}

export function resoudreDecision(state, decision, choixIndex) {
  let s = structuredClone(state);
  const choix = decision.choix[choixIndex];
  s = applyEffets(s, choix.effets);
  s.historique.decisionsVues = [...(s.historique.decisionsVues ?? []), decision.id];
  s.log = [`Saison ${s.saison} — ${decision.texte(s)} → "${choix.texte}"`, ...s.log].slice(0, 50);
  return s;
}

// ============================================================
// ÉVÉNEMENTS PONCTUELS
// ============================================================
export function tirerEvenement(state) {
  const dejaVus = state.evenementsCetteSaison ?? 0;
  if (dejaVus >= 2) return null; // au plus 2 événements aléatoires par saison, pour ne pas noyer le joueur
  const candidats = EVENEMENTS_PONCTUELS.filter((e) => Math.random() < e.probabilite(state));
  if (candidats.length === 0) return null;
  return pick(candidats);
}

export function resoudreEvenement(state, evenement, choixIndex) {
  let s = structuredClone(state);
  const choix = evenement.choix[choixIndex];
  s = applyEffets(s, choix.effets);

  if (evenement.journaliste && evenement.newsTexte) {
    pushPresse(s, evenement.journaliste, evenement.newsTexte(s.identite.nom));
  }

  if (choix.sponsor) {
    const marque = pick(MARQUES_SPONSORS.filter((m) => !m.reputationMin || s.stats.reputation >= m.reputationMin));
    if (marque) {
      const montant = Math.round(marque.montantBase * (1 + s.stats.followers / 20000));
      s.finances.argent += montant;
      s.finances.sponsors = [...s.finances.sponsors, { ...marque, montant, saisonSignature: s.saison }];
      s.log = [`Nouveau sponsor signé : ${marque.nom} (+${montant.toLocaleString("fr-FR")} €)`, ...s.log].slice(0, 50);
    }
  }

  if (evenement.nouveauCoach) {
    const ancien = s.relations.coach.nom;
    const exclure = [s.relations.agent.nom, s.relations.rival.nom, ...s.relations.coequipiers.map((c) => c.nom), ancien];
    s.relations.coach.nom = genererNomUnique(exclure);
    s.log = [`${ancien} quitte le club. Nouveau coach en place : ${s.relations.coach.nom}.`, ...s.log].slice(0, 50);
  }

  if (evenement.perteSponsor && s.finances.sponsors.length > 0) {
    const idx = Math.floor(Math.random() * s.finances.sponsors.length);
    const perdu = s.finances.sponsors[idx];
    s.finances.sponsors = s.finances.sponsors.filter((_, i) => i !== idx);
    s.log = [`Fin du partenariat avec ${perdu.nom} suite à la polémique.`, ...s.log].slice(0, 50);
  }

  if (Math.random() * 100 < 50) {
    const nom = s.identite.nom;
    const isHater = Math.random() * 100 < s.stats.hateRatio;
    pushSocial(s, pick(isHater ? TEMPLATES_HATERS : TEMPLATES_FANS)(nom), isHater ? "hater" : "fan");
  }

  if (evenement.id === "blessure" && choix.risqueBlessure) {
    s.blessureActuelle = tirerBlessure(choix.risqueBlessure);
    s.log = [
      `Diagnostic : ${s.blessureActuelle.nom} (${s.blessureActuelle.gravite}) — indisponible ${s.blessureActuelle.saisonsRestantes} saison(s).`,
      ...s.log,
    ].slice(0, 50);
  }

  s.evenementsCetteSaison = (s.evenementsCetteSaison ?? 0) + 1;

  return s;
}

// Tire une blessure réelle avec une durée en saisons, pondérée par le risque pris
function tirerBlessure(risque) {
  const pool = risque === "eleve"
    ? TYPES_BLESSURES.filter((b) => b.gravite !== "légère").concat(TYPES_BLESSURES)
    : TYPES_BLESSURES.filter((b) => b.gravite === "légère").concat(TYPES_BLESSURES.filter((b) => b.gravite === "moyenne"));
  const type = pick(pool.length ? pool : TYPES_BLESSURES);
  const duree = type.dureeMin + Math.floor(Math.random() * (type.dureeMax - type.dureeMin + 1));
  return { nom: type.nom, gravite: type.gravite, saisonsRestantes: duree, penaliteForme: type.penaliteForme };
}

// ============================================================
// ACHATS / VIE PERSO
// ============================================================
export function acheterBien(state, bien) {
  let s = structuredClone(state);
  if (s.finances.argent < bien.prix) return s;
  s.finances.argent -= bien.prix;
  s.finances.biens = [...s.finances.biens, bien];
  s.log = [`Achat : ${bien.nom} (-${bien.prix.toLocaleString("fr-FR")} €)`, ...s.log].slice(0, 50);
  return s;
}

export function evenementViePerso(state, action) {
  let s = structuredClone(state);
  if (action === "mise_en_couple") {
    s.viePerso.enCouple = true;
    s.viePerso.stabilite = clamp(s.viePerso.stabilite + 10);
    s.log = [`Vie privée : nouvelle relation officialisée.`, ...s.log].slice(0, 50);
  }
  if (action === "enfant") {
    s.viePerso.enfants += 1;
    s.viePerso.stabilite = clamp(s.viePerso.stabilite + 8);
    s.stats.forme = clamp(s.stats.forme - 3);
    s.log = [`Vie privée : agrandissement de la famille.`, ...s.log].slice(0, 50);
  }
  return s;
}

// ============================================================
// PROGRESSION DE SAISON
// ============================================================
export function avancerSaison(state) {
  let s = structuredClone(state);
  const etaitBlesseCetteSaison = !!state.blessureActuelle;

  const revenus = s.finances.salaireAnnuel + s.finances.sponsors.reduce((acc, sp) => acc + Math.round(sp.montant * 0.3), 0);
  s.finances.argent += revenus;
  s.finances.salaireAnnuel = Math.round(s.finances.salaireAnnuel * (1 + s.stats.reputation / 300));

  const saisonQuiSeTermine = s.saison;
  s.age += 1;
  s.saison += 1;
  s.stats.forme = clamp(s.stats.forme + 5);
  s.evenementsCetteSaison = 0;

  // Récupération de blessure
  if (s.blessureActuelle) {
    s.blessureActuelle.saisonsRestantes -= 1;
    if (s.blessureActuelle.saisonsRestantes <= 0) {
      s.log = [`Tu es déclaré totalement rétabli de ta blessure.`, ...s.log].slice(0, 50);
      s.blessureActuelle = null;
    }
  }

  // Le rival vit sa propre carrière en parallèle
  if (Math.random() < 0.3) {
    s.relations.rival.titresRival += 1;
    s.relations.rival.tension = clamp(s.relations.rival.tension + 8, 0, 100);
    pushPresse(
      s,
      "insider",
      `${s.relations.rival.nom} décroche un nouveau titre cette saison — la comparaison avec ${s.identite.nom} est inévitable.`
    );
  }

  // Bilan de la saison écoulée : matchs, buts, passes, éventuel trophée
  const statsSaison = genererStatsSaison(s, etaitBlesseCetteSaison, saisonQuiSeTermine);
  s.historique.statistiquesParSaison = [...s.historique.statistiquesParSaison, statsSaison];

  let recap = `Bilan saison ${saisonQuiSeTermine} : ${statsSaison.matchsJoues} matchs, ${statsSaison.buts} but(s), ${statsSaison.passes} passe(s) décisive(s), note moyenne ${statsSaison.note}/10.`;
  const trophee = tirerTrophee(s);
  if (trophee) {
    s.historique.titres = [...s.historique.titres, { nom: trophee, saison: saisonQuiSeTermine }];
    recap += ` Et un trophée en plus : ${trophee} 🏆`;
  }
  pushPresse(s, "analyste", recap);

  if (s.age >= 38) {
    s.enCarriere = false;
    s.log = [`Fin de carrière à ${s.age} ans, après ${s.saison - 1} saisons professionnelles.`, ...s.log];
  }

  return s;
}

// Génère les statistiques de la saison écoulée selon le poste, la forme et une éventuelle blessure
function genererStatsSaison(state, etaitBlesse, saison) {
  const { technique, forme } = state.stats;
  const matchsJoues = etaitBlesse
    ? 6 + Math.floor(Math.random() * 12)
    : 24 + Math.floor(Math.random() * 12);

  let buts = 0;
  let passes = 0;
  switch (state.identite.poste) {
    case "attaquant":
      buts = Math.round(technique / 6 + forme / 40 + Math.random() * 5);
      passes = Math.round(technique / 15 + Math.random() * 4);
      break;
    case "milieu":
      buts = Math.round(technique / 14 + Math.random() * 3);
      passes = Math.round(technique / 7 + forme / 50 + Math.random() * 5);
      break;
    case "defenseur":
      buts = Math.round(technique / 25 + Math.random() * 1.5);
      passes = Math.round(technique / 12 + Math.random() * 3);
      break;
    case "gardien":
    default:
      buts = 0;
      passes = Math.round(Math.random() * 1);
      break;
  }

  const note = calculerNoteSaison(state, buts, passes, matchsJoues, etaitBlesse);

  return {
    saison,
    matchsJoues: etaitBlesse ? Math.min(matchsJoues, 18) : matchsJoues,
    buts: Math.max(0, buts),
    passes: Math.max(0, passes),
    note,
  };
}

function calculerNoteSaison(state, buts, passes, matchsJoues, etaitBlesse) {
  const { technique, mental, forme } = state.stats;
  const base = 5 + (technique + mental) / 50; // ~5 à ~9 selon le niveau du joueur
  const bonusProduction = state.identite.poste === "gardien"
    ? 0
    : Math.min(1.5, (buts + passes * 0.6) / Math.max(1, matchsJoues) * 3);
  const malusForme = forme < 50 ? -0.6 : 0;
  const malusBlessure = etaitBlesse ? -0.4 : 0;
  const bruit = (Math.random() - 0.5) * 0.6;
  return Math.max(3, Math.min(9.9, Math.round((base + bonusProduction + malusForme + malusBlessure + bruit) * 10) / 10));
}

// Retourne les statistiques de la dernière saison jouée (ou null en tout début de carrière)
export function derniereSaison(state) {
  const stats = state.historique.statistiquesParSaison;
  return stats.length > 0 ? stats[stats.length - 1] : null;
}

function tirerTrophee(state) {
  const chance = 0.1 + state.stats.reputation / 400;
  if (Math.random() < chance) {
    return pick(TROPHEES_POSSIBLES);
  }
  return null;
}

export function scoreCarriere(state) {
  const { technique, physique, mental, reputation } = state.stats;
  const base = (technique + physique + mental + reputation) / 4;
  const bonusTitres = state.historique.titres.length * 5;
  const bonusFamille = state.viePerso.stabilite / 10;
  return Math.round(clamp(base + bonusTitres + bonusFamille, 0, 100));
}

// ---- Génère une carrière plausible et STABLE pour le rival (comparaison finale) ----
// Utilise une petite seed déterministe (nom + titres) pour que les chiffres ne
// changent pas d'un rendu à l'autre au sein d'une même partie terminée.
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h;
}
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function genererStatsRivalFinal(state) {
  const rival = state.relations.rival;
  const rand = mulberry32(hashString(rival.nom + rival.titresRival + state.saison));
  const nbSaisons = Math.max(1, state.saison - 1);
  const ovrMax = Math.min(99, Math.round(52 + rand() * 28 + rival.titresRival * 1.5));
  const buts = Math.round(nbSaisons * (2 + rand() * 4) + rival.titresRival * 8);
  const matchs = Math.round(nbSaisons * (20 + rand() * 10));
  return { nom: rival.nom, ovrMax, buts, matchs, titres: rival.titresRival };
}

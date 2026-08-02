// Génération des personnages récurrents (agent, coach, rival, coéquipiers).
// Ce sont des personnages fictifs propres à chaque partie : ils sont tirés
// au sort à la création du personnage puis persistent toute la carrière.

const PRENOMS = [
  "Yannick", "Fabrice", "Amara", "Kader", "Steven", "Junior", "Boris", "Théo",
  "Aristide", "Michael", "Wilfried", "Lassane", "Serge", "Donovan", "Kevin",
];

const NOMS = [
  "Diakité", "Berthier", "Kouassi", "Renard", "N'Guessan", "Fontaine",
  "Silué", "Moreau", "Traoré", "Duval", "Ouattara", "Lambert", "Bakayoko",
];

function nomAleatoire(exclure = []) {
  let nom;
  do {
    nom = `${PRENOMS[Math.floor(Math.random() * PRENOMS.length)]} ${NOMS[Math.floor(Math.random() * NOMS.length)]}`;
  } while (exclure.includes(nom));
  return nom;
}

export function genererPersonnages() {
  const noms = [];
  const next = () => {
    const n = nomAleatoire(noms);
    noms.push(n);
    return n;
  };
  return {
    agent: next(),
    coach: next(),
    rival: next(),
    coequipier1: next(),
    coequipier2: next(),
  };
}

// Génère un nom unique supplémentaire (ex : nouveau coach en cours de carrière)
export function genererNomUnique(exclure = []) {
  return nomAleatoire(exclure);
}

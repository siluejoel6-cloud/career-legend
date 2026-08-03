// ============================================================
// DONNÉES DU JEU
// Tout le contenu narratif vit ici — ajoute des entrées pour
// enrichir le jeu sans toucher au moteur (engine/gameEngine.js)
// ============================================================

export const POSTES = [
  { id: "gardien", label: "Gardien", description: "Seul face à tous. Un poste ingrat où une carrière se joue sur des réflexes et des nerfs d'acier." },
  { id: "defenseur", label: "Défenseur", description: "L'art de l'ombre. Peu de gloire statistique, mais les grandes équipes se construisent derrière." },
  { id: "milieu", label: "Milieu de terrain", description: "Le chef d'orchestre. Moins de buts, plus de contrôle : c'est toi qui donnes le tempo du jeu." },
  { id: "attaquant", label: "Attaquant", description: "Vivre et mourir pour le but. Les statistiques qui font les légendes... et les critiques quand elles se tarissent." },
];

export const PERSONNALITES = [
  { id: "humble", label: "Humble et travailleur", description: "Tu laisses parler le travail plus que les mots. Respecté, rarement sous les projecteurs.", effets: { mental: 5, reputation: 2 } },
  { id: "charismatique", label: "Charismatique et médiatique", description: "Tu attires la lumière naturellement. Les caméras t'aiment, et ça se voit.", effets: { followers: 500, reputation: 5 } },
  { id: "discret", label: "Discret et introverti", description: "Le terrain te suffit. Peu de bruit autour de toi, mais une vraie profondeur.", effets: { stabilite: 5, followers: -200 } },
  { id: "provocateur", label: "Provocateur, aime la polémique", description: "Chaque déclaration fait des vagues. Adoré, détesté, jamais ignoré.", effets: { followers: 800, hateRatio: 10 } },
];

export const CLUBS_DEPART = [
  "AS Cocody FC", "Racing Yopougon", "Étoile d'Abobo", "Fulgurance Bouaké",
  "Jeunesse Marcory", "Olympique Treichville",
];

export const GRANDS_CLUBS = [
  "Athletic Royale (Espagne)", "FC Lombardia (Italie)", "Albion United (Angleterre)",
  "Rheingold FC (Allemagne)", "Olympia Marseille (France)", "Al Khalij SC (Golfe)",
];

// ---- Nationalité : le pays qui te verra grandir sur les terrains ----
export const NATIONALITES = [
  { id: "ci", label: "Côte d'Ivoire", drapeau: "🇨🇮" },
  { id: "sn", label: "Sénégal", drapeau: "🇸🇳" },
  { id: "ml", label: "Mali", drapeau: "🇲🇱" },
  { id: "cm", label: "Cameroun", drapeau: "🇨🇲" },
  { id: "ma", label: "Maroc", drapeau: "🇲🇦" },
  { id: "dz", label: "Algérie", drapeau: "🇩🇿" },
  { id: "gn", label: "Guinée", drapeau: "🇬🇳" },
  { id: "bj", label: "Bénin", drapeau: "🇧🇯" },
  { id: "fr", label: "France", drapeau: "🇫🇷" },
  { id: "be", label: "Belgique", drapeau: "🇧🇪" },
  { id: "pt", label: "Portugal", drapeau: "🇵🇹" },
  { id: "es", label: "Espagne", drapeau: "🇪🇸" },
  { id: "br", label: "Brésil", drapeau: "🇧🇷" },
  { id: "ar", label: "Argentine", drapeau: "🇦🇷" },
];

// ---- Enfance : le point de départ, choisi avant même le début de carrière ----
export const ENFANCES = [
  {
    id: "riche",
    label: "Famille aisée",
    description: "Un départ confortable, mais parfois éloigné de la vraie dureté du terrain.",
    effets: { argent: 15000, technique: 3, mental: -2, stabilite: 5 },
  },
  {
    id: "modeste",
    label: "Famille modeste, quartier populaire",
    description: "Peu de moyens, mais un vrai amour du jeu transmis très tôt.",
    effets: { physique: 5, mental: 5, argent: -1000 },
  },
  {
    id: "quartier_difficile",
    label: "Grandi dans un quartier difficile",
    description: "Le foot comme échappatoire. Une mentalité forgée dans l'adversité.",
    effets: { mental: 8, technique: 2, stabilite: -5, hateRatio: 3 },
  },
  {
    id: "centre_formation",
    label: "Repéré très tôt en centre de formation",
    description: "Un encadrement technique précoce et rigoureux.",
    effets: { technique: 8, physique: 2, stabilite: -2 },
  },
  {
    id: "foot_rue",
    label: "Formé dans la rue, style libre",
    description: "Dribbles improvisés, sens du geste — mais discipline tactique à construire.",
    effets: { technique: 6, physique: 3, mental: -3 },
  },
  {
    id: "etudes",
    label: "Parents qui ont privilégié les études",
    description: "Une tête bien faite et un vrai recul, au prix d'un temps de jeu perdu plus jeune.",
    effets: { mental: 8, technique: -4, reputation: 2 },
  },
];

// ---- Adolescence : le mode de vie qui a forgé ta discipline ----
export const ADOLESCENCES = [
  {
    id: "hygiene_pro",
    label: "Hygiène de pro",
    description: "Couché tôt, discipline stricte, zéro écart. Tes coéquipiers se moquent, les recruteurs adorent.",
    effets: { mental: 6, technique: 3, reputation: 3, followers: -300 },
  },
  {
    id: "equilibre",
    label: "Équilibré",
    description: "Sérieux à l'entraînement, détendu en dehors. Ni moine, ni fêtard.",
    effets: { mental: 4, technique: 2, stabilite: 3 },
  },
  {
    id: "belle_vie",
    label: "La belle vie",
    description: "Les sorties, les potes, les réseaux. Le talent fera le reste... non ?",
    effets: { followers: 700, hateRatio: 5, mental: -4, technique: 2 },
  },
];

// ---- Entourage : qui gère tes intérêts avant même ton premier contrat ----
export const ENTOURAGES = [
  {
    id: "famille",
    label: "Famille encadrante",
    description: "Des parents présents qui gèrent tout : contrats, école, équilibre.",
    effets: { stabilite: 8, argent: 2000 },
    agentConfianceInit: 65,
  },
  {
    id: "agent_ambitieux",
    label: "Agent ambitieux",
    description: "Un jeune agent aux dents longues t'a repéré. Il promet les sommets — et prend sa part.",
    effets: { reputation: 4, argent: -1000 },
    agentConfianceInit: 40,
  },
  {
    id: "bande_quartier",
    label: "La bande du quartier",
    description: "Tes amis d'enfance te suivent partout. Fidèles, bruyants, incontrôlables.",
    effets: { followers: 500, stabilite: 5, hateRatio: 3 },
    agentConfianceInit: 50,
  },
];

// ---- Blessures : gravité et durée réelle (en saisons) ----
export const TYPES_BLESSURES = [
  { id: "entorse", nom: "Entorse à la cheville", gravite: "légère", dureeMin: 1, dureeMax: 1, penaliteForme: 12 },
  { id: "dechirure", nom: "Déchirure musculaire", gravite: "moyenne", dureeMin: 1, dureeMax: 2, penaliteForme: 16 },
  { id: "rupture_ligaments", nom: "Rupture des ligaments croisés", gravite: "grave", dureeMin: 2, dureeMax: 3, penaliteForme: 25 },
  { id: "fracture", nom: "Fracture", gravite: "moyenne", dureeMin: 1, dureeMax: 2, penaliteForme: 18 },
  { id: "commotion", nom: "Commotion cérébrale", gravite: "légère", dureeMin: 1, dureeMax: 1, penaliteForme: 10 },
  { id: "fatigue_chronique", nom: "Fatigue chronique", gravite: "légère", dureeMin: 1, dureeMax: 1, penaliteForme: 8 },
];

// ---- Trophées possibles en fin de saison ----
export const TROPHEES_POSSIBLES = [
  "Championnat national", "Coupe nationale", "Coupe continentale des clubs", "Supercoupe",
];

// ---- Reconversions possibles en fin de carrière ----
export const RECONVERSIONS = [
  { id: "entraineur", label: "Passer ton diplôme d'entraîneur", texteFin: "a entamé une reconversion comme entraîneur, décidé à transmettre à son tour." },
  { id: "consultant", label: "Devenir consultant TV", texteFin: "est devenu une voix reconnue des plateaux télé, entre analyses et anecdotes de vestiaire." },
  { id: "agent", label: "Devenir agent de joueurs", texteFin: "a rejoint le monde des agents, mettant son carnet d'adresses au service de la nouvelle génération." },
  { id: "recruteur", label: "Devenir recruteur pour un club", texteFin: "sillonne désormais les terrains du monde entier à la recherche de la nouvelle pépite." },
  { id: "president", label: "Viser la présidence d'un club", texteFin: "s'est lancé dans la présidence d'un club, avec l'ambition de marquer l'histoire autrement." },
  { id: "aucune", label: "Profiter pleinement de ta retraite", texteFin: "profite d'une retraite bien méritée, loin des projecteurs." },
];

// ---- Journalistes / médias fictifs (archétypes, PAS des personnes réelles) ----
export const JOURNALISTES = [
  { id: "insider", nom: "Marco Sventura", role: "Insider transferts", style: "breaking",
    signature: (texte) => `🚨 EXCLU @MarcoSventura : ${texte}` },
  { id: "tabloid", nom: "La Gazette du Ballon", role: "Presse à sensation", style: "scandale",
    signature: (texte) => `📰 LA GAZETTE : ${texte}` },
  { id: "analyste", nom: "Claire Dumont", role: "Consultante stats", style: "analyse",
    signature: (texte) => `📊 @ClaireDumontAnalyse : ${texte}` },
  { id: "chroniqueur", nom: "Fabien Lorrain", role: "Éditorialiste", style: "opinion",
    signature: (texte) => `✍️ ÉDITO F.LORRAIN : ${texte}` },
  { id: "peopolisation", nom: "Vibe Mag", role: "Presse people", style: "lifestyle",
    signature: (texte) => `✨ VIBE MAG : ${texte}` },
];

// ---- Marques de sponsoring fictives ----
export const MARQUES_SPONSORS = [
  { id: "equip1", nom: "Vortex Sport", type: "Équipementier", montantBase: 40000 },
  { id: "boisson", nom: "PulseUp Energy", type: "Boisson énergisante", montantBase: 15000 },
  { id: "jeuvideo", nom: "GoalStorm (jeu vidéo)", type: "Jeu vidéo", montantBase: 20000 },
  { id: "luxe", nom: "Chrono Auré", type: "Horlogerie de luxe", montantBase: 60000, reputationMin: 60 },
  { id: "auto", nom: "Velocia Motors", type: "Automobile", montantBase: 50000, reputationMin: 40 },
  { id: "mode", nom: "Maison Kaelis", type: "Mode & lifestyle", montantBase: 35000, reputationMin: 35 },
  { id: "banque", nom: "NovaBank Privée", type: "Services financiers", montantBase: 45000, reputationMin: 55 },
];

// ---- Biens à acheter (patrimoine) ----
export const BIENS_DISPONIBLES = [
  { id: "appart", nom: "Appartement en centre-ville", prix: 80000, statut: 3 },
  { id: "villa", nom: "Villa avec piscine", prix: 350000, statut: 8 },
  { id: "citadine", nom: "Citadine correcte", prix: 15000, statut: 1 },
  { id: "sportive", nom: "Berline sportive", prix: 90000, statut: 5 },
  { id: "supercar", nom: "Supercar de collection", prix: 400000, statut: 10 },
  { id: "investissement", nom: "Parts dans un restaurant", prix: 60000, statut: 2, rendement: 4000 },
  { id: "maison_famille", nom: "Maison pour tes parents", prix: 120000, statut: 4 },
  { id: "fondation", nom: "Lancer ta fondation caritative", prix: 150000, statut: 6 },
];

// ============================================================
// DÉCISIONS DE SAISON — organisées par étape de carrière
// ============================================================
export const DECISIONS_SAISON = [
  // ---- JEUNE ESPOIR (saisons 1-3) ----
  {
    id: "objectif_saison_1",
    texte: () => `Ton coach te reçoit avant le début de saison. Quel objectif personnel te fixes-tu ?`,
    condition: (s) => s.saison === 1,
    choix: [
      { texte: "Viser une place de titulaire indiscutable", effets: { technique: 4, forme: -3, mental: 2 } },
      { texte: "Privilégier ta forme physique sur le long terme", effets: { physique: 5, forme: 5 } },
      { texte: "Te concentrer sur ton image et les médias", effets: { followers: 600, reputation: 4, technique: -2 } },
    ],
  },
  {
    id: "premier_agent",
    texte: () => `Plusieurs agents commencent à te courtiser pour gérer ta carrière naissante.`,
    condition: (s) => s.saison === 2,
    choix: [
      { texte: "Choisir un agent réputé mais qui prend une grosse commission", effets: { reputation: 6, argent: -5000 } },
      { texte: "Faire confiance à un agent débutant, moins cher", effets: { stabilite: 4, argent: 2000 } },
      { texte: "Rester avec un proche de la famille comme agent", effets: { stabilite: 8, reputation: -2 } },
    ],
  },
  {
    id: "premiere_selection",
    texte: () => `Le sélectionneur national t'appelle pour la première fois en équipe nationale espoirs.`,
    condition: (s) => s.saison === 2 && s.stats.technique > 35,
    choix: [
      { texte: "Répondre présent avec fierté", effets: { reputation: 8, followers: 1500, forme: -5 } },
      { texte: "Décliner pour te préserver physiquement", effets: { forme: 5, reputation: -4 } },
    ],
  },
  {
    id: "style_entrainement",
    texte: () => `Ton club te propose un programme d'entraînement intensif individualisé.`,
    condition: (s) => s.saison === 3,
    choix: [
      { texte: "Foncer à fond dedans", effets: { technique: 6, physique: 4, forme: -8 } },
      { texte: "Doser, en gardant du temps pour ta vie perso", effets: { technique: 3, stabilite: 6 } },
    ],
  },

  // ---- CONFIRMÉ (saisons 4-8) ----
  {
    id: "offre_prolongation",
    texte: () => `Ton club veut te faire prolonger avec une hausse de salaire modeste. Un agent te souffle qu'un plus grand club pourrait s'intéresser à toi.`,
    condition: (s) => s.saison === 4,
    choix: [
      { texte: "Prolonger, rester fidèle au club formateur", effets: { reputation: 6, argent: 20000, stabilite: 5 } },
      { texte: "Refuser et attendre une meilleure offre", effets: { reputation: -3, stabilite: -5, forme: -2 } },
    ],
  },
  {
    id: "transfert_grand_club",
    texte: () => `${randomGrandClub()} fait une offre officielle pour te recruter. C'est le grand saut.`,
    condition: (s) => s.saison === 5 && s.stats.reputation > 35 && meriteGrosseOffre(s),
    choix: [
      { texte: "Signer, direction le haut niveau", effets: { reputation: 12, argent: 80000, followers: 5000, stabilite: -8 } },
      { texte: "Rester par loyauté envers ton club actuel", effets: { stabilite: 10, reputation: -5 } },
    ],
  },
  {
    id: "capitanat",
    texte: () => `Le brassard de capitaine se libère dans ton club.`,
    condition: (s) => s.saison >= 5 && s.saison <= 7 && s.stats.reputation > 40,
    choix: [
      { texte: "Accepter le brassard", effets: { reputation: 8, mental: 5, followers: 1000 } },
      { texte: "Laisser la place à un autre", effets: { stabilite: 3 } },
    ],
  },
  {
    id: "clause_liberatoire",
    texte: () => `Ton agent négocie ton nouveau contrat et te demande quelle clause libératoire fixer.`,
    condition: (s) => s.saison === 6,
    choix: [
      { texte: "Une clause très élevée, tu te sens fort de rester", effets: { stabilite: 5, reputation: 3 } },
      { texte: "Une clause plus basse pour garder des portes ouvertes", effets: { reputation: -2, followers: 800 } },
    ],
  },
  {
    id: "documentaire",
    texte: () => `Une plateforme de streaming te propose un documentaire retraçant ta carrière et ta vie privée.`,
    condition: (s) => s.saison === 7 && s.stats.followers > 8000,
    choix: [
      { texte: "Accepter, ouvrir les portes de ta vie", effets: { followers: 6000, argent: 40000, stabilite: -6 } },
      { texte: "Refuser, protéger ton intimité", effets: { stabilite: 6 } },
    ],
  },
  {
    id: "explosion_saison",
    texte: (s) => `Ta dernière saison a été exceptionnelle (note moyenne ${derniereNote(s)?.toFixed(1)}/10, ${derniersButs(s)} but(s)). Les plus grands d'Europe s'alignent pour te recruter.`,
    condition: (s) => s.saison >= 4 && s.saison <= 9 && derniereNote(s) >= 7.6 && s.stats.forme >= 60,
    choix: [
      { texte: "Signer chez le prétendant le plus prestigieux", effets: { reputation: 15, argent: 120000, followers: 8000, stabilite: -10 } },
      { texte: "Prendre ton temps, écouter toutes les offres calmement", effets: { reputation: 8, argent: 60000, stabilite: 2 } },
      { texte: "Rester fidèle à ton club malgré tout", effets: { stabilite: 12, reputation: -3, followers: 2000 } },
    ],
  },

  // ---- STAR (saisons 9-13) ----
  {
    id: "ballon_dor_candidat",
    texte: () => `Ton nom circule sérieusement parmi les favoris pour le trophée individuel le plus prestigieux de la saison.`,
    condition: (s) => s.saison >= 9 && s.saison <= 13 && s.stats.reputation > 70,
    choix: [
      { texte: "Faire campagne activement sur les réseaux", effets: { followers: 8000, hateRatio: 8, reputation: 4 } },
      { texte: "Rester focus sur le collectif sans en parler", effets: { reputation: 6, stabilite: 4 } },
    ],
  },
  {
    id: "marque_perso",
    texte: () => `Tu as assez de notoriété pour lancer ta propre marque (vêtements, parfum, ou autre).`,
    condition: (s) => s.saison >= 10 && s.stats.followers > 15000,
    choix: [
      { texte: "Te lancer, quitte à y consacrer du temps", effets: { argent: 60000, followers: 3000, forme: -3 } },
      { texte: "Ce n'est pas le moment, rester focus terrain", effets: { forme: 3 } },
    ],
  },
  {
    id: "capitanat_national",
    texte: () => `Le sélectionneur national envisage de te donner le brassard de capitaine de la sélection.`,
    condition: (s) => s.saison >= 10 && s.stats.reputation > 75,
    choix: [
      { texte: "Accepter cette responsabilité", effets: { reputation: 10, mental: 6, followers: 4000 } },
      { texte: "Suggérer un joueur plus expérimenté", effets: { stabilite: 5, reputation: 2 } },
    ],
  },
  {
    id: "offre_pays_riche",
    texte: () => `Un club aux moyens colossaux venu du Golfe te propose un contrat XXL pour finir ta carrière là-bas, plus tôt que prévu.`,
    condition: (s) => s.saison >= 11 && s.stats.reputation > 60 && s.stats.forme >= 30,
    choix: [
      { texte: "Signer pour la sécurité financière", effets: { argent: 300000, reputation: -6, followers: -2000 } },
      { texte: "Refuser, rester compétitif au plus haut niveau", effets: { reputation: 8, stabilite: -3 } },
    ],
  },

  // ---- FIN DE CARRIÈRE (saison 14+) ----
  {
    id: "reconversion_approche",
    texte: () => `Tu sens que ton corps commence à te lâcher un peu. La fin de carrière approche.`,
    condition: (s) => s.age >= 32,
    choix: [
      { texte: "Prolonger coûte que coûte, tu n'es pas prêt à arrêter", effets: { forme: -10, mental: -5, argent: 30000 } },
      { texte: "Commencer à préparer ta reconversion (consultant, coach...)", effets: { stabilite: 8, reputation: 3 } },
    ],
  },
  {
    id: "match_hommage",
    texte: () => `Ton club historique te propose d'organiser un match hommage pour ta retraite.`,
    condition: (s) => s.age >= 34,
    choix: [
      { texte: "Accepter, retrouver le club qui t'a lancé", effets: { reputation: 10, followers: 3000, stabilite: 8 } },
      { texte: "Préférer une retraite plus discrète", effets: { stabilite: 5 } },
    ],
  },
  {
    id: "annonce_retraite",
    texte: () => `Le moment est venu d'annoncer officiellement ta retraite sportive.`,
    condition: (s) => s.age >= 36,
    choix: [
      { texte: "Une longue lettre émouvante sur les réseaux", effets: { followers: 5000, reputation: 5 } },
      { texte: "Une annonce sobre en conférence de presse", effets: { reputation: 3, stabilite: 4 } },
    ],
  },

  // ---- BRANCHES SELON LA PERSONNALITÉ ----
  {
    id: "provoc_polemique_volontaire",
    texte: () => `Tu sens que tu pourrais créer un joli coup de buzz avec une déclaration bien sentie sur un rival.`,
    condition: (s) => s.saison === 4 && s.identite.personnalite === "provocateur",
    choix: [
      { texte: "Y aller franco, tant pis pour les retombées", effets: { followers: 4000, hateRatio: 15, reputation: -3 } },
      { texte: "Se retenir cette fois", effets: { stabilite: 3 } },
    ],
  },
  {
    id: "discret_interview_rare",
    texte: () => `Un grand média te propose une interview exclusive rarissime, toi qui fuis habituellement les caméras.`,
    condition: (s) => s.saison === 6 && s.identite.personnalite === "discret",
    choix: [
      { texte: "Accepter, sortir un peu de ta réserve", effets: { followers: 5000, reputation: 5, stabilite: -4 } },
      { texte: "Décliner, rester fidèle à toi-même", effets: { stabilite: 6 } },
    ],
  },
  {
    id: "humble_don_salaire",
    texte: () => `Une association caritative locale traverse une période difficile.`,
    condition: (s) => s.saison === 5 && s.identite.personnalite === "humble",
    choix: [
      { texte: "Faire un don discret d'une partie de ton salaire", effets: { argent: -10000, reputation: 6, stabilite: 5 } },
      { texte: "Aider autrement, sans argent", effets: { stabilite: 3 } },
    ],
  },

  // ---- ARC RELATIONS : AGENT, COACH, RIVAL, COÉQUIPIERS ----
  {
    id: "agent_double_jeu",
    texte: (s) => `${s.relations.agent.nom}, ton agent, te propose un contrat avantageux pour lui plus que pour toi. Tu le sens hésitant quand tu poses des questions.`,
    condition: (s) => s.saison === 4,
    choix: [
      { texte: "Lui faire confiance, il gère ta carrière depuis le début", effets: { agentConfiance: 10, argent: -3000 } },
      { texte: "Faire vérifier le contrat par un avocat indépendant", effets: { agentConfiance: -8, argent: -1500, stabilite: 4 } },
    ],
  },
  {
    id: "coach_role_tactique",
    texte: (s) => `${s.relations.coach.nom} veut te repositionner à un poste que tu maîtrises moins bien, pour le bien de l'équipe.`,
    condition: (s) => s.saison === 3,
    choix: [
      { texte: "Accepter et t'adapter", effets: { coachConfiance: 12, technique: -2, mental: 4 } },
      { texte: "Refuser et demander à rester à ton poste", effets: { coachConfiance: -10, reputation: 2 } },
    ],
  },
  {
    id: "coach_conflit_ouvert",
    texte: (s) => `${s.relations.coach.nom} te laisse sur le banc plusieurs matchs de suite sans explication claire.`,
    condition: (s) => s.saison === 6 && s.relations.coach.confiance < 45,
    choix: [
      { texte: "Aller en discuter en tête-à-tête", effets: { coachConfiance: 15, stabilite: 5 } },
      { texte: "Le critiquer publiquement", effets: { followers: 1500, coachConfiance: -20, reputation: -4 } },
    ],
  },
  {
    id: "rival_meme_club",
    texte: (s) => `Rumeur forte : ${s.relations.rival.nom}, ton grand rival depuis les catégories jeunes, pourrait rejoindre ton club cet été.`,
    condition: (s) => s.saison === 7,
    choix: [
      { texte: "Faire pression pour éviter cette arrivée", effets: { rivalTension: 15, reputation: -3 } },
      { texte: "Accueillir la compétition, ça te tirera vers le haut", effets: { rivalTension: -5, mental: 6 } },
    ],
  },
  {
    id: "rival_finale",
    texte: (s) => `Le tirage au sort est cruel : tu affrontes ${s.relations.rival.nom} en finale, celui qu'on te compare depuis toujours.`,
    condition: (s) => s.saison >= 9 && s.saison <= 12 && s.relations.rival.tension > 40,
    choix: [
      { texte: "Jouer cette finale comme une revanche personnelle", effets: { mental: 8, forme: -8, followers: 6000, rivalTension: 10 } },
      { texte: "Rester froid et méthodique, sans affect", effets: { mental: 4, technique: 4, rivalTension: -8 } },
    ],
  },
  {
    id: "coequipier_mentorat",
    texte: (s) => `${s.relations.coequipiers[0].nom}, avec qui tu as traversé toute ta carrière, te demande de prendre un jeune du centre de formation sous ton aile.`,
    condition: (s) => s.age >= 29 && s.relations.coequipiers[0].complicite > 55,
    choix: [
      { texte: "Accepter, transmettre ce qu'on t'a appris", effets: { reputation: 6, coequipierComplicite: 10, coequipierIndex: 0, stabilite: 4 } },
      { texte: "Rester focus sur ta propre fin de carrière", effets: { forme: 3 } },
    ],
  },
  {
    id: "coequipier_tension_vestiaire",
    texte: (s) => `${s.relations.coequipiers[1].nom} conteste ouvertement ton statut de leader dans le vestiaire.`,
    condition: (s) => s.saison === 8,
    choix: [
      { texte: "Aller vers lui pour apaiser les choses", effets: { coequipierComplicite: 12, coequipierIndex: 1, stabilite: 4 } },
      { texte: "Laisser le coach trancher", effets: { coachConfiance: 3, coequipierComplicite: -10, coequipierIndex: 1 } },
    ],
  },
  {
    id: "rival_retraite_hommage",
    texte: (s) => `${s.relations.rival.nom} annonce sa propre retraite. Les médias te demandent une réaction.`,
    condition: (s) => s.age >= 33,
    choix: [
      { texte: "Un message public élégant, malgré la rivalité", effets: { reputation: 8, followers: 2500, rivalTension: -15 } },
      { texte: "Rester silencieux", effets: { stabilite: 2 } },
    ],
  },

  // ---- SPÉCIFIQUES AU POSTE ----
  {
    id: "gardien_penalty_decisif",
    texte: () => `Tu dois arrêter un penalty décisif dans les dernières secondes d'un match capital.`,
    condition: (s) => s.identite.poste === "gardien" && s.saison === 5,
    choix: [
      { texte: "Étudier les stats du tireur avant de plonger", effets: { technique: 6, mental: 4 } },
      { texte: "Faire confiance à ton instinct", effets: { mental: 8, forme: -3 } },
    ],
  },
  {
    id: "gardien_sortie_aerienne",
    texte: () => `Ton entraîneur des gardiens veut que tu sortes davantage sur les centres, au risque de te faire lober.`,
    condition: (s) => s.identite.poste === "gardien" && s.saison === 8,
    choix: [
      { texte: "Adopter ce style plus offensif", effets: { technique: 5, reputation: 3, forme: -3 } },
      { texte: "Rester sur ta ligne, plus sûr", effets: { mental: 4, reputation: -1 } },
    ],
  },
  {
    id: "defenseur_tacle_limite",
    texte: (s) => `Face à ${s.relations.rival.nom}, l'occasion d'un tacle à la limite du raisonnable se présente pour stopper une action dangereuse.`,
    condition: (s) => s.identite.poste === "defenseur" && s.saison === 6,
    choix: [
      { texte: "Y aller à fond, quitte à prendre un carton", effets: { reputation: 4, rivalTension: 12, mental: 3 } },
      { texte: "Rester prudent et concéder le corner", effets: { mental: -1, coachConfiance: 4 } },
    ],
  },
  {
    id: "defenseur_relance_propre",
    texte: () => `Ton coach veut faire de toi un défenseur relanceur, davantage impliqué dans la construction du jeu.`,
    condition: (s) => s.identite.poste === "defenseur" && s.saison === 9,
    choix: [
      { texte: "Travailler ta technique de relance", effets: { technique: 6, coachConfiance: 6 } },
      { texte: "Rester sur tes points forts défensifs", effets: { physique: 4, mental: 2 } },
    ],
  },
  {
    id: "milieu_role_tactique",
    texte: () => `Ton coach hésite entre te faire jouer relayeur box-to-box ou meneur de jeu plus reculé.`,
    condition: (s) => s.identite.poste === "milieu" && s.saison === 6,
    choix: [
      { texte: "Pousser pour le rôle de meneur, plus créatif", effets: { technique: 6, reputation: 3 } },
      { texte: "Accepter le rôle box-to-box, plus utile au collectif", effets: { physique: 5, coachConfiance: 5 } },
    ],
  },
  {
    id: "attaquant_tireur_penalty",
    texte: (s) => `${s.relations.coequipiers[0].nom} et toi êtes tous deux candidats pour devenir le tireur de penalty attitré de l'équipe.`,
    condition: (s) => s.identite.poste === "attaquant" && s.saison === 5,
    choix: [
      { texte: "Revendiquer le rôle avec assurance", effets: { reputation: 5, coequipierComplicite: -6, coequipierIndex: 0 } },
      { texte: "Laisser la responsabilité à ton coéquipier", effets: { coequipierComplicite: 8, coequipierIndex: 0, stabilite: 3 } },
    ],
  },
  {
    id: "attaquant_secheresse_but",
    texte: () => `Une période sans marquer s'éternise et la pression médiatique commence à peser.`,
    condition: (s) => s.identite.poste === "attaquant" && s.saison === 8,
    choix: [
      { texte: "Travailler seul après les entraînements pour rassurer ton geste", effets: { technique: 6, forme: -4, mental: 4 } },
      { texte: "En parler ouvertement en conférence de presse", effets: { reputation: 3, followers: 1200, stabilite: -2 } },
    ],
  },

  // ---- GRANDES COMPÉTITIONS INTERNATIONALES ----
  {
    id: "coupe_du_monde_selection",
    texte: () => `Le sélectionneur national dévoile sa liste pour la plus grande compétition internationale. Ton nom y figure.`,
    condition: (s) => s.saison === 8 && s.stats.reputation > 45,
    choix: [
      { texte: "Vivre ce moment à fond, quitte à te mettre une pression folle", effets: { followers: 10000, reputation: 10, forme: -6, mental: 4 } },
      { texte: "Rester concentré, sans en faire trop médiatiquement", effets: { mental: 6, reputation: 5 } },
    ],
  },
  {
    id: "coupe_du_monde_capitanat",
    texte: () => `À quelques jours du tournoi, le sélectionneur envisage de te confier le brassard pour cette compétition majeure.`,
    condition: (s) => s.saison === 8 && s.stats.reputation > 55,
    choix: [
      { texte: "Accepter cette responsabilité historique", effets: { reputation: 12, mental: 6, followers: 8000 } },
      { texte: "Suggérer un cadre plus expérimenté", effets: { stabilite: 5 } },
    ],
  },
  {
    id: "continentale_finale",
    texte: (s) => `Ton équipe nationale atteint la finale de la compétition continentale, face à une sélection où évolue ${s.relations.rival.nom}.`,
    condition: (s) => s.saison === 12 && s.stats.reputation > 60,
    choix: [
      { texte: "Prendre le tir au but décisif si ça va aux penaltys", effets: { mental: 10, followers: 12000, rivalTension: -20 } },
      { texte: "Laisser un cadre plus expérimenté prendre cette responsabilité", effets: { stabilite: 6, rivalTension: -5 } },
    ],
  },

  // ---- BRANCHES PERSONNALITÉ SUPPLÉMENTAIRES ----
  {
    id: "choix_reconversion",
    texte: () => `Ta carrière touche à sa fin. Il est temps de penser sérieusement à l'après.`,
    condition: (s) => s.age === 37,
    choix: [
      { texte: "Passer ton diplôme d'entraîneur", effets: { reconversion: "entraineur", stabilite: 4 } },
      { texte: "Devenir consultant TV", effets: { reconversion: "consultant", followers: 3000, argent: 10000 } },
      { texte: "Devenir agent de joueurs", effets: { reconversion: "agent", argent: 5000 } },
      { texte: "Devenir recruteur pour un club", effets: { reconversion: "recruteur", stabilite: 3 } },
      { texte: "Viser la présidence d'un club (gros investissement)", effets: { reconversion: "president", argent: -100000, reputation: 5 } },
      { texte: "Profiter pleinement de ta retraite, sans rebondir tout de suite", effets: { reconversion: "aucune", stabilite: 8 } },
    ],
  },
  {
    id: "formation_u17",
    texte: () => `Le sélectionneur des moins de 17 ans t'invite à un premier stage de détection.`,
    condition: (s) => s.saison === 1,
    choix: [
      { texte: "Saisir cette chance à fond", effets: { reputation: 4, technique: 2, forme: -3 } },
      { texte: "Rester concentré sur ton club formateur", effets: { technique: 3, stabilite: 2 } },
    ],
  },
  {
    id: "charismatique_marque_signature",
    texte: () => `Ta célébration de but est devenue virale. Une marque veut la déposer avec toi comme égérie exclusive.`,
    condition: (s) => s.saison === 6 && s.identite.personnalite === "charismatique",
    choix: [
      { texte: "Signer l'exclusivité, ça peut rapporter gros", effets: { argent: 35000, followers: 5000 } },
      { texte: "Rester libre de tes mouvements", effets: { stabilite: 3 } },
    ],
  },
  {
    id: "provocateur_rivalite_mediatique",
    texte: (s) => `Une chaîne sportive te propose un débat télévisé face à ${s.relations.rival.nom}, façon confrontation.`,
    condition: (s) => s.saison === 9 && s.identite.personnalite === "provocateur",
    choix: [
      { texte: "Accepter, le show est ton terrain de jeu", effets: { followers: 7000, hateRatio: 10, rivalTension: 15 } },
      { texte: "Décliner cette fois", effets: { stabilite: 4 } },
    ],
  },
];

function randomGrandClub() {
  return GRANDS_CLUBS[Math.floor(Math.random() * GRANDS_CLUBS.length)];
}

// ---- Aides pour lier les offres de transfert à la forme et aux perfs réelles ----
function derniereNote(s) {
  const arr = s.historique.statistiquesParSaison;
  return arr.length > 0 ? arr[arr.length - 1].note : null;
}
function derniersButs(s) {
  const arr = s.historique.statistiquesParSaison;
  return arr.length > 0 ? arr[arr.length - 1].buts : 0;
}
// Un gros club ne vient chercher que les joueurs en forme ET performants la saison passée
function meriteGrosseOffre(s, seuilNote = 6.2) {
  const note = derniereNote(s);
  return s.stats.forme >= 55 && (note === null || note >= seuilNote);
}

// ============================================================
// ÉVÉNEMENTS PONCTUELS (aléatoires, se déclenchent en cours de saison)
// ============================================================
export const EVENEMENTS_PONCTUELS = [
  {
    id: "rumeur_transfert",
    probabilite: (s) => {
      const note = derniereNote(s);
      const bonusPerf = note !== null ? (note - 6) * 0.05 : 0;
      const malusForme = s.stats.forme < 45 ? -0.1 : 0;
      return Math.max(0, 0.15 + s.stats.reputation / 400 + bonusPerf + malusForme);
    },
    texte: () => `Une rumeur de transfert vers un club prestigieux enfle sur les réseaux.`,
    journaliste: "insider",
    newsTexte: (nom) => `${nom} suivi de près par plusieurs recruteurs européens. Dossier à suivre.`,
    choix: [
      { texte: "Alimenter la rumeur (story énigmatique)", effets: { followers: 1200, hateRatio: 5, reputation: 3 } },
      { texte: "Démentir publiquement", effets: { stabilite: 5, followers: -100 } },
      { texte: "Ignorer complètement", effets: {} },
    ],
  },
  {
    id: "clash_reseaux",
    probabilite: (s) => 0.13 + s.stats.hateRatio / 220,
    texte: () => `Un ancien coéquipier te clashe indirectement dans une interview.`,
    journaliste: "tabloid",
    newsTexte: (nom) => `Tensions dans le vestiaire ? Les non-dits autour de ${nom} font jaser.`,
    choix: [
      { texte: "Répondre avec un tacle bien senti", effets: { followers: 2000, hateRatio: 15, stabilite: -5 } },
      { texte: "Rester au-dessus de la mêlée", effets: { reputation: 4, stabilite: 3 } },
    ],
  },
  {
    id: "blessure",
    probabilite: (s) => (s.blessureActuelle ? 0 : 0.1 + (100 - s.stats.forme) / 400),
    texte: () => `Douleur musculaire suspecte à l'entraînement, la veille d'un match clé.`,
    journaliste: "analyste",
    newsTexte: (nom) => `Inquiétude autour de la condition physique de ${nom} avant l'échéance à venir.`,
    choix: [
      { texte: "Jouer sur les nerfs, quitte à aggraver la blessure", effets: { forme: -10, reputation: 5 }, risqueBlessure: "eleve" },
      { texte: "Déclarer forfait pour se soigner", effets: { forme: 8, reputation: -4 }, risqueBlessure: "faible" },
    ],
  },
  {
    id: "offre_sponsor",
    probabilite: (s) => 0.18 + s.stats.followers / 60000,
    texte: () => `Une marque te propose un contrat de sponsoring.`,
    journaliste: "insider",
    newsTexte: (nom) => `${nom} en discussion avancée avec une marque pour un partenariat.`,
    isSponsor: true,
    choix: [
      { texte: "Négocier et signer", effets: { reputation: 2 }, sponsor: true },
      { texte: "Refuser, pas envie de te disperser", effets: { stabilite: 2 } },
    ],
  },
  {
    id: "moment_famille",
    probabilite: (s) => (s.viePerso.enCouple ? 0.18 : 0.05),
    texte: () => `Ta famille te réclame plus de présence, entre les déplacements et les entraînements.`,
    journaliste: null,
    choix: [
      { texte: "Prendre du temps pour eux, quitte à lever le pied", effets: { stabilite: 10, mental: 5, forme: -3 } },
      { texte: "Rester focus sur la carrière", effets: { forme: 3, stabilite: -8 } },
    ],
  },
  {
    id: "interview_polemique",
    probabilite: () => 0.13,
    texte: () => `Un journaliste te pousse dans tes retranchements sur un sujet sensible en conférence de presse.`,
    journaliste: "tabloid",
    newsTexte: (nom) => `Sortie remarquée de ${nom} en conférence de presse, les réactions fusent en ligne.`,
    choix: [
      { texte: "Répondre franchement, quitte à faire des vagues", effets: { followers: 1500, hateRatio: 10, reputation: -2 } },
      { texte: "Rester diplomate et évasif", effets: { reputation: 3, followers: -50 } },
    ],
  },
  {
    id: "photo_soiree",
    probabilite: (s) => 0.1 + s.stats.followers / 80000,
    texte: () => `Des photos de toi en soirée circulent, sorties de leur contexte.`,
    journaliste: "peopolisation",
    newsTexte: (nom) => `Soirée mouvementée pour ${nom}, les images enflamment la toile.`,
    choix: [
      { texte: "Prendre ça avec humour publiquement", effets: { followers: 2500, hateRatio: 3 } },
      { texte: "Publier un communiqué pour clarifier", effets: { stabilite: 4, reputation: -1 } },
      { texte: "Ne rien dire, laisser passer l'orage", effets: { stabilite: -3 } },
    ],
  },
  {
    id: "critique_analyste",
    probabilite: () => 0.14,
    texte: () => `Une consultante TV démonte tes statistiques des dernières semaines en direct.`,
    journaliste: "analyste",
    newsTexte: (nom) => `Analyse sans concession de la forme actuelle de ${nom}.`,
    choix: [
      { texte: "Répondre par la performance sur le terrain uniquement", effets: { technique: 3, mental: 3 } },
      { texte: "Répondre publiquement à la critique", effets: { followers: 1000, hateRatio: 8 } },
    ],
  },
  {
    id: "edito_carriere",
    probabilite: (s) => s.saison >= 6 ? 0.1 : 0,
    texte: () => `Un éditorialiste reconnu publie un long papier sur la trajectoire de ta carrière.`,
    journaliste: "chroniqueur",
    newsTexte: (nom) => `Portrait en profondeur : où en est vraiment la carrière de ${nom} ?`,
    choix: [
      { texte: "Saluer publiquement l'article", effets: { reputation: 3, followers: 500 } },
      { texte: "Ne pas réagir", effets: {} },
    ],
  },
  {
    id: "opportunite_investissement",
    probabilite: (s) => (s.finances.argent > 50000 ? 0.12 : 0),
    texte: () => `Un ancien coéquipier reconverti te propose d'investir dans son projet entrepreneurial.`,
    journaliste: null,
    choix: [
      { texte: "Investir, croire au projet", effets: { argent: -25000, stabilite: 3 } },
      { texte: "Rester prudent avec ton argent", effets: { stabilite: -2 } },
    ],
  },
  {
    id: "agent_nouvelle_offre",
    probabilite: (s) => 0.12 + s.relations.agent.confiance / 400,
    texte: (s) => `${s.relations.agent.nom} débarque avec une offre surprise d'un club étranger.`,
    journaliste: "insider",
    newsTexte: (nom) => `${nom} au coeur d'un intérêt étranger relayé par son entourage proche.`,
    choix: [
      { texte: "Étudier sérieusement la piste", effets: { agentConfiance: 8, followers: 800 } },
      { texte: "Couper court, tu n'es pas intéressé", effets: { agentConfiance: -5 } },
    ],
  },
  {
    id: "coequipier_celebration",
    probabilite: (s) => 0.1 + s.relations.coequipiers[0].complicite / 300,
    texte: (s) => `Après une belle victoire, ${s.relations.coequipiers[0].nom} poste une story complice avec toi.`,
    journaliste: null,
    choix: [
      { texte: "Repartager avec un message chaleureux", effets: { followers: 900, coequipierComplicite: 8, coequipierIndex: 0 } },
      { texte: "Ne pas relayer, rester discret", effets: {} },
    ],
  },
  {
    id: "geste_solidaire",
    probabilite: (s) => 0.08 + s.stats.reputation / 500,
    texte: () => `Une catastrophe naturelle touche une région de ton pays d'origine.`,
    journaliste: "chroniqueur",
    newsTexte: (nom) => `Élan de solidarité : ${nom} annonce un geste envers les sinistrés.`,
    choix: [
      { texte: "Faire un don important et médiatisé", effets: { argent: -15000, reputation: 10, followers: 3000 } },
      { texte: "Faire un don discret, sans communication", effets: { argent: -8000, reputation: 4 } },
      { texte: "Ne pas participer cette fois", effets: { reputation: -3 } },
    ],
  },
  {
    id: "usurpation_identite",
    probabilite: (s) => 0.07 + s.stats.followers / 100000,
    texte: () => `Un faux compte se faisant passer pour toi arnaque des fans avec de fausses promotions.`,
    journaliste: "tabloid",
    newsTexte: (nom) => `Attention aux faux comptes : des fans de ${nom} auraient été arnaqués.`,
    choix: [
      { texte: "Publier un avertissement officiel", effets: { reputation: 5, stabilite: -2 } },
      { texte: "Laisser tes équipes gérer discrètement", effets: { stabilite: 1 } },
    ],
  },
  {
    id: "record_personnel",
    probabilite: (s) => 0.1 + s.stats.technique / 400,
    texte: () => `Tu approches d'un record personnel marquant sur les dernières rencontres.`,
    journaliste: "analyste",
    newsTexte: (nom) => `${nom} à un pas d'un record personnel remarquable cette saison.`,
    choix: [
      { texte: "En faire un objectif public assumé", effets: { followers: 2000, mental: -3, reputation: 4 } },
      { texte: "Rester discret là-dessus", effets: { mental: 3 } },
    ],
  },
  {
    id: "invitation_evenement_mondain",
    probabilite: (s) => 0.09 + s.stats.followers / 90000,
    texte: () => `Tu es invité à un gala de mode prestigieux très suivi sur les réseaux.`,
    journaliste: "peopolisation",
    newsTexte: (nom) => `${nom} remarqué sur le tapis rouge d'un gala très people ce week-end.`,
    choix: [
      { texte: "Y aller, l'exposition médiatique est excellente", effets: { followers: 4000, forme: -2, argent: -3000 } },
      { texte: "Décliner poliment", effets: { forme: 2 } },
    ],
  },
  {
    id: "podcast_intimiste",
    probabilite: () => 0.09,
    texte: () => `Un podcast reconnu pour ses interviews sans filtre te propose un long entretien.`,
    journaliste: "chroniqueur",
    newsTexte: (nom) => `Entretien fleuve : ${nom} se livre comme jamais dans un podcast très suivi.`,
    choix: [
      { texte: "Accepter et te livrer sincèrement", effets: { followers: 3500, reputation: 5, stabilite: -3 } },
      { texte: "Accepter mais rester très mesuré", effets: { followers: 1000, reputation: 2 } },
      { texte: "Refuser l'invitation", effets: {} },
    ],
  },
  {
    id: "coach_tension_tactique",
    probabilite: (s) => 0.1 + (100 - s.relations.coach.confiance) / 300,
    texte: (s) => `${s.relations.coach.nom} remet en question ton positionnement tactique devant tout le vestiaire.`,
    journaliste: null,
    choix: [
      { texte: "Défendre ton point de vue calmement", effets: { coachConfiance: 6, mental: 3 } },
      { texte: "Encaisser sans réagir", effets: { coachConfiance: 3, stabilite: -3 } },
    ],
  },
  {
    id: "rival_declaration_presse",
    probabilite: (s) => 0.08 + s.relations.rival.tension / 250,
    texte: (s) => `${s.relations.rival.nom} te chambre ouvertement dans une interview d'avant-match.`,
    journaliste: "tabloid",
    newsTexte: (nom) => `Piques échangées entre ${nom} et son plus grand rival avant le choc à venir.`,
    choix: [
      { texte: "Répondre sur le même ton", effets: { followers: 2500, rivalTension: 12, hateRatio: 5 } },
      { texte: "Répondre uniquement sur le terrain", effets: { mental: 5, rivalTension: -3 } },
    ],
  },
  {
    id: "deuil_proche",
    probabilite: (s) => (s.historique.deuilVecu ? 0 : 0.025),
    texte: () => `Une épreuve personnelle difficile te touche : un proche qui compte énormément pour toi s'en va.`,
    journaliste: null,
    choix: [
      { texte: "Prendre du temps loin des terrains pour traverser cette période", effets: { forme: -8, mental: -3, stabilite: -5, flag: "deuilVecu" } },
      { texte: "Te réfugier dans le travail et les entraînements", effets: { forme: -3, mental: -8, technique: 2, flag: "deuilVecu" } },
    ],
  },
  {
    id: "crise_sanitaire_mondiale",
    probabilite: (s) => (s.historique.criseVecue || s.saison < 4 || s.saison > 11 ? 0 : 0.04),
    texte: () => `Une crise sanitaire mondiale interrompt le football pendant plusieurs mois. Championnats à l'arrêt, incertitude générale.`,
    journaliste: "chroniqueur",
    newsTexte: (nom) => `Comme tous les joueurs, ${nom} vit une saison bouleversée par l'arrêt des compétitions.`,
    choix: [
      { texte: "Garder le moral et t'entraîner seul chez toi", effets: { mental: 4, forme: -5, flag: "criseVecue" } },
      { texte: "Cette pause à l'arrêt te pèse moralement", effets: { stabilite: -8, flag: "criseVecue" } },
      { texte: "Profiter de cette pause forcée pour ta famille", effets: { stabilite: 6, forme: -5, flag: "criseVecue" } },
    ],
  },
  {
    id: "instabilite_pays_origine",
    probabilite: (s) => (s.historique.instabiliteVecue ? 0 : 0.035),
    texte: () => `Ton pays d'origine traverse une période d'instabilité. Ta famille reste sur place et tu t'inquiètes pour elle.`,
    journaliste: null,
    choix: [
      { texte: "Financer leur installation dans un endroit plus sûr", effets: { argent: -20000, stabilite: 10, flag: "instabiliteVecue" } },
      { texte: "Envoyer un soutien financier régulier à distance", effets: { argent: -5000, stabilite: 4, flag: "instabiliteVecue" } },
      { texte: "Tu ne peux pas faire grand-chose pour l'instant, ça te pèse", effets: { stabilite: -10, mental: -3, flag: "instabiliteVecue" } },
    ],
  },

  // ---- VIE DU CLUB ----
  {
    id: "changement_entraineur",
    probabilite: (s) => 0.06 + (100 - s.relations.coach.confiance) / 500,
    texte: (s) => `Résultats décevants : ${s.relations.coach.nom} est limogé. Un nouveau coach débarque et doit vite te juger.`,
    journaliste: "insider",
    newsTexte: (nom) => `Changement de staff technique : le nouvel entraîneur devra vite composer avec ${nom}.`,
    nouveauCoach: true,
    choix: [
      { texte: "Aller te présenter dès son arrivée pour marquer des points", effets: { coachConfianceReset: 60, mental: 3 } },
      { texte: "Le laisser venir à toi, sans forcer", effets: { coachConfianceReset: 45 } },
    ],
  },
  {
    id: "crise_financiere_club",
    probabilite: () => 0.05,
    texte: () => `Ton club traverse de sérieuses difficultés financières. Les salaires pourraient être temporairement réduits.`,
    journaliste: "analyste",
    newsTexte: (nom) => `Difficultés financières au club : l'entourage de ${nom} suit la situation de près.`,
    choix: [
      { texte: "Accepter une baisse temporaire de salaire par solidarité", effets: { argent: -8000, reputation: 6, coachConfiance: 8 } },
      { texte: "Demander à ton agent d'étudier un départ", effets: { agentConfiance: 5, reputation: -3 } },
    ],
  },
  {
    id: "descente_club",
    probabilite: (s) => 0.04 + (100 - s.stats.reputation) / 600,
    texte: (s) => `Catastrophe sportive : ${s.identite.club} est relégué en division inférieure.`,
    journaliste: "tabloid",
    newsTexte: (nom) => `Descente historique : que va décider ${nom} pour la suite de sa carrière ?`,
    choix: [
      { texte: "Rester et se battre pour la remontée immédiate", effets: { reputation: 8, coachConfiance: 10, followers: 1500 } },
      { texte: "Forcer ton départ vers un club de niveau supérieur", effets: { reputation: -5, agentConfiance: -5, followers: 500 } },
    ],
  },
  {
    id: "scandale_sponsoring",
    probabilite: (s) => (s.finances.sponsors.length > 0 ? 0.05 : 0),
    texte: () => `Une de tes marques partenaires est visée par une polémique publique. Les regards se tournent vers toi.`,
    journaliste: "tabloid",
    newsTexte: (nom) => `${nom} éclaboussé par ricochet par la polémique visant l'un de ses sponsors.`,
    perteSponsor: true,
    choix: [
      { texte: "Rompre immédiatement le contrat", effets: { argent: -5000, reputation: 6, stabilite: 3 } },
      { texte: "Attendre d'en savoir plus avant de réagir", effets: { reputation: -4, stabilite: -3 } },
    ],
  },
];

// ============================================================
// Générateurs de réactions fans / haters selon l'état
// ============================================================
export const TEMPLATES_FANS = [
  (nom) => `${nom} mérite vraiment plus de reconnaissance, un des plus réguliers de la ligue 🔥`,
  (nom) => `Je ne rate jamais un match de ${nom}, quelle carrière en train de s'écrire 🐐`,
  (nom) => `${nom} dans mon onze de la saison sans hésiter`,
  (nom) => `On ne parle pas assez de ${nom} cette saison, franchement injuste`,
  (nom) => `${nom} a une éthique de travail incroyable, un exemple pour les jeunes`,
  (nom) => `Ce que fait ${nom} en ce moment, c'est du niveau international`,
  (nom) => `${nom} restera une légende pour ma génération, aucun débat`,
];

export const TEMPLATES_HATERS = [
  (nom) => `${nom} surcoté, je comprends pas le buzz autour de lui`,
  (nom) => `Encore une interview à côté de la plaque de ${nom}...`,
  (nom) => `${nom} ferait mieux de se concentrer sur le terrain que sur Picstar`,
  (nom) => `${nom} vit sur sa réputation, plus le niveau d'avant clairement`,
  (nom) => `Le contrat de ${nom} est totalement surévalué pour ce qu'il apporte`,
  (nom) => `${nom} n'a jamais su gérer la pression dans les grands matchs`,
  (nom) => `Franchement ${nom} en fait trop sur les réseaux ces derniers temps`,
];

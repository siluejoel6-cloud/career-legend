# Career Legend

Simulateur de carrière de footballeur ultra-réaliste : décisions de saison,
événements aléatoires, réseaux sociaux fans/haters, presse fictive,
sponsoring, patrimoine et vie de famille.

## Démarrer en local

```bash
npm install
npm run dev
```

## Déployer

Le projet est un starter Vite + React + Tailwind v4, prêt pour Vercel :
```bash
npm run build
```
puis déploie le dossier généré (ou connecte le repo directement sur Vercel).

## Sauvegarde cloud (Supabase)

Le jeu fonctionne **sans rien configurer** (sauvegarde locale automatique
dans le navigateur). Pour activer la sauvegarde cloud et retrouver ta
carrière sur un autre appareil :

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Dans **SQL Editor**, colle et exécute le contenu de `supabase/schema.sql`
3. Dans **Project Settings > API**, récupère l'URL et la clé `anon public`
4. Copie `.env.example` en `.env` et renseigne les deux valeurs
5. Sur Vercel, ajoute les mêmes variables dans **Settings > Environment
   Variables** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

Sans ces variables, `src/engine/supabaseClient.js` désactive proprement le
cloud et tout continue de fonctionner en local — aucun risque de casser le
jeu si tu ne configures rien.

**Note sécurité V1** : pas de compte utilisateur, l'identification se fait
par un `device_id` anonyme généré et stocké dans le navigateur. Pratique et
suffisant pour une V1 solo, mais une carrière n'est donc récupérable que si
tu as accès à ce `device_id` (donc pas de vraie portabilité "changer de
téléphone" sans copier le localStorage). Passer à une vraie authentification
Supabase (email ou magic link) est l'évolution naturelle si tu veux des
comptes joueurs à part entière.

## Structure

- `src/data/gameData.js` — **tout le contenu** : décisions, événements,
  journalistes fictifs, sponsors, biens. C'est ici que tu ajoutes du contenu
  sans toucher au reste.
- `src/engine/gameEngine.js` — la logique pure (aucun JSX) : calcul des
  effets, progression de saison, génération des feeds. Facile à tester et
  à faire évoluer indépendamment de l'UI.
- `src/components/` — l'interface : création de personnage, tableau de bord,
  feeds réseaux/presse, panneau finances/famille, carte de décision.

## Idées pour la suite

- Ajouter plus de décisions/événements dans `gameData.js` (le moteur les
  gère automatiquement dès qu'ils respectent le même format)
- Ajouter des branches narratives selon la personnalité choisie
- Sauvegarder la partie (localStorage ou Supabase, comme sur Boss Lady Glam)
- Système de clubs multiples avec transferts réels et négociation de salaire
- Historique de matchs résumé texte (sans simulation détaillée, comme demandé)

⚠️ Les journalistes et marques du jeu sont **100% fictifs**, volontairement,
pour éviter tout usage de noms/marques réels.

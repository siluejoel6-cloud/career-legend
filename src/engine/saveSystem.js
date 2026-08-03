// Sauvegarde de partie : locale (toujours, instantanée) + cloud Supabase
// (si configuré via les variables d'environnement VITE_SUPABASE_URL /
// VITE_SUPABASE_ANON_KEY). Le local sert de cache rapide et de filet de
// sécurité hors-ligne ; le cloud permet de reprendre sur un autre appareil.

import { supabase, getDeviceId } from "./supabaseClient";

const SAVE_KEY = "career-legend:save";

// ---- Local (toujours actif) ----
export function sauvegarderLocal(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function chargerSauvegardeLocale() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function effacerSauvegardeLocale() {
  localStorage.removeItem(SAVE_KEY);
}

export function aUneSauvegarde() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

// ---- Cloud (best-effort, ne bloque jamais le jeu si ça échoue) ----
export async function sauvegarder(state) {
  sauvegarderLocal(state);
  if (!supabase) return;
  try {
    const deviceId = getDeviceId();
    const payload = {
      device_id: deviceId,
      nom_joueur: state.identite.nom,
      state,
      saison: state.saison,
      en_carriere: state.enCarriere,
      score: state.enCarriere ? null : scoreApprox(state),
    };
    // On évite .upsert(onConflict: 'device_id') : notre contrainte d'unicité est un
    // index PARTIEL (device_id WHERE en_carriere = true), que Postgres ne peut pas
    // utiliser comme cible d'un ON CONFLICT simple. Update-ou-insert manuel à la place.
    const { data: existant } = await supabase
      .from("carrieres")
      .select("id")
      .eq("device_id", deviceId)
      .eq("en_carriere", true)
      .maybeSingle();
    if (existant) {
      await supabase.from("carrieres").update(payload).eq("id", existant.id);
    } else {
      await supabase.from("carrieres").insert(payload);
    }
  } catch (err) {
    console.warn("Sauvegarde cloud échouée, la partie reste sauvegardée en local.", err);
  }
}

export async function chargerSauvegarde() {
  if (!supabase) return chargerSauvegardeLocale();
  try {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from("carrieres")
      .select("state")
      .eq("device_id", deviceId)
      .eq("en_carriere", true)
      .maybeSingle();
    if (error) throw error;
    if (data?.state) {
      sauvegarderLocal(data.state); // resynchronise le cache local
      return data.state;
    }
  } catch (err) {
    console.warn("Lecture cloud échouée, utilisation de la sauvegarde locale.", err);
  }
  return chargerSauvegardeLocale();
}

export async function effacerSauvegarde() {
  effacerSauvegardeLocale();
  if (!supabase) return;
  try {
    const deviceId = getDeviceId();
    await supabase.from("carrieres").delete().eq("device_id", deviceId).eq("en_carriere", true);
  } catch (err) {
    console.warn("Suppression cloud échouée.", err);
  }
}

function scoreApprox(state) {
  const { technique, physique, mental, reputation } = state.stats;
  return Math.round((technique + physique + mental + reputation) / 4);
}

// ---- Fin de carrière : enregistrement pour le classement + calcul du percentile réel ----
export async function enregistrerCarriereTerminee(state, score) {
  if (!supabase) return;
  try {
    const deviceId = getDeviceId();
    await supabase.from("carrieres").insert({
      device_id: deviceId,
      nom_joueur: state.identite.nom,
      state,
      saison: state.saison,
      en_carriere: false,
      score,
    });
  } catch (err) {
    console.warn("Enregistrement de fin de carrière échoué (le score reste affiché localement).", err);
  }
}

// Calcule "tu as fait mieux que X% des carrières terminées" à partir des vraies parties jouées.
// Retourne null si Supabase n'est pas configuré ou s'il n'y a pas encore assez de données.
export async function calculerPercentile(score) {
  if (!supabase) return null;
  try {
    const { count: total, error: e1 } = await supabase
      .from("carrieres")
      .select("*", { count: "exact", head: true })
      .eq("en_carriere", false);
    if (e1) throw e1;
    if (!total || total < 5) return null;

    const { count: inferieurs, error: e2 } = await supabase
      .from("carrieres")
      .select("*", { count: "exact", head: true })
      .eq("en_carriere", false)
      .lt("score", score);
    if (e2) throw e2;

    return Math.round(((inferieurs ?? 0) / total) * 100);
  } catch (err) {
    console.warn("Calcul du percentile échoué.", err);
    return null;
  }
}

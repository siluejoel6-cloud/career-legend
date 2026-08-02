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
    await supabase.from("carrieres").upsert(
      {
        device_id: deviceId,
        nom_joueur: state.identite.nom,
        state,
        saison: state.saison,
        en_carriere: state.enCarriere,
        score: state.enCarriere ? null : scoreApprox(state),
      },
      { onConflict: "device_id" }
    );
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

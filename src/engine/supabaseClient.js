import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si les variables d'environnement ne sont pas configurées, le jeu
// continue de fonctionner en local (voir engine/saveSystem.js).
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// Identifiant anonyme de l'appareil, généré une fois et conservé en local.
// Sert à retrouver "ta" carrière sans compte utilisateur.
const DEVICE_KEY = "career-legend:device-id";

export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

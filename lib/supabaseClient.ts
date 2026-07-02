// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Asegúrate de que estas variables estén en tu archivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificación básica para asegurar que las variables estén definidas
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Crea y exporta el cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
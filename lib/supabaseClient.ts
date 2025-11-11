// lib/supabase/client.ts (Asegúrate de que solo contenga esto)
import { createBrowserClient } from '@supabase/ssr'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Crea y exporta el cliente Supabase para el navegador
// La inicialización debe ocurrir solo aquí.
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
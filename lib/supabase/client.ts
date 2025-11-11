// lib/supabase/client.ts
// Este cliente es para uso en el navegador (Client Components)

import { createBrowserClient } from '@supabase/ssr'; // Usamos createBrowserClient

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Crea y exporta el cliente Supabase para el navegador
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

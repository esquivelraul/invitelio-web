// components/SupabaseListener.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client'; 

// Este componente debe ser usado una sola vez en el Root Layout
export default function SupabaseListener() {
  const router = useRouter();

  useEffect(() => {
    // Escucha los cambios de estado de autenticación de Supabase.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Al ocurrir un evento, fuerza un refresh del router.
        // Esto le dice a Next.js que re-evalúe los Server Components 
        // y sus protecciones de ruta (app/novios/page.tsx).
        router.refresh(); 
      }
    );

    // Limpieza: importante para detener la suscripción
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  // No renderiza nada.
  return null;
}
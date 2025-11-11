// app/novios/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'; // ⬅️ Nombre de función corregido
import { redirect } from 'next/navigation';
import NoviosDashboard from '@/components/dashboard/NoviosDashboard';

export default async function NoviosPage() {
    
    const supabase = createServerSupabaseClient(); // ⬅️ Uso de la función corregida
    
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        redirect('/login'); 
    }

    return (
        <NoviosDashboard />
    );
}
// app/novios/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'; 
import { redirect } from 'next/navigation';
import NoviosDashboard from '@/components/dashboard/NoviosDashboard';
// Importamos los componentes de cliente directamente en el Server Component
import Header from '@/components/Header'; 
import Footer from '@/components/Footer'; 


export default async function NoviosPage() {
    
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        // La protección de ruta debe funcionar siempre aquí.
        redirect('/login');
    }

    // Retornamos los componentes de cliente envolviendo al Dashboard.
    // Esto es un patrón válido en Next.js.
    return (
        <>
            {/* Header y Footer se renderizarán una vez en el servidor */}
            <Header />
            <NoviosDashboard />
            <Footer />
        </>
    );
}
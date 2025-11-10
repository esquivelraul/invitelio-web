// app/confirmacion/[slug]/page.tsx

import { notFound } from 'next/navigation';
// ⬅️ CORRECCIÓN DE RUTA: Subimos TRES niveles para llegar a la raíz y entrar a /lib
import { createServerSupabaseClient } from '../../../lib/supabase/server'; 
import ConfirmationForm, { Group, Invitee } from '../../../components/forms/ConfirmationForm'; 
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';


// ----------------------------------------------------
// 1. FUNCIÓN DE CARGA DE DATOS (Server-side)
// ----------------------------------------------------

async function getGroupData(slug: string): Promise<any | null> {
    const supabase = createServerSupabaseClient(); 

    const { data: group, error } = await supabase
        .from('groups')
        .select(`
            id,
            nombre,
            slug,
            is_confirmed,
            invitees (id, nombre) 
        `)
        .eq('slug', slug.trim())
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error('Error al cargar datos del grupo:', error.message);
        return null;
    }
    return group;
}


// ----------------------------------------------------
// 2. COMPONENTE DE PÁGINA (Server Component)
// ----------------------------------------------------

export default async function ConfirmationPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    const groupData = await getGroupData(slug);

    if (!groupData) {
        notFound(); 
    }
    
    if (groupData.is_confirmed) {
        // Mensaje de bloqueo
        return (
            <>
                <Header />
                <div className="container mx-auto p-4 max-w-lg text-center mt-20">
                    <h1 className="text-3xl font-bold mb-4" style={{ color: '#e65100' }}>
                        Confirmación Registrada
                    </h1>
                    <p className="text-gray-700">La invitación para **{groupData.nombre}** ya fue procesada y el enlace ha sido deshabilitado.</p>
                    <p className="mt-4 text-sm text-gray-500">Por favor, contacta a los novios si necesitas hacer modificaciones.</p>
                </div>
                <Footer />
            </>
        );
    }
    
    // Renderizar el formulario si el grupo existe y no está confirmado
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <ConfirmationForm group={groupData} />
            </div>
            <Footer />
        </>
    );
}
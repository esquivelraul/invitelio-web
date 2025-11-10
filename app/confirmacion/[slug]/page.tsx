// app/confirmacion/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '../../../lib/supabase/server'; 
import ConfirmationForm, { Group, Invitee } from '../../../components/forms/ConfirmationForm'; 
// ❗ Importar Header y Footer para que se vean ❗
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';


// ----------------------------------------------------
// 1. FUNCIÓN DE CARGA DE DATOS (Server-side)
// ----------------------------------------------------

async function getGroupData(slug: string): Promise<Group | null> {
    const supabase = createServerSupabaseClient(); 

    const { data: group, error } = await supabase
        .from('groups')
        // ❗ CRÍTICO: Aseguramos que la consulta solo traiga campos que existen ❗
        .select(`
            id,
            nombre,
            slug,
            is_confirmed,
            invitees (id, nombre) 
            /* Se eliminó max_count y is_child */
        `)
        .eq('slug', slug.trim())
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error('Error al cargar datos del grupo:', error.message);
        return null;
    }
    // ... (resto de la función) ...
    return group as unknown as Group;
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
    
    // Si la liga está bloqueada
    if (groupData.is_confirmed) {
        return (
            <>
                <Header />
                <div className="container mx-auto p-4 max-w-lg text-center mt-20">
                    <h1 className="text-3xl font-bold mb-4" style={{ color: '#e65100' }}>
                        Confirmación Registrada
                    </h1>
                    <p className="text-gray-700">La invitación para **{groupData.nombre}** ya fue procesada.</p>
                </div>
                <Footer />
            </>
        );
    }
    
    // Si el grupo existe y NO está confirmado (Renderizar el Formulario)
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
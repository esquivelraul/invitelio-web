// app/confirmacion/[slug]/page.tsx

import { notFound } from 'next/navigation';
// ⬅️ CRÍTICO: Importación corregida del cliente Supabase para Server Components
import { createServerSupabaseClient } from '../../../lib/supabase/server'; 
import ConfirmationForm, { Group, Invitee } from '../../../components/forms/ConfirmationForm'; 


// ----------------------------------------------------
// 1. FUNCIÓN DE CARGA DE DATOS (Server-side)
// ----------------------------------------------------

async function getGroupData(slug: string): Promise<Group | null> {
    const supabase = createServerSupabaseClient(); // ⬅️ La función ahora debe ser accesible

    // ... (El resto de tu lógica de SELECT) ...

    const { data: group, error } = await supabase
        .from('groups')
        .select(`
            id,
            nombre,
            slug,
            is_confirmed,
            max_count,
            invitees (id, nombre, is_confirmed, is_child)
        `)
        .eq('slug', slug.trim())
        .limit(1)
        .maybeSingle(); 

    if (error) {
        console.error('Error al cargar datos del grupo:', error.message);
        return null;
    }

    if (!group) {
        return null;
    }

    return group as unknown as Group;
}


// ----------------------------------------------------
// 2. COMPONENTE DE PÁGINA
// ----------------------------------------------------

export default async function ConfirmationPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    const groupData = await getGroupData(slug);

    if (!groupData) {
        notFound(); 
    }
    
    if (groupData.is_confirmed) {
        // ... (Mensaje de bloqueo) ...
        return (
            <div className="container mx-auto p-4 max-w-lg text-center mt-20">
                <h1 className="text-3xl font-bold mb-4" style={{ color: '#e65100' }}>
                    Confirmación Registrada
                </h1>
                <p className="text-gray-700">La invitación para **{groupData.nombre}** ya fue procesada y el enlace ha sido deshabilitado.</p>
                <p className="mt-4 text-sm text-gray-500">Por favor, contacta a los novios si necesitas hacer modificaciones.</p>
            </div>
        );
    }
    
    // Renderizar el formulario si el grupo existe y no está confirmado
    return (
        <div className="min-h-screen bg-gray-50">
            <ConfirmationForm group={groupData} />
        </div>
    );
}
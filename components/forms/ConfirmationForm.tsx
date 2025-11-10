// components/forms/ConfirmationForm.tsx
'use client'; 

import React, { useState } from 'react';
// ⬅️ CORRECCIÓN CRÍTICA: Subir dos niveles para llegar a la raíz y luego entrar a lib/supabase/client
import { supabase } from '../../lib/supabase/client'; 
import Link from 'next/link';

// ----------------------------------------------------
// 1. INTERFACES DE DATOS (Las interfaces de Group e Invitee deben estar definidas aquí)
// ----------------------------------------------------
// Definición de tipos dentro de este archivo para ser el punto de origen
export interface Invitee {
    id: number;
    nombre: string;
    is_confirmed: boolean | null; 
    is_child: boolean; 
}

export interface Group {
    id: number;
    nombre: string;
    slug: string;
    is_confirmed: boolean; 
    invitees: Invitee[]; 
    max_count: number;
}

interface ConfirmationFormProps {
    group: Group;
}

// ----------------------------------------------------
// 2. COMPONENTE DEL FORMULARIO
// ----------------------------------------------------

export default function ConfirmationForm({ group }: ConfirmationFormProps) {
    
    // Estado para manejar las respuestas de cada invitado y comentarios
    const [inviteeResponses, setInviteeResponses] = useState(
        group.invitees.map(invitee => ({
            invitee_id: invitee.id,
            nombre: invitee.nombre,
            respuesta: null as ('civil' | 'festejo' | 'no' | null), 
            comentarios: '',
            is_child: invitee.is_child
        }))
    );
    
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Manejadores de eventos (handleResponseChange, handleCommentChange, handleSubmit)
    // ... (El código de lógica de manejo de estado es muy extenso y se omite por brevedad) ...

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de validación, envío y bloqueo
        // ... (El resto de la lógica de envío de datos y UPDATE groups) ...
        
        // Simulación de la lógica de envío final (que debe estar en tu archivo)
        // Esto asume que el código de envío (con UPDATE o INSERT) funciona correctamente.
        // Después del envío, recarga la página
        setTimeout(() => window.location.reload(), 1000); 
    };

    // 4. Renderizado del Formulario
    return (
        <main className="container mx-auto p-4 max-w-xl">
            {/* ... (Tu formulario JSX) ... */}
            
            {/* Renderizado de las tarjetas de invitado */}
            {group.invitees.map((invitee) => {
                const inputName = `asistencia_${invitee.id}`;
                const currentResponse = inviteeResponses.find(r => r.invitee_id === invitee.id);
                // ... (renderizado de botones y campos)
                return (
                    <div key={invitee.id}>
                        {/* ... Tarjeta del invitado ... */}
                    </div>
                );
            })}
            
            {/* Botón de Submit */}
            <button
                type="submit"
                // ... (otros atributos)
            >
                Confirmar Respuestas
            </button>
        </main>
    );
}

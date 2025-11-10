// components/forms/ConfirmationForm.tsx
'use client'; 

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase/client'; 
import Link from 'next/link';

// ----------------------------------------------------
// 1. INTERFACES DE DATOS (Exportadas para ser usadas en page.tsx)
// ----------------------------------------------------
export interface Invitee {
    id: number;
    nombre: string;
    is_confirmed: boolean | null; 
}

export interface Group {
    id: number;
    nombre: string;
    slug: string;
    is_confirmed: boolean; 
    invitees: Invitee[]; 
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
        }))
    );
    
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Manejador de cambio para las respuestas (Aceptar/Declinar)
    const handleResponseChange = (inviteeId: number, response: 'civil' | 'festejo' | 'no') => {
        setInviteeResponses(prevResponses => 
            prevResponses.map(resp => 
                resp.invitee_id === inviteeId 
                    ? { ...resp, respuesta: response } 
                    : resp
            )
        );
    };

    // Manejador de cambio para los comentarios
    const handleCommentChange = (inviteeId: number, comment: string) => {
        setInviteeResponses(prevResponses => 
            prevResponses.map(resp => 
                resp.invitee_id === inviteeId 
                    ? { ...resp, comentarios: comment }
                    : resp
            )
        );
    };

    // FUNCIÓN DE ENVÍO
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!group.id) {
            setStatusMessage('Error: No se pudo identificar el grupo.');
            return;
        }

        setIsSubmitting(true);
        setStatusMessage('Enviando confirmaciones...');

        // 1. Validación: Asegurar que todos hayan respondido
        const unconfirmed = inviteeResponses.filter(resp => !resp.respuesta);
        if (unconfirmed.length > 0) {
            alert('Por favor, responde por todos los invitados del grupo.');
            setIsSubmitting(false);
            setStatusMessage('Error: Confirma la asistencia de todos.');
            return; // Detener el envío si falta validación
        }

        let allWritesSuccessful = true;
        const transacciones = inviteeResponses.map(resp => ({
            group_id: group.id,
            invitee_id: resp.invitee_id,
            respuesta: resp.respuesta, 
            comentarios: resp.comentarios,
        }));
        
        // 2. Lógica de Escritura Condicional (UPDATE o INSERT)
        for (const dataToWrite of transacciones) {
            
            // A. Intentar actualizar primero
            const { error: updateError, data: updateData } = await supabase
                .from('confirmaciones')
                .update(dataToWrite)
                .eq('invitee_id', dataToWrite.invitee_id)
                .select(); 

            if (updateError && updateError.code !== '406') { 
                console.error('ERROR en UPDATE:', updateError);
                allWritesSuccessful = false;
                break;
            }
            
            // B. Si la actualización fue 0 (registro nuevo), hacer INSERT
            if (!updateData || updateData.length === 0) { 
                const { error: insertError } = await supabase
                    .from('confirmaciones')
                    .insert([dataToWrite])
                    .select(); 

                if (insertError) {
                    console.error('ERROR CRÍTICO en INSERT:', insertError);
                    allWritesSuccessful = false;
                    break;
                }
            }
        }
        
        // 3. Bloqueo de la Liga y Recarga
        if (allWritesSuccessful) {
            const { error: updateError } = await supabase
                .from('groups')
                .update({ is_confirmed: true }) 
                .eq('id', group.id)
                .single();

            if (updateError) {
                 console.error('Fallo al bloquear la liga:', updateError);
                 setStatusMessage('Confirmaciones enviadas. Error al bloquear la liga.');
            } else {
                 setStatusMessage('¡Confirmación enviada con éxito! Recargando...');
                 setTimeout(() => window.location.reload(), 1000); 
            }
        }
        
        setIsSubmitting(false);
    };

    // 4. Renderizado del Formulario
    return (
        <main className="container mx-auto p-4 max-w-xl">
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl" id="rsvp-form">
                
                {/* Estructura Visual del Encabezado */}
                <div className="card-header" style={{ marginBottom: '20px' }}>
                    
                    {/* Banner (Usamos la ruta directa a public/assets) */}
                    <div className="banner">
                         <img src="/assests/BANNER BODA.png" alt="Confirmación de asistencia" className="responsive-banner"/>
                    </div>
                    
                    <h1 id="titulo-invitacion" className="text-2xl font-bold mt-4">Confirmación de asistencia boda {group.nombre}</h1>
                    <p style={{ fontSize: '0.9em', color: '#6D6875' }}>
                        Dirección del evento: <span id="direccion">Hacienda La Luz, De la Revolución 11, Col. Centro, 62620 Tetecala de Las Reformas, Mor.</span>
                    </p>
                    <hr style={{ margin: '15px 0', borderColor: '#eee' }} />

                    {/* Instrucciones Generales */}
                    <h2 className="subtitulo" style={{ fontWeight: 'bold', marginTop: '15px' }}>Queridos invitados:</h2>
                    <p className="instrucciones">
                        Por favor confirma quiénes de tu familia asistirán y a qué fecha. Cada persona debe seleccionar una sola opción entre las siguientes:
                    </p>
                    <ul>
                        <li>Asistirá desde el 13 de noviembre (boda civil)</li>
                        <li>Asistirá el 14 de noviembre (festejo)</li>
                        <li>No asistirá</li>
                    </ul>
                    
                    <hr style={{ marginTop: '20px', borderTop: '1px solid #ccc' }} /> 
                </div>


                {/* Lista de Invitados */}
                <div id="lista-invitados">
                    {inviteeResponses.map((invitee) => {
                        const inputName = `asistencia_${invitee.invitee_id}`;
                        const currentResponse = inviteeResponses.find(r => r.invitee_id === invitee.invitee_id);
                        
                        return (
                            <div key={invitee.invitee_id} className="mb-6 p-4 border border-gray-200 rounded-md">
                                <h3 className="font-bold text-lg mb-3" style={{ color: '#6D6875' }}>
                                    {invitee.nombre} 
                                </h3>
                                
                                {/* Botones de Respuesta - AHORA CON LAS 3 OPCIONES CORRECTAS */}
                                <div className="flex flex-col gap-2">
                                    
                                    {/* 1. Opción: Boda Civil (Valor: Civil) */}
                                    <label htmlFor={`civil_${invitee.invitee_id}`} className="cursor-pointer">
                                        <input 
                                            type="radio" 
                                            id={`civil_${invitee.invitee_id}`} 
                                            name={inputName} 
                                            value="Civil" 
                                            checked={currentResponse?.respuesta === 'civil'}
                                            onChange={() => handleResponseChange(invitee.invitee_id, 'civil')}
                                            required 
                                            className="mr-2 accent-[#b8860b]"
                                        /> Asistirá desde el 13 de noviembre (Boda Civil)
                                    </label>
                                    
                                    {/* 2. Opción: Festejo (Valor: Festejo) */}
                                    <label htmlFor={`festejo_${invitee.invitee_id}`} className="cursor-pointer">
                                        <input 
                                            type="radio" 
                                            id={`festejo_${invitee.invitee_id}`} 
                                            name={inputName} 
                                            value="Festejo" 
                                            checked={currentResponse?.respuesta === 'festejo'}
                                            onChange={() => handleResponseChange(invitee.invitee_id, 'festejo')}
                                            required 
                                            className="mr-2 accent-[#007bff]"
                                        /> Asistirá el 14 de noviembre (Festejo)
                                    </label>
                                    
                                    {/* 3. Opción: No Asistirá (Valor: No) */}
                                    <label htmlFor={`no_${invitee.invitee_id}`} className="cursor-pointer">
                                        <input 
                                            type="radio" 
                                            id={`no_${invitee.invitee_id}`} 
                                            name={inputName} 
                                            value="No" 
                                            checked={currentResponse?.respuesta === 'no'}
                                            onChange={() => handleResponseChange(invitee.invitee_id, 'no')}
                                            required 
                                            className="mr-2 accent-[#dc3545]"
                                        /> No asistirá
                                    </label>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Campo de Comentarios (General) */}
                <div style={{ marginTop: '25px' }}>
                    <label htmlFor="comentarios" style={{ display: 'block', fontWeight: 'bold' }} className="mb-2">Comentarios para los novios (opcional):</label>
                    <textarea 
                        id="comentarios" 
                        rows={3} 
                        value={inviteeResponses[0]?.comentarios || ''}
                        onChange={(e) => handleCommentChange(inviteeResponses[0].invitee_id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                    />
                </div>

                <button 
    type="submit" 
    disabled={isSubmitting}
    style={{ 
        width: '100%', 
        padding: '12px', 
        marginTop: '25px', 
        fontWeight: 'bold', 
        borderRadius: '5px', 
        border: 'none',
        // ❗ APLICAMOS EL AZUL PASTEL EN LÍNEA ❗
        backgroundColor: isSubmitting ? '#ccc' : '#ADD8E6', 
        color: isSubmitting ? '#555' : '#333',
        cursor: 'pointer'
    }}
>
    {isSubmitting ? 'Enviando...' : 'Confirmar Respuestas'}
</button>
                
                {/* Mensaje de estado */}
                {statusMessage && (
                    <p className={`mt-4 text-center font-semibold text-sm ${statusMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {statusMessage}
                    </p>
                )}
            </form>
        </main>
    );
}

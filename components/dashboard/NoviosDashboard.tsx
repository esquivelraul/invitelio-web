// components/dashboard/NoviosDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
// ⬅️ CRÍTICO: Usamos el alias estándar de Next.js.
import { supabase } from '@/lib/supabase/client'; 
// ⬅️ Usamos importaciones limpias, esperando que Next.js compile las librerías.
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Colores definidos (para consistencia)
const COLOR_CIVIL = '#28a745'; 
const COLOR_FESTEJO = '#007bff';
const COLOR_NO = '#dc3545'; 
const COLOR_TEXT = '#3a3a3a'; 

// Definición de tipos para la seguridad del código
interface ConfirmationData {
    id: number;
    invitado_nombre: string;
    respuesta: string;
    comentarios: string;
    fecha_confirmacion: string;
}

export default function NoviosDashboard() {
    const [confirmations, setConfirmations] = useState<ConfirmationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // LÓGICA DE DATOS
    // ------------------------------------

    async function getConfirmationData(): Promise<ConfirmationData[]> {
        // Obtenemos los datos con la estructura anidada de invitees
        const { data, error } = await supabase
            .from('confirmaciones')
            .select(
                `
                id,
                respuesta,
                comentarios,
                invitees (nombre), // ⬅️ invitees es un array de objetos { nombre: string }
                created_at
                `
            )
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error al cargar datos:', error);
            return [];
        }

        // ⬅️ CORRECCIÓN DE TIPADO Y ACCESO A DATOS ANIDADOS ⬅️
        return data.map(conf => {
            // Accedemos al nombre del primer invitado en el array 'invitees'
            const invitadoNombre = conf.invitees && conf.invitees.length > 0
                ? conf.invitees[0].nombre
                : 'N/A';
                
            return {
                id: conf.id,
                invitado_nombre: invitadoNombre,
                respuesta: conf.respuesta,
                comentarios: conf.comentarios,
                fecha_confirmacion: new Date(conf.created_at).toLocaleDateString('es-ES'),
            } as ConfirmationData;
        });
    }

    // LÓGICA DE AUTENTICACIÓN Y CARGA
    // ------------------------------------
    useEffect(() => {
        const checkAuthAndLoad = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                window.location.href = '/login'; 
                return;
            }

            try {
                const data = await getConfirmationData();
                setConfirmations(data);
                // Guardar los datos en el objeto global para la exportación
                (window as any).confirmationData = data; 
            } catch (e) {
                console.error("Fallo al cargar el dashboard:", e);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthAndLoad();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    // LÓGICA DE EXPORTACIÓN A XLSX
    // ------------------------------------
    const handleExport = (data: ConfirmationData[]) => {
        if (data.length === 0) {
            alert('No hay datos para exportar.');
            return;
        }

        const dataForExport = data.map(row => ({
            Invitado: row.invitado_nombre,
            Respuesta: row.respuesta,
            Comentarios: row.comentarios,
            'Fecha de Confirmación': row.fecha_confirmacion,
        }));

        // NOTA: Usamos XLSX y saveAs directamente sin el namespace global
        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Confirmaciones");
        
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        
        saveAs(dataBlob, `confirmaciones_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };


    // LÓGICA DE RENDERIZADO
    // ------------------------------------
    
    // ... (renderSummary function) ...
    // ... (renderTableContent function) ...

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 text-center mt-20">
                <p>Verificando sesión y cargando datos...</p>
            </div>
        );
    }

    // 5. Renderizado final del componente
    return (
        <main className="container mx-auto p-4 max-w-4xl" style={{ marginTop: '50px' }}>
            
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5em', color: COLOR_TEXT }}>
                    Tus Confirmaciones
                </h1>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        id="export-xlsx-button" 
                        onClick={() => handleExport(confirmations)} 
                        style={{ padding: '10px 15px', backgroundColor: COLOR_CIVIL, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9em' }}
                    >
                        Descargar XLSX
                    </button>
                    <button 
                        id="logout-button" 
                        onClick={handleLogout} 
                        style={{ padding: '10px 15px', backgroundColor: COLOR_NO, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9em' }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            {/* Renderizado de Resumen y Tabla */}
            {renderSummary()}
            {renderTableContent()}
            
        </main>
    );
}

// ⚠️ NOTA: Las funciones renderSummary y renderTableContent están omitidas aquí
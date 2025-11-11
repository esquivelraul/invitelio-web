// components/dashboard/NoviosDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client'; 

// ❗ CRÍTICO: Eliminamos las importaciones directas de XLSX/file-saver que causan el error
// Estas librerías serán accedidas usando la importación dinámica dentro de handleExport
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver'; 

// Definición de colores
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

// ----------------------------------------------------
// LÓGICA DE DATOS
// ----------------------------------------------------

async function getConfirmationData(): Promise<ConfirmationData[]> {
    const { data, error } = await supabase
        .from('confirmaciones')
        .select(
            `
            id,
            respuesta,
            comentarios,
            invitees (nombre),
            created_at
            `
        )
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error al cargar datos:', error);
        return [];
    }

    return data.map(conf => {
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

// ----------------------------------------------------
// LÓGICA DE EXPORTACIÓN A XLSX (Acceso Dinámico)
// ----------------------------------------------------
const handleExport = (data: ConfirmationData[]) => {
    if (data.length === 0) {
        alert('No hay datos para exportar.');
        return;
    }
    
    // 🚨 SOLUCIÓN CRÍTICA: Accedemos a librerías globales o fallamos 🚨
    const XLSX_MODULE = (window as any).XLSX;
    const saveAs_FN = (window as any).saveAs;

    if (!XLSX_MODULE || !saveAs_FN) {
        alert('Error: Las librerías de exportación (XLSX/FileSaver) no se cargaron. Revisa tu HTML.');
        return;
    }

    const dataForExport = data.map(row => ({
        Invitado: row.invitado_nombre,
        Respuesta: row.respuesta,
        Comentarios: row.comentarios,
        'Fecha de Confirmación': row.fecha_confirmacion,
    }));

    const worksheet = XLSX_MODULE.utils.json_to_sheet(dataForExport);
    const workbook = XLSX_MODULE.utils.book_new();
    XLSX_MODULE.utils.book_append_sheet(workbook, workbook, worksheet, "Confirmaciones");
    
    const excelBuffer = XLSX_MODULE.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    saveAs_FN(dataBlob, `confirmaciones_${new Date().toISOString().slice(0, 10)}.xlsx`);
};


// ----------------------------------------------------
// LÓGICA DE RENDERIZADO (Implementación de Funciones Faltantes)
// ----------------------------------------------------
    
function renderSummary(confirmations: ConfirmationData[]) {
    // Implementación de la función renderSummary...
    const totalRegistros = confirmations.length;
    let asistiraCivil = confirmations.filter(c => c.respuesta === 'Civil').length;
    let asistiraFestejo = confirmations.filter(c => c.respuesta === 'Festejo').length;
    let noAsistira = confirmations.filter(c => c.respuesta === 'No').length;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center', gap: '10px', marginBlockEnd: '30px' }}>
            {/* Contenedores de resumen omitidos por brevedad, pero deben ir aquí */}
        </div>
    );
}

function renderTableContent(confirmations: ConfirmationData[]) {
    // Implementación de la función renderTableContent (Tabla)...
    if (confirmations.length === 0) {
        return <p style={{ textAlign: 'center', color: '#555' }}>Aún no hay confirmaciones registradas.</p>;
    }
    
    // Retorna el JSX de la tabla de invitados
    return (
        <div style={{ overflowX: 'auto', marginTop: '30px' }}>
            {/* ... (Contenido de la tabla) ... */}
        </div>
    );
}


export default function NoviosDashboard() {
    const [confirmations, setConfirmations] = useState<ConfirmationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // LÓGICA DE AUTENTICACIÓN Y CARGA
    // ... (useEffect, handleLogout, etc. - Funciones de carga permanecen iguales) ...

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
            {renderSummary(confirmations)}
            {renderTableContent(confirmations)}
            
        </main>
    );
}
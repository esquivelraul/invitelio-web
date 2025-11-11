// components/dashboard/NoviosDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client'; 
// Asegúrate de que las dependencias estén instaladas: npm install xlsx file-saver @types/file-saver
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

// ----------------------------------------------------
// LÓGICA DE DATOS: Obtención de Confirmaciones (CORREGIDA)
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

    // 🔑 CORRECCIÓN: Manejo robusto de la relación para extraer el nombre (Array o Objeto)
    return (data as any[]).map(conf => {
        const relationshipData = conf.invitees;
        let invitadoNombre = 'N/A';
        
        if (relationshipData) {
            if (Array.isArray(relationshipData) && relationshipData.length > 0) {
                // Caso 1: Supabase devuelve un array (relación uno a muchos)
                invitadoNombre = relationshipData[0].nombre;
            } else if (typeof relationshipData === 'object' && relationshipData !== null && 'nombre' in relationshipData) {
                // Caso 2: Supabase devuelve un objeto simple (relación uno a uno, lo más común)
                invitadoNombre = relationshipData.nombre;
            }
        }
            
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
// COMPONENTE PRINCIPAL: NoviosDashboard
// ----------------------------------------------------

export default function NoviosDashboard() {
    const [confirmations, setConfirmations] = useState<ConfirmationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // El useEffect SÓLO carga datos (ya no verifica sesión)
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getConfirmationData();
                setConfirmations(data);
            } catch (e) {
                console.error("Fallo al cargar el dashboard:", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // Redirección del lado del cliente después de cerrar sesión
        window.location.href = '/login'; 
    };
    
    // LÓGICA DE EXPORTACIÓN A XLSX
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

        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Confirmaciones");
        
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        
        saveAs(dataBlob, `confirmaciones_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };


    // LÓGICA DE RENDERIZADO DEL RESUMEN
    const renderSummary = () => { 
        const totalRegistros = confirmations.length;
        let asistiraCivil = confirmations.filter(c => c.respuesta === 'Civil').length;
        let asistiraFestejo = confirmations.filter(c => c.respuesta === 'Festejo').length;
        let noAsistira = confirmations.filter(c => c.respuesta === 'No').length;

        // Devuelve el JSX de las tarjetas de resumen
        return (
            <div id="data-summary">
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center', gap: '10px', marginBlockEnd: '30px' }}>
                    
                    <div style={{ margin: 0, padding: '10px', border: '1px solid #ddd', borderRadius: '8px', flexBasis: '45%', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.0em', color: COLOR_TEXT, marginTop: 0 }}>Total Confirmaciones</h3>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: COLOR_TEXT }}>{totalRegistros}</p>
                    </div>
                    
                    <div style={{ margin: 0, padding: '10px', border: `1px solid ${COLOR_CIVIL}`, borderRadius: '8px', flexBasis: '45%', backgroundColor: '#f0fff0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.0em', color: COLOR_CIVIL, marginTop: 0 }}>Asisten Boda Civil</h3>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: COLOR_CIVIL }}>{asistiraCivil}</p>
                    </div>
                    
                    <div style={{ margin: 0, padding: '10px', border: `1px solid ${COLOR_FESTEJO}`, borderRadius: '8px', flexBasis: '45%', backgroundColor: '#f0f8ff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.0em', color: COLOR_FESTEJO, marginTop: 0 }}>Asisten Festejo</h3>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: COLOR_FESTEJO }}>{asistiraFestejo}</p>
                    </div>
                    
                    <div style={{ margin: 0, padding: '10px', border: `1px solid ${COLOR_NO}`, borderRadius: '8px', flexBasis: '45%', backgroundColor: '#fff0f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.0em', color: COLOR_NO, marginTop: 0 }}>No Asisten</h3>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: COLOR_NO }}>{noAsistira}</p>
                    </div>
                </div>
            </div>
        );
    }

    // LÓGICA DE RENDERIZADO DE LA TABLA
    const renderTableContent = () => {
        if (confirmations.length === 0) {
            return <p style={{ textAlign: 'center', color: '#555' }}>Aún no hay confirmaciones registradas.</p>;
        }
        
        return (
            <div id="table-container">
                <div style={{ overflowX: 'auto', marginTop: '30px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px', fontFamily: 'Montserrat, sans-serif' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f8f8' }}>
                                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd', color: COLOR_TEXT }}>Invitado</th>
                                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd', color: COLOR_TEXT }}>Respuesta</th>
                                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd', color: COLOR_TEXT }}>Comentarios</th>
                                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd', color: COLOR_TEXT }}>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmations.map(conf => {
                                const statusColor = conf.respuesta === 'No' ? COLOR_NO : (conf.respuesta === 'Civil' ? COLOR_CIVIL : COLOR_FESTEJO);
                                const statusText = conf.respuesta === 'No' ? 'No Asiste' : (conf.respuesta === 'Civil' ? 'Boda Civil' : 'Festejo');

                                return (
                                    <tr key={conf.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px', fontWeight: 500, color: COLOR_TEXT }}>{conf.invitado_nombre}</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: statusColor }}>{statusText}</td>
                                        <td style={{ padding: '15px', fontSize: '0.9em', maxWidth: '300px' }}>{conf.comentarios || '—'}</td>
                                        <td style={{ padding: '15px', fontSize: '0.9em' }}>{conf.fecha_confirmacion}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };


    if (isLoading) {
        return (
            <div className="container mx-auto p-4 text-center mt-20">
                <p>Cargando datos de confirmaciones...</p>
            </div>
        );
    }

    // Renderizado final
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
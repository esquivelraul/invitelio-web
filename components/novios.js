// js/novios.js
import { supabase } from './supabase.js';

// ❗ CRÍTICO: ELIMINAMOS LOS IMPORTS de XLSX y FileSaver (se cargan globalmente) ❗

// 1. Elementos del DOM (Declaración Global)
const loadingMessage = document.getElementById('loading-message');
const dashboardView = document.getElementById('dashboard-view');
const dataSummary = document.getElementById('data-summary');
const tableContainer = document.getElementById('table-container');
const logoutButton = document.getElementById('logout-button');
const exportButton = document.getElementById('export-xlsx-button'); 

// Colores definidos
const COLOR_CIVIL = '#28a745'; 
const COLOR_FESTEJO = '#007bff';
const COLOR_NO = '#dc3545'; 
const COLOR_TEXT = '#3a3a3a'; 

// Variable global para guardar los datos y poder exportarlos
window.confirmationData = [];


// 2. LÓGICA DE DATOS
// ... (getConfirmationData function remains the same) ...
async function getConfirmationData() {
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
        console.error('CRÍTICO: Error al cargar datos. Mensaje de Supabase:', error);
        return [];
    }

    return data.map(conf => ({
        id: conf.id,
        invitado_nombre: conf.invitees?.nombre || 'N/A',
        respuesta: conf.respuesta,
        comentarios: conf.comentarios,
        fecha_confirmacion: new Date(conf.created_at).toLocaleDateString('es-ES'),
    }));
}


// 3. LÓGICA DE EXPORTACIÓN A XLSX (Acceso Global)
// ------------------------------------

/**
 * Función que realiza la exportación de datos a XLSX.
 */
function handleExport(data) {
    if (!data || data.length === 0) {
        alert('No hay datos para exportar.');
        return;
    }

    // ❗ CRÍTICO: Accedemos a las variables globales (window.XLSX y window.saveAs) ❗
    const XLSX_MODULE = window.XLSX;
    
    if (!XLSX_MODULE || !window.saveAs) {
        // Esta alerta NO debería aparecer si el HTML carga correctamente.
        alert('Error: Las librerías de exportación no se cargaron. ¡Revise las rutas en novios.html!');
        return;
    }

    const dataForExport = data.map(row => ({
        Invitado: row.invitado_nombre,
        Respuesta: row.respuesta,
        Comentarios: row.comentarios,
        'Fecha de Confirmación': row.fecha_confirmacion,
    }));

    // Secuencia de exportación
    const worksheet = XLSX_MODULE.utils.json_to_sheet(dataForExport);
    const workbook = XLSX_MODULE.utils.book_new();
    XLSX_MODULE.utils.book_append_sheet(workbook, worksheet, "Confirmaciones");
    
    const excelBuffer = XLSX_MODULE.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    // Uso de saveAs global
    window.saveAs(dataBlob, `confirmaciones_${new Date().toISOString().slice(0, 10)}.xlsx`);
}


// 4. LÓGICA DE VISUALIZACIÓN Y RENDERIZADO
// ... (renderSummary function remains the same) ...
function renderSummary(data) {
    const totalRegistros = data.length;
    let asistiraCivil = data.filter(c => c.respuesta === 'Civil').length;
    let asistiraFestejo = data.filter(c => c.respuesta === 'Festejo').length;
    let noAsistira = data.filter(c => c.respuesta === 'No').length;

    const summaryHTML = `
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap; text-align: center; gap: 10px; margin-bottom: 30px;">
            
            <div style="margin: 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px; flex-basis: 45%; background-color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.0em; color: ${COLOR_TEXT}; margin-top: 0;">Total Confirmaciones</h3>
                <p style="font-size: 1.5em; font-weight: bold; color: ${COLOR_TEXT};">${totalRegistros}</p>
            </div>
            
            <div style="margin: 0; padding: 10px; border: 1px solid ${COLOR_CIVIL}; border-radius: 8px; flex-basis: 45%; background-color: #f0fff0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.0em; color: ${COLOR_CIVIL}; margin-top: 0;">Asisten Boda Civil</h3>
                <p style="font-size: 1.5em; font-weight: bold; color: ${COLOR_CIVIL};">${asistiraCivil}</p>
            </div>
            
            <div style="margin: 0; padding: 10px; border: 1px solid ${COLOR_FESTEJO}; border-radius: 8px; flex-basis: 45%; background-color: #f0f8ff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.0em; color: ${COLOR_FESTEJO}; margin-top: 0;">Asisten Festejo</h3>
                <p style="font-size: 1.5em; font-weight: bold; color: ${COLOR_FESTEJO};">${asistiraFestejo}</p>
            </div>
            
             <div style="margin: 0; padding: 10px; border: 1px solid ${COLOR_NO}; border-radius: 8px; flex-basis: 45%; background-color: #fff0f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.0em; color: ${COLOR_NO}; margin-top: 0;">No Asisten</h3>
                <p style="font-size: 1.5em; font-weight: bold; color: ${COLOR_NO};">${noAsistira}</p>
            </div>
        </div>
    `;

    if (dataSummary) {
        dataSummary.innerHTML = summaryHTML;
    }
}


/**
 * Renderiza la tabla de confirmaciones.
 */
function renderTable(data) {
    if (!tableContainer) return;

    renderSummary(data);

    if (!data || data.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: #555;">No hay confirmaciones registradas.</p>';
        return;
    }
    // ... (El resto de la función renderTable sigue igual) ...
    let tableHTML = `
        <div style="overflow-x: auto; margin-top: 30px;">
        <table style="width: 100%; border-collapse: collapse; min-width: 600px; font-family: 'Montserrat', sans-serif;">
            <thead>
                <tr style="background-color: #f8f8f8;">
                    <th style="padding: 15px; text-align: left; border-bottom: 2px solid #ddd; color: ${COLOR_TEXT};">Invitado</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 2px solid #ddd; color: ${COLOR_TEXT};">Respuesta</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 2px solid #ddd; color: ${COLOR_TEXT};">Comentarios</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 2px solid #ddd; color: ${COLOR_TEXT};">Fecha</th>
                </tr>
            </thead>
            <tbody>`;
    
    data.forEach(conf => {
        let statusColor, statusText;
        if (conf.respuesta === 'Civil') {
            statusColor = COLOR_CIVIL;
            statusText = 'Boda Civil';
        } else if (conf.respuesta === 'Festejo') {
            statusColor = COLOR_FESTEJO;
            statusText = 'Festejo';
        } else {
            statusColor = COLOR_NO;
            statusText = 'No Asiste';
        }

        tableHTML += `
            <tr style="border-bottom: 1px solid #eee; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f9f9f9'" onmouseout="this.style.backgroundColor='white'">
                <td style="padding: 15px; font-weight: 500; color: ${COLOR_TEXT};">${conf.invitado_nombre}</td>
                <td style="padding: 15px; font-weight: bold; color: ${statusColor};">${statusText}</td>
                <td style="padding: 15px; font-size: 0.9em; max-width: 300px;">${conf.comentarios || '—'}</td>
                <td style="padding: 15px; font-size: 0.9em;">${conf.fecha_confirmacion}</td>
            </tr>`;
    });
    
    tableHTML += '</tbody></table></div>';
    tableContainer.innerHTML = tableHTML;
}


// 6. INICIALIZACIÓN (Garantizado con DOMContentLoaded)
// ... (El resto del código de inicialización sigue igual) ...

async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}

async function checkAuthAndLoad() {
    if (loadingMessage) loadingMessage.style.display = 'block';

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const data = await getConfirmationData();
        
        window.confirmationData = data; 
        
        renderTable(data);
        
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (dashboardView) dashboardView.style.display = 'block';

    } catch (e) {
        console.error("Fallo al cargar el dashboard:", e);
        if (loadingMessage) loadingMessage.innerHTML = '<p style="color: red;">Error crítico al cargar datos. Vuelve a intentarlo más tarde.</p>';
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    checkAuthAndLoad();

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    if (exportButton) {
        exportButton.addEventListener('click', () => handleExport(window.confirmationData));
    }
});

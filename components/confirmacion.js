// js/confirmacion.js

import { supabase } from './supabase.js';

// 1. Declaración de Variables Globales (DOM y Lógica)
// -----------------------------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug'); 
console.log('DEBUG: Slug de la URL leído:', slug);

// Variables DOM
const form = document.getElementById('rsvp-form');
const titulo = document.getElementById('titulo-invitacion');
const listaInvitadosDiv = document.getElementById('lista-invitados');
const mensaje = document.getElementById('mensaje');
const botonConfirmar = document.getElementById('boton-confirmar');
const mainContent = document.getElementById('main-content'); // Contenedor principal

let grupoIdActual = null;
let invitadosDelGrupo = [];


// 2. Función de Bloqueo (Muestra el mensaje de 'Ya Registrada')
// -----------------------------------------------------------------

/**
 * Muestra el mensaje de bloqueo, reemplazando el contenido principal.
 */
function displayBloqueoMessage(groupName) {
    
    // Reemplaza TODO el contenido principal con el mensaje de bloqueo
    mainContent.innerHTML = `
        <div class="banner">
            </div>
        <div class="card-header" style="background-color: #ffe0b2; border-left: 5px solid #ff9800; padding: 20px;">
            <h1 style="color: #e65100; font-size: 1.4em; margin-top: 0;">Confirmación Registrada</h1>
            <p style="font-size: 1.1em; font-weight: bold; margin-bottom: 5px;">
                Tu confirmación para ${groupName} ha sido registrada anteriormente.
            </p>
            <p style="color: #333; font-size: 0.9em;">
                Este enlace ha sido deshabilitado. Si necesitas modificar tu asistencia, 
                por favor, contacta directamente a los anfitriones.
            </p>
        </div>
    `;
}


// 3. Función de Carga de Datos (READ y Bloqueo al Cargar)
// -----------------------------------------------------------------

async function cargarDatos() {
    listaInvitadosDiv.innerHTML = '<p>Cargando lista de invitados...</p>';

    if (!slug) {
        titulo.textContent = 'Error: Invitación no encontrada. Verifique la URL.';
        listaInvitadosDiv.innerHTML = '';
        return;
    }
    
    // Limpiar el slug
    const cleanSlug = slug.trim();

    const { data: groupDataArray, error: groupError } = await supabase
        .from('groups')
        .select('id, nombre, is_confirmed') 
        .filter('slug', 'eq', cleanSlug);
    
    const groupData = groupDataArray && groupDataArray.length > 0 ? groupDataArray[0] : null;

    if (groupError || !groupData) {
        console.error('ERROR de Supabase en groups:', groupError);
        
        if (!groupData) {
            titulo.textContent = 'Error: Invitación no válida. El identificador no fue encontrado.';
        } else {
            titulo.textContent = 'Error al cargar los datos. Verifique la conexión.';
        }

        listaInvitadosDiv.innerHTML = `<p style="color:red;">No se pudo acceder a los detalles de esta invitación.</p>`;
        if (form) form.style.display = 'none';
        return;
    }
    
    // Bloqueo al cargar la página
    if (groupData.is_confirmed === true) {
        displayBloqueoMessage(groupData.nombre);
        return;
    }

    // Datos del grupo cargados con éxito
    grupoIdActual = groupData.id;
    
    // Consultar los invitados de ese grupo y Renderizar tarjetas
    const { data: inviteesData, error: inviteesError } = await supabase
        .from('invitees')
        .select('id, nombre') 
        .eq('group_id', grupoIdActual)
        .order('id', { ascending: true });
    
    if (inviteesError || !inviteesData.length) {
        console.error('ERROR de Supabase al cargar invitados:', inviteesError);
        listaInvitadosDiv.innerHTML = '<p style="color:red;">Error al cargar la lista de invitados.</p>';
        return;
    }

    // Renderizar tarjetas de confirmación
    invitadosDelGrupo = inviteesData;
    const cardsHTML = invitadosDelGrupo.map(invitado => {
        const inputName = `asistencia_${invitado.id}`; 
        
        return `
            <div class="invitado-card" data-invitee-id="${invitado.id}">
                <h3>${invitado.nombre} <span class="required">*</span></h3>
                <label for="civil_${invitado.id}"><input type="radio" id="civil_${invitado.id}" name="${inputName}" value="Civil" required> Asistirá desde el 13 de noviembre (boda civil)</label><br>
                <label for="festejo_${invitado.id}"><input type="radio" id="festejo_${invitado.id}" name="${inputName}" value="Festejo" required> Asistirá el 14 de noviembre (festejo)</label><br>
                <label for="no_${invitado.id}"><input type="radio" id="no_${invitado.id}" name="${inputName}" value="No" required> No asistirá</label>
            </div>
        `;
    }).join('');

    listaInvitadosDiv.innerHTML = cardsHTML;
}


// 4. Manejar el Envío del Formulario (Lógica Condicional y Recarga)
// -----------------------------------------------------------------

const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (!grupoIdActual) {
        mensaje.textContent = 'Error: No se pudo identificar el grupo.';
        mensaje.style.color = 'red';
        return;
    }

    // ❗❗ VALIDACIÓN CRÍTICA: Asegurar que TODAS las opciones estén seleccionadas ❗❗
    let allOptionsSelected = true;
    for (const invitado of invitadosDelGrupo) {
        const inputName = `asistencia_${invitado.id}`;
        // Chequea si existe un radio button seleccionado para ese grupo
        const selectedOption = document.querySelector(`input[name="${inputName}"]:checked`);
        if (!selectedOption) {
            allOptionsSelected = false;
            break; 
        }
    }

    if (!allOptionsSelected) {
        mensaje.textContent = 'Por favor, confirma la asistencia para todos los invitados del grupo.';
        mensaje.style.color = 'red';
        // Hacemos un breve shake o flash en el botón para llamar la atención
        botonConfirmar.classList.add('error-shake');
        setTimeout(() => botonConfirmar.classList.remove('error-shake'), 500);
        return; 
    }
    // ❗❗ FIN DE LA VALIDACIÓN ❗❗


    botonConfirmar.disabled = true;
    mensaje.textContent = 'Enviando confirmaciones...';

    const comentarios = document.getElementById('comentarios').value;
    let allWritesSuccessful = true; 

    // Bucle para escribir CADA confirmación
    for (const invitado of invitadosDelGrupo) {
        const respuesta = document.querySelector(`input[name="asistencia_${invitado.id}"]:checked`).value; // Ya sabemos que existe
        
        const dataToWrite = {
            group_id: parseInt(grupoIdActual), 
            invitee_id: parseInt(invitado.id),
            respuesta: respuesta,
            comentarios: comentarios
        };

        // A. Intentar actualizar primero
        const { error: updateError, data: updateData } = await supabase
            .from('confirmaciones')
            .update(dataToWrite)
            .eq('invitee_id', dataToWrite.invitee_id)
            .select(); 

        if (updateError && updateError.code !== '406') { 
            console.error('ERROR CRÍTICO en UPDATE:', updateError);
            allWritesSuccessful = false;
            break; 
        }
        
        // B. Si la fila no existía (null o length 0), hacer INSERT
        if (!updateData || updateData.length === 0) { 
            const { error: insertError, data: insertData } = await supabase
                .from('confirmaciones')
                .insert([dataToWrite])
                .select(); 

            if (insertError) {
                console.error('ERROR CRÍTICO en INSERT:', insertError);
                allWritesSuccessful = false;
                break; 
            }
            
            if (!insertData || insertData.length === 0) {
                 console.error('FALLO DE ESCRITURA SILENCIOSA: El INSERT fue rechazado por la DB.');
                 allWritesSuccessful = false;
                 break;
            }
        }
    }

    // Manejo de errores después del bucle
    if (!allWritesSuccessful) {
        mensaje.textContent = `Error al confirmar. La escritura falló.`;
        mensaje.style.color = 'red';
        botonConfirmar.disabled = false;
        return;
    }
    
    // Si todo se escribió, bloquear la liga
    const { error: updateError } = await supabase
        .from('groups')
        .update({ is_confirmed: true }) 
        .eq('id', grupoIdActual)       
        .single();
    
    if (updateError) {
        console.error('ERROR CRÍTICO: El bloqueo de la liga falló. Razón:', updateError);
        mensaje.textContent = `¡Confirmaciones enviadas! Pero el bloqueo falló.`;
        mensaje.style.color = 'orange';
    } else {
        mensaje.textContent = `¡Confirmaciones enviadas con éxito! Recargando...`;
    }
    
    // Forzar Recarga
    setTimeout(() => {
        window.location.reload(); 
    }, 1000); 
};


// 5. Inicialización y Asignación de Listener
// -----------------------------------------------------------------

// Asignamos el listener después de cargar el DOM
botonConfirmar.addEventListener('click', handleFormSubmission);

cargarDatos();